import axios from 'axios';

export interface PerplexityConfig {
  apiKey: string;
  model: "pplx-7b-online" | "pplx-70b-online" | "pplx-7b-chat" | "pplx-70b-chat";
  temperature: number;
  maxTokens: number;
}

export interface PerplexityResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export class PerplexityService {
  private cache: Map<string, { data: any; timestamp: number }>;
  private rateLimitDelay: number = 1000; // 1 second between requests

  constructor(
    private config: PerplexityConfig,
    private cacheOptions = { ttl: 3600, maxSize: 1000 }
  ) {
    this.cache = new Map();
  }

  async query(messages: Array<{ role: string; content: string }>): Promise<PerplexityResponse> {
    const cacheKey = JSON.stringify(messages);
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      await this.delay(this.rateLimitDelay);
      
      const response = await axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: this.config.model,
          messages,
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      this.addToCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        // Rate limit hit - exponential backoff
        this.rateLimitDelay *= 2;
        await this.delay(this.rateLimitDelay);
        return this.query(messages); // Retry
      }
      throw error;
    }
  }

  private getFromCache(key: string): PerplexityResponse | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.cacheOptions.ttl * 1000) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private addToCache(key: string, data: PerplexityResponse): void {
    if (this.cache.size >= this.cacheOptions.maxSize) {
      // Remove oldest entry
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}