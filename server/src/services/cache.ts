import { Cache, caching } from 'cache-manager';
import { NewsItem, RFPItem } from '../types';

interface CacheConfig {
    news: {
        ttl: number;
        max: number;
    };
    rfps: {
        ttl: number;
        max: number;
    };
    perplexity: {
        ttl: number;
        max: number;
    };
}

const config: CacheConfig = {
    news: {
        ttl: Number(process.env.NEWS_CACHE_TTL_HOURS) * 3600 || 4 * 3600, // 4 hours default
        max: 1000
    },
    rfps: {
        ttl: Number(process.env.RFP_CACHE_TTL_HOURS) * 3600 || 24 * 3600, // 24 hours default
        max: 500
    },
    perplexity: {
        ttl: Number(process.env.PERPLEXITY_CACHE_TTL_MINUTES) * 60 || 60 * 60, // 1 hour default
        max: 2000
    }
};

// Separate caches for different types of content
const caches: Record<keyof CacheConfig, Cache> = {
    news: caching({ store: 'memory', ...config.news }),
    rfps: caching({ store: 'memory', ...config.rfps }),
    perplexity: caching({ store: 'memory', ...config.perplexity })
};

const getCacheKey = (type: keyof CacheConfig, identifier: string): string => {
    return `${type}:${identifier}`;
};

export const setCache = async (type: keyof CacheConfig, key: string, value: any): Promise<void> => {
    const cacheKey = getCacheKey(type, key);
    await caches[type].set(cacheKey, value);
};

export const getCache = async <T>(type: keyof CacheConfig, key: string): Promise<T | null> => {
    const cacheKey = getCacheKey(type, key);
    return await caches[type].get<T>(cacheKey);
};

// Specific cache operations for headlines
export const cacheHeadlines = async (headlines: NewsItem[]): Promise<void> => {
    await setCache('news', 'latest', headlines);
};

export const getCachedHeadlines = async (): Promise<NewsItem[]> => {
    return await getCache<NewsItem[]>('news', 'latest') || [];
};

// Specific cache operations for RFPs
export const cacheRFPs = async (rfps: RFPItem[]): Promise<void> => {
    await setCache('rfps', 'latest', rfps);
};

export const getCachedRFPs = async (): Promise<RFPItem[]> => {
    return await getCache<RFPItem[]>('rfps', 'latest') || [];
};
    const cacheKey = getCacheKey(type, key);
    return await caches[type].get<T>(cacheKey);
};

export const clearCache = async (type: keyof CacheConfig, key: string): Promise<void> => {
    const cacheKey = getCacheKey(type, key);
    await caches[type].del(cacheKey);
};

export const getCacheStats = async (): Promise<Record<keyof CacheConfig, { size: number; maxSize: number; ttl: number }>> => {
    const stats: any = {};
    for (const [type, cache] of Object.entries(caches)) {
        const store = (cache as any).store;
        stats[type] = {
            size: store.keys().length,
            maxSize: config[type as keyof CacheConfig].max,
            ttl: config[type as keyof CacheConfig].ttl
        };
    }
    return stats;
};