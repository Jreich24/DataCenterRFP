import { Request, Response } from 'express';
import { fetchHeadlines, fetchRFPs } from '../services/scraper';
import { getCache, setCache } from '../services/cache';
import { News, RFP } from '../types';
import { UsageMonitor } from '../services/usageMonitor';

const usageMonitor = UsageMonitor.getInstance();

export const getHeadlines = async (req: Request, res: Response) => {
    try {
        const cacheKey = req.query.market ? `headlines:${req.query.market}` : 'headlines:all';
        
        // Try to get from cache first
        const cachedHeadlines = await getCache<News[]>('news', cacheKey);
        if (cachedHeadlines) {
            return res.status(200).json(cachedHeadlines);
        }

        // If not in cache, fetch fresh data
        const headlines = await fetchHeadlines();
        
        // Cache the results
        await setCache('news', cacheKey, headlines);
        
        res.status(200).json(headlines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching headlines', error });
    }
};

export const getRFPs = async (req: Request, res: Response) => {
    try {
        const cacheKey = req.query.location ? `rfps:${req.query.location}` : 'rfps:all';
        
        // Try to get from cache first
        const cachedRFPs = await getCache<RFP[]>('rfps', cacheKey);
        if (cachedRFPs) {
            return res.status(200).json(cachedRFPs);
        }

        // If not in cache, fetch fresh data
        const rfps = await fetchRFPs();
        
        // Cache the results
        await setCache('rfps', cacheKey, rfps);
        
        res.status(200).json(rfps);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching RFPs', error });
    }
};