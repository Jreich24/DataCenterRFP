# Core Requirements

## Project Overview

This web interface helps teams track data center industry developments and RFPs by:
1. Automatically scraping news from industry sources
2. Monitoring for new RFP opportunities
3. Displaying filtered results in an organized dashboard

## Key Features

### News Tracking

- [ ] Scrape headlines from configured industry news sources
- [ ] Filter by keywords, regions, and dates
- [ ] Group and sort results by various criteria
- [ ] Update content automatically on configured schedule
- [ ] Allow manual refresh/fetch with custom filters

### RFP Monitoring

- [ ] Track new RFP postings from government/private sources
- [ ] Filter by location, type, and requirements
- [ ] Show due dates and submission details
- [ ] Alert on new matching opportunities
- [ ] Export RFP details to PDF/CSV

### User Interface

- [ ] Clean, responsive dashboard layout
- [ ] Easy filtering and search
- [ ] Configurable views (cards, table, etc.)
- [ ] Save favorite searches/filters
- [ ] Email alerts for new matches

## Technical Requirements

### Backend

- Node.js + Express API
- TypeScript for type safety
- Cheerio for HTML parsing
- Redis/MongoDB for caching
- Background job scheduling

### Frontend

- React + TypeScript
- Material UI components
- Responsive design
- Client-side caching
- Error handling & loading states

## Development Process

1. Set up development environment
2. Implement basic scraping for 1-2 sources
3. Create simple UI to display results
4. Add filtering and search
5. Expand sources and features
6. Add RFP tracking
7. Polish UI and UX
8. Deploy and monitor

Edit this file to modify core project requirements and features.