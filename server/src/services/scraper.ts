import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem, RFPItem } from '../types';
import { cacheHeadlines, cacheRFPs } from './cache';

interface NewsSource {
    name: string;
    url: string;
    selectors: {
        article: string;
        title: string;
        link: string;
        date?: string;
        content?: string;
    };
}

const newsSources: NewsSource[] = [
    {
        name: 'Data Center Knowledge',
        url: 'https://www.datacenterknowledge.com/',
        selectors: {
            article: 'article.article-summary',
            title: 'h2 a',
            link: 'h2 a',
            date: 'time',
            content: '.article-summary p'
        }
    },
    {
        name: 'Data Center Frontier',
        url: 'https://www.datacenterfrontier.com/',
        selectors: {
            article: '.post',
            title: 'h2.entry-title a',
            link: 'h2.entry-title a',
            date: '.entry-date',
            content: '.entry-content p:first-of-type'
        }
    }
];

export const scrapeNewsHeadlines = async (): Promise<NewsItem[]> => {
    const headlines: NewsItem[] = [];
    const timestamp = new Date();

    for (const source of newsSources) {
        try {
            const { data } = await axios.get(source.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            const $ = cheerio.load(data);

            $(source.selectors.article).each((_, article: cheerio.Element) => {
                try {
                    const $article = $(article);
                    const title = $article.find(source.selectors.title).text().trim();
                    const link = $article.find(source.selectors.link).attr('href');
                    const content = source.selectors.content 
                        ? $article.find(source.selectors.content).text().trim()
                        : '';
                    const publishedAt = source.selectors.date
                        ? new Date($article.find(source.selectors.date).attr('datetime') || timestamp)
                        : timestamp;

                    if (title && link) {
                        headlines.push({
                            id: Buffer.from(link).toString('base64'),
                            title,
                            content,
                            link: link.startsWith('http') ? link : source.url + link,
                            source: source.name,
                            publishedAt
                        });
                    }
                } catch (articleError) {
                    console.error(`Error parsing article from ${source.name}:`, articleError);
                }
            });
        } catch (error) {
            console.error(`Error scraping ${source.name}:`, error);
        }
    }

    if (headlines.length > 0) {
        await cacheHeadlines(headlines);
    }

    return headlines;
};

export const scrapeRFPs = async (): Promise<RFPItem[]> => {
    const rfps: RFPItem[] = [
        {
            id: 'mock-rfp-1',
            title: 'Sample Data Center RFP',
            content: 'This is a sample RFP for testing.',
            organization: 'Test Organization',
            description: 'Looking for data center space',
            link: 'https://example.com/rfp1',
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            location: 'US East',
            type: 'Colocation'
        }
    ];

    await cacheRFPs(rfps);
    return rfps;
};

// Backwards-compatible wrapper exports expected by controllers
export const fetchHeadlines = async (params?: { 
    prompt?: string; 
    type?: string; 
    sources?: string[]; 
    since?: string 
}): Promise<NewsItem[]> => {
    try {
        const headlines = await scrapeNewsHeadlines();
        
        if (params) {
            return headlines.filter(headline => {
                const matchesSource = !params.sources?.length || 
                    params.sources.includes(headline.source);
                const matchesSince = !params.since || 
                    headline.publishedAt >= new Date(params.since);
                
                return matchesSource && matchesSince;
            });
        }
        
        return headlines;
    } catch (error) {
        console.error('fetchHeadlines error, returning mock data:', error);
        return [
            {
                id: 'mock1',
                title: 'Mock: Data Center Expansion in Virginia',
                content: 'Major cloud provider announces new data center campus in Northern Virginia.',
                link: 'https://example.com/mock1',
                source: 'Mock News',
                publishedAt: new Date()
            },
            {
                id: 'mock2',
                title: 'Mock: Sustainable Cooling Innovation',
                content: 'New cooling technology promises 30% reduction in data center energy usage.',
                link: 'https://example.com/mock2',
                source: 'Mock News',
                publishedAt: new Date()
            }
        ];
    }
};

export const fetchRFPs = async () => {
    try {
        const rfps = await scrapeRFPs();
        return rfps;
    } catch (error) {
        console.error('fetchRFPs error, returning empty list:', error);
        return [];
    }
};