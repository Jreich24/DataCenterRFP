import { Router, Request, Response, NextFunction } from 'express';
import { getHeadlines, getRFPs } from '../controllers/headlinesController';
import { costControlMiddleware } from '../middleware/costControl';
import { UsageMonitor } from '../services/usageMonitor';

const router = Router();
const usageMonitor = UsageMonitor.getInstance();

// Monitor usage for headlines and RFPs
router.get('/headlines', costControlMiddleware('perplexity'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await usageMonitor.logUsage('perplexity');
        await getHeadlines(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/rfps', costControlMiddleware('scraping'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await usageMonitor.logUsage('scraping');
        await getRFPs(req, res);
    } catch (error) {
        next(error);
    }
});

// Usage monitoring endpoint (protected, admin only)
router.get('/usage', async (req: Request, res: Response) => {
    try {
        const stats = await usageMonitor.getUsageStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch usage statistics' });
    }
});

export default router;