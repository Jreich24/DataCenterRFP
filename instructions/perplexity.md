# Perplexity AI Configuration

## API Setup

```typescript
interface PerplexityConfig {
  apiKey: string;  // Your Perplexity API key
  model: "pplx-7b-online" | "pplx-70b-online" | "pplx-7b-chat" | "pplx-70b-chat";
  temperature: number;  // 0.0 to 1.0
  maxTokens: number;
}

const defaultConfig: PerplexityConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  model: "pplx-70b-online",  // Best for real-time news analysis
  temperature: 0.7,
  maxTokens: 1024
}
```

## Usage Examples

### News Processing

```typescript
interface NewsProcessingPrompt {
  task: "summarize" | "analyze" | "extract" | "categorize";
  content: string;
  context?: {
    powerMarket?: string;
    region?: string;
    dateRange?: string;
  };
}

// Example prompts for different tasks:
const prompts = {
  summarize: `
    Analyze this data center news article and provide:
    1. Key points (2-3 bullets)
    2. Power capacity mentioned (MW/GW)
    3. Investment amount (if any)
    4. Location and power market
    5. Timeline/completion date
  `,
  
  analyze: `
    Analyze the following data center announcement and extract:
    1. Power infrastructure requirements
    2. Grid impact assessment
    3. Renewable energy components
    4. Market implications
    5. Critical dependencies
  `,
  
  extract: `
    Extract specific metrics from this news:
    1. Total MW capacity
    2. Square footage
    3. Investment amount
    4. Jobs created
    5. Power usage effectiveness (PUE)
    6. Renewable percentage
  `,

  categorize: `
    Categorize this news item:
    1. Primary category (expansion/acquisition/sustainability)
    2. Power market affected
    3. Impact level (high/medium/low)
    4. Timeline (immediate/short-term/long-term)
    5. Market segment (hyperscale/colocation/enterprise)
  `
}
```

### RFP Analysis

```typescript
interface RFPAnalysisPrompt {
  task: "requirements" | "estimation" | "comparison";
  content: string;
  context?: {
    budget?: number;
    timeline?: string;
    location?: string;
  };
}

// Example prompts for RFP analysis:
const rfpPrompts = {
  requirements: `
    Analyze this data center RFP and extract:
    1. Power requirements (MW)
    2. Reliability requirements (tier level)
    3. Sustainability requirements
    4. Timeline constraints
    5. Critical technical specifications
  `,

  estimation: `
    Provide estimates for this RFP:
    1. Total power capacity needed
    2. Infrastructure requirements
    3. Approximate project timeline
    4. Potential challenges
    5. Key risk factors
  `,

  comparison: `
    Compare this RFP against market standards:
    1. Power requirements vs. typical
    2. Timeline feasibility
    3. Technical requirements alignment
    4. Market competitiveness
    5. Innovation requirements
  `
}
```

## API Integration

```typescript
class PerplexityService {
  constructor(private config: PerplexityConfig) {}

  async processNews(content: string, task: NewsProcessingPrompt['task']) {
    const prompt = prompts[task];
    return this.query({
      model: this.config.model,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content }
      ]
    });
  }

  async analyzeRFP(content: string, task: RFPAnalysisPrompt['task']) {
    const prompt = rfpPrompts[task];
    return this.query({
      model: this.config.model,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content }
      ]
    });
  }

  private async query(params: any) {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    
    return response.json();
  }
}
```

## Usage in Scraper

```typescript
const perplexity = new PerplexityService(defaultConfig);

// Process news articles
async function enrichNewsItem(article: NewsItem) {
  const analysis = await perplexity.processNews(
    article.content,
    'analyze'
  );
  
  return {
    ...article,
    analysis: analysis.choices[0].message.content,
    metrics: await perplexity.processNews(article.content, 'extract'),
    category: await perplexity.processNews(article.content, 'categorize')
  };
}

// Analyze RFPs
async function enrichRFP(rfp: RFPItem) {
  const requirements = await perplexity.analyzeRFP(
    rfp.content,
    'requirements'
  );
  
  return {
    ...rfp,
    requirements: requirements.choices[0].message.content,
    estimates: await perplexity.analyzeRFP(rfp.content, 'estimation')
  };
}
```

## Rate Limiting & Caching

```typescript
interface CacheConfig {
  ttl: number;  // Time to live in seconds
  maxSize: number;  // Maximum cache size
}

const cacheConfig: CacheConfig = {
  ttl: 3600,  // 1 hour
  maxSize: 1000  // Store up to 1000 items
};

// Implement in your cache service:
// - Store API responses
// - Respect rate limits
// - Implement exponential backoff
// - Handle API errors gracefully
```

Edit this file to customize Perplexity AI integration for your specific needs.