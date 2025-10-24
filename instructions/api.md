# API Configuration

## Endpoints

### GET /api/headlines

Fetch news headlines with optional filtering:

```typescript
interface FetchParams {
  prompt?: string;        // Search/filter instructions
  type?: 'news' | 'rfp'; // Content type to fetch
  sources?: string[];    // Specific sources to include
  since?: string;        // ISO date to fetch from
  region?: string;       // Filter by region
  keywords?: string[];   // Must contain these terms
}

interface NewsItem {
  title: string;         // Headline text
  link: string;          // URL to full article
  source: string;        // Source name
  publishedAt: string;   // ISO date
  region?: string;       // Geographic region
  summary?: string;      // Brief excerpt
}

// Example: GET /api/headlines?prompt=data+center+expansion&since=2025-10-16
```

### GET /api/rfps

Fetch RFP listings with filtering:

```typescript
interface RFPParams {
  state?: string;        // Filter by state/region
  type?: string;         // RFP category
  minAmount?: number;    // Minimum project value
  dueAfter?: string;    // ISO date
  keywords?: string[];   // Must contain terms
}

interface RFP {
  title: string;         // RFP title
  organization: string;  // Issuing org
  dueDate: string;      // ISO date
  state: string;        // Location
  type: string;         // Category
  amount?: number;      // If specified
  description: string;  // Full text
  link: string;        // Source URL
}

// Example: GET /api/rfps?state=TX&type=Construction&dueAfter=2025-11-01
```

## Error Responses

```typescript
interface ErrorResponse {
  error: string;         // Error message
  code: number;         // HTTP status code
  details?: any;        // Additional info
}
```

## Rate Limiting

- 60 requests per minute per IP
- 5000 requests per day per API key

## Caching

- Headlines cached for 1 hour
- RFPs cached for 4 hours
- Force refresh with `?fresh=true`

Edit this file to modify API endpoints, parameters, and behavior.