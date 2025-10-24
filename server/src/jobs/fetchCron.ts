import cron from 'node-cron';
import { fetchHeadlines } from '../services/scraper';
import { cacheHeadlines } from '../services/cache';

// Schedule jobs to run at 9am, 12pm, 3pm, and 5pm on weekdays only to optimize costs
cron.schedule('0 9,12,15,17 * * 1-5', async () => {
    try {
        const headlines = await fetchHeadlines();
        await cacheHeadlines(headlines);
        console.log('Headlines fetched and cached successfully.');
    } catch (error) {
        console.error('Error fetching and caching headlines:', error);
    }
});