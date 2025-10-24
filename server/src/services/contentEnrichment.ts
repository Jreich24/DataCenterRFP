import { PerplexityService } from '../services/perplexity';
import { NewsItem, RFPItem } from '../types';
import { getCache, setCache } from '../services/cache';

const perplexity = new PerplexityService({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  model: 'pplx-70b-online',
  temperature: 0.7,
  maxTokens: 1024
});

export async function enrichNewsContent(article: NewsItem): Promise<NewsItem> {
  const cacheKey = `content:${article.id}`;
  
  // Try to get enriched content from cache
  const cachedContent = await getCache<NewsItem>('perplexity', cacheKey);
  if (cachedContent) {
    return cachedContent;
  }

  // First, get a detailed analysis of the content
  const analysis = await perplexity.query([
    {
      role: 'system',
      content: `
        Analyze this data center news article and provide:
        1. Key points (2-3 bullets)
        2. Power capacity mentioned (MW/GW)
        3. Investment amount (if any)
        4. Location and power market
        5. Timeline/completion date
      `
    },
    { role: 'user', content: article.content }
  ]);

  // Extract specific metrics
  const metrics = await perplexity.query([
    {
      role: 'system',
      content: `
        Extract only these specific metrics from the news (respond in JSON):
        {
          "powerCapacity": "number in MW",
          "investment": "amount in USD",
          "squareFootage": "number in sq ft",
          "completionDate": "ISO date",
          "renewablePercentage": "number"
        }
      `
    },
    { role: 'user', content: article.content }
  ]);

  // Categorize the content
  const category = await perplexity.query([
    {
      role: 'system',
      content: `
        Categorize this news (respond in JSON):
        {
          "type": "expansion|acquisition|sustainability|technology",
          "powerMarket": "ERCOT|PJM|SPP|etc",
          "impact": "high|medium|low",
          "timeline": "immediate|short-term|long-term",
          "segment": "hyperscale|colocation|enterprise"
        }
      `
    },
    { role: 'user', content: article.content }
  ]);

  return {
    ...article,
    analysis: analysis.choices[0].message.content,
    metrics: JSON.parse(metrics.choices[0].message.content),
    category: JSON.parse(category.choices[0].message.content)
  };
}

export async function enrichRFPContent(rfp: RFPItem): Promise<RFPItem> {
  // Extract detailed requirements
  const requirements = await perplexity.query([
    {
      role: 'system',
      content: `
        Analyze this data center RFP and extract (respond in JSON):
        {
          "powerRequirements": {
            "capacity": "number in MW",
            "redundancy": "N+1|2N|etc",
            "reliability": "tier level"
          },
          "sustainability": {
            "pueTarget": "number",
            "renewableRequirement": "percentage",
            "certifications": ["required certifications"]
          },
          "timeline": {
            "submissions": "ISO date",
            "expectedAward": "ISO date",
            "completion": "ISO date"
          },
          "technical": {
            "cooling": "requirements",
            "connectivity": "requirements",
            "security": "requirements"
          }
        }
      `
    },
    { role: 'user', content: rfp.content }
  ]);

  // Get market analysis
  const marketAnalysis = await perplexity.query([
    {
      role: 'system',
      content: `
        Analyze this RFP against market standards (respond in JSON):
        {
          "competitiveness": "high|medium|low",
          "complexityLevel": "high|medium|low",
          "marketAlignment": "above|at|below market",
          "keyRisks": ["list of main risks"],
          "opportunities": ["list of opportunities"]
        }
      `
    },
    { role: 'user', content: rfp.content }
  ]);

  return {
    ...rfp,
    requirements: JSON.parse(requirements.choices[0].message.content),
    marketAnalysis: JSON.parse(marketAnalysis.choices[0].message.content)
  };
}