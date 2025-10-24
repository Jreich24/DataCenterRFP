import { CostControlService } from '../middleware/costControl';
import fs from 'fs';
import path from 'path';
import winston from 'winston';

interface UsageLog {
  timestamp: string;
  type: 'perplexity' | 'scraping';
  cost: number;
  dailyCost: number;
  weeklyCost: number;
  dailyQueries: number;
  weeklyQueries: number;
  remainingDailyBudget: number;
  remainingWeeklyBudget: number;
}

export class UsageMonitor {
  private static instance: UsageMonitor;
  private logger: winston.Logger;
  private alertThresholds = {
    daily: 0.8,  // Alert at 80% of daily budget
    weekly: 0.8, // Alert at 80% of weekly budget
    spike: 2.0   // Alert if usage rate is 2x normal
  };

  private constructor() {
    // Set up Winston logger
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        // Write logs to a file
        new winston.transports.File({ 
          filename: path.join(__dirname, '../../logs/api-usage.log')
        }),
        // Also write to console in development
        process.env.NODE_ENV !== 'production' ? new winston.transports.Console() : null
      ].filter(Boolean) as winston.transport[]
    });

    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Start periodic usage check
    this.startPeriodicCheck();
  }

  static getInstance(): UsageMonitor {
    if (!UsageMonitor.instance) {
      UsageMonitor.instance = new UsageMonitor();
    }
    return UsageMonitor.instance;
  }

  private async startPeriodicCheck() {
    setInterval(() => {
      this.checkUsageAndAlert();
    }, 5 * 60 * 1000); // Check every 5 minutes
  }

  private calculateUsageRate(logs: UsageLog[]): number {
    if (logs.length < 2) return 0;
    const timeSpan = new Date(logs[logs.length - 1].timestamp).getTime() - 
                     new Date(logs[0].timestamp).getTime();
    const totalQueries = logs.reduce((sum, log) => sum + 1, 0);
    return (totalQueries / timeSpan) * 1000 * 60; // Queries per minute
  }

  async logUsage(type: 'perplexity' | 'scraping'): Promise<void> {
    const costControl = CostControlService.getInstance();
    const usage = costControl.getUsageStats();
    
    const log: UsageLog = {
      timestamp: new Date().toISOString(),
      type,
      cost: usage.costPerQuery,
      dailyCost: usage.currentDailyCost,
      weeklyCost: usage.currentWeeklyCost,
      dailyQueries: usage.currentDailyQueries,
      weeklyQueries: usage.currentWeeklyQueries,
      remainingDailyBudget: usage.dailyBudgetUSD - usage.currentDailyCost,
      remainingWeeklyBudget: usage.weeklyBudgetUSD - usage.currentWeeklyCost
    };

    this.logger.info('API Usage', log);
    await this.checkUsageAndAlert(log);
  }

  private async checkUsageAndAlert(currentLog?: UsageLog): Promise<void> {
    const costControl = CostControlService.getInstance();
    const usage = currentLog || costControl.getUsageStats();

    // Check daily budget threshold
    const dailyUsagePercent = usage.dailyCost / usage.dailyBudgetUSD;
    if (dailyUsagePercent >= this.alertThresholds.daily) {
      this.logger.warn('Daily budget alert', {
        message: `Daily API usage has reached ${(dailyUsagePercent * 100).toFixed(1)}% of budget`,
        usage
      });
    }

    // Check weekly budget threshold
    const weeklyUsagePercent = usage.weeklyCost / usage.weeklyBudgetUSD;
    if (weeklyUsagePercent >= this.alertThresholds.weekly) {
      this.logger.warn('Weekly budget alert', {
        message: `Weekly API usage has reached ${(weeklyUsagePercent * 100).toFixed(1)}% of budget`,
        usage
      });
    }

    // Check for unusual usage patterns
    try {
      const recentLogs = await this.getRecentLogs(15); // Get last 15 minutes of logs
      const currentRate = this.calculateUsageRate(recentLogs);
      const historicalRate = await this.getHistoricalRate();
      
      if (currentRate > historicalRate * this.alertThresholds.spike) {
        this.logger.warn('Usage spike detected', {
          message: `Current usage rate (${currentRate.toFixed(1)} req/min) is ${(currentRate/historicalRate).toFixed(1)}x normal`,
          currentRate,
          historicalRate,
          usage
        });
      }
    } catch (error) {
      this.logger.error('Error checking usage patterns', { error });
    }
  }

  private async getRecentLogs(minutes: number): Promise<UsageLog[]> {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    const logs: UsageLog[] = [];
    
    try {
      const fileContent = await fs.promises.readFile(
        path.join(__dirname, '../../logs/api-usage.log'), 
        'utf8'
      );
      
      const lines = fileContent.split('\n').filter(Boolean);
      return lines
        .map(line => JSON.parse(line))
        .filter(log => new Date(log.timestamp) > cutoff);
    } catch (error) {
      this.logger.error('Error reading usage logs', { error });
      return [];
    }
  }

  private async getHistoricalRate(): Promise<number> {
    try {
      const logs = await this.getRecentLogs(60); // Look at last hour
      return this.calculateUsageRate(logs);
    } catch (error) {
      this.logger.error('Error calculating historical rate', { error });
      return 0;
    }
  }

  // Get usage statistics for the dashboard
  async getUsageStats(): Promise<{
    today: UsageLog[];
    thisWeek: UsageLog[];
    averageDaily: number;
    averageWeekly: number;
  }> {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0,0,0,0));
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start from Sunday

    try {
      const logs = await this.getRecentLogs(7 * 24 * 60); // Get last week's logs
      const today = logs.filter(log => new Date(log.timestamp) >= startOfDay);
      const thisWeek = logs.filter(log => new Date(log.timestamp) >= startOfWeek);

      return {
        today,
        thisWeek,
        averageDaily: today.reduce((sum, log) => sum + log.cost, 0) / Math.max(1, today.length),
        averageWeekly: thisWeek.reduce((sum, log) => sum + log.cost, 0) / Math.max(1, thisWeek.length)
      };
    } catch (error) {
      this.logger.error('Error getting usage stats', { error });
      return {
        today: [],
        thisWeek: [],
        averageDaily: 0,
        averageWeekly: 0
      };
    }
  }
}