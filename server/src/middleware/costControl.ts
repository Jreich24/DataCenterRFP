import { Request, Response, NextFunction } from 'express';

interface UsageQuota {
  weeklyBudgetUSD: number;
  dailyBudgetUSD: number;
  costPerQuery: number;
  currentDailyQueries: number;
  currentWeeklyQueries: number;
  currentDailyCost: number;
  currentWeeklyCost: number;
  lastReset: {
    daily: Date;
    weekly: Date;
  };
}

export class CostControlService {
  private static instance: CostControlService;
  private usage: UsageQuota;
  private rateLimits = {
    perplexity: new Map<string, number>(), // IP -> timestamp
    scraping: new Map<string, number>()    // IP -> timestamp
  };

  private constructor() {
    this.usage = {
      weeklyBudgetUSD: Number(process.env.WEEKLY_BUDGET_USD) || 5.00,
      dailyBudgetUSD: Number(process.env.MAX_DAILY_BUDGET_USD) || 1.00,
      costPerQuery: Number(process.env.PERPLEXITY_COST_PER_QUERY) || 0.0002,
      currentDailyQueries: 0,
      currentWeeklyQueries: 0,
      currentDailyCost: 0,
      currentWeeklyCost: 0,
      lastReset: {
        daily: new Date(),
        weekly: new Date()
      }
    };
  }

  static getInstance(): CostControlService {
    if (!CostControlService.instance) {
      CostControlService.instance = new CostControlService();
    }
    return CostControlService.instance;
  }

  private resetCountersIfNeeded(): void {
    const now = new Date();
    
    // Reset daily counter if it's a new day
    if (now.getDate() !== this.usage.lastReset.daily.getDate()) {
      this.usage.currentDailyQueries = 0;
      this.usage.currentDailyCost = 0;
      this.usage.lastReset.daily = now;
    }

    // Reset weekly counter if it's a new week (on Monday)
    if (this.getWeekNumber(now) !== this.getWeekNumber(this.usage.lastReset.weekly)) {
      this.usage.currentWeeklyQueries = 0;
      this.usage.currentWeeklyCost = 0;
      this.usage.lastReset.weekly = now;
    }
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  canMakeRequest(type: 'perplexity' | 'scraping', ip: string): boolean {
    const now = new Date();
    
    // No requests on weekends
    if (now.getDay() === 0 || now.getDay() === 6) {
      return false;
    }

    this.resetCountersIfNeeded();

    // Check rate limits
    const currentTime = Date.now();
    const limits = {
      perplexity: Number(process.env.PERPLEXITY_RATE_LIMIT_MS) || 2000,
      scraping: Number(process.env.SCRAPING_RATE_LIMIT_MS) || 60000
    };

    const lastRequest = this.rateLimits[type].get(ip) || 0;
    const timeSinceLastRequest = currentTime - lastRequest;

    if (timeSinceLastRequest < limits[type]) {
      return false;
    }

    // Calculate cost of new request
    const queryCost = this.usage.costPerQuery;
    const newDailyCost = this.usage.currentDailyCost + queryCost;
    const newWeeklyCost = this.usage.currentWeeklyCost + queryCost;

    // Check budget limits
    if (newDailyCost > this.usage.dailyBudgetUSD || 
        newWeeklyCost > this.usage.weeklyBudgetUSD) {
      return false;
    }

    // Update usage
    this.rateLimits[type].set(ip, currentTime);
    this.usage.currentDailyQueries++;
    this.usage.currentWeeklyQueries++;
    this.usage.currentDailyCost = newDailyCost;
    this.usage.currentWeeklyCost = newWeeklyCost;
    return true;
  }

  getUsageStats(): UsageQuota {
    this.resetCountersIfNeeded();
    return { ...this.usage };
  }
}

export const costControlMiddleware = (type: 'perplexity' | 'scraping') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const costControl = CostControlService.getInstance();
    const clientIP = req.ip;

    if (!costControl.canMakeRequest(type, clientIP)) {
      return res.status(429).json({
        error: 'Rate limit or quota exceeded',
        usage: costControl.getUsageStats()
      });
    }

    next();
  };
};