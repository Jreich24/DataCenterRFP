# AI Processing Instructions

## News Processing Prompts

Add your instructions below to customize how the AI processes and presents news items.

### Current Active Prompt
```

Task Number 1:
On the homepage dedicate a section titled "RFP Tracker" to the bottom half of the page.
Follow these instructions below to accomplish task number 1:
Find me the most recent and comprehensive Request for Proposals (“RFPs”) in the data center sector with a focus on big technology companies, but inclusive of any others. Provide a detailed table for each RFP containing the following fields and sorting from most recently announced to oldest announced:
• Company/Agency issuing the RFP 
• Precise RFP Target (group into clearly identifiable groups)
• Project location (city, state, country)
• Facility site if mentioned
• Capacity or scale (in MW or GW)
• Date announced (month/day/year) (no descriptions)
• Final Proposal deadline (month/day/year) (no descriptions)
• Technology focus and eligible generation/storage types (e.g., SMR, electrolysis, hydrogen, renewables, hybrid systems, BESS) (group into clearly identifiable technologies with no descriptions)
• Ownership structure/financing model (PPA, JV, merchant, utility-owned, RAB, etc.)
• Behind-the-meter or front-of-the-meter configuration
• PPA length ("XX" years)
• Contract terms
• Source URLs/links to articles that discuss the RFP

Additional instructions for task number 1:

Ensure all data is up-to-date, directly sourced from official postings or developer portals, and clarify any ambiguous criteria in a dedicated Notes/Comments column.

For each RFP, cite the official publication/source and solicitation ID for fact-checking.
Flag duplicates or previously listed deals in a ‘Duplicate/Merged Status’ column.
Exclude any entries already described in previous responses.
Share a brief note on the verification steps taken and the source’s last updated date.

This prompt will be run on a daily automated basis. Ensure each report only contains new, unduplicated RFPs not previously included.

Rigorously deduplicate using all identifiers, and maintain a history of included RFPs—never require manual cleanup before sharing.

Format plainly and consistently as a table, one RFP per row, with no commentary or redundancy, and include sources for each entry.

Task number 2:
On the top half of the homepage, create a section titled "Recent News Developments". Follow the below instructions to create the page:

Instructions for task #2:

On the top half of the homepage, create a section that shows the top 10 most recent new articles about the data center sector with a focus on the power/electrification of the sector. Display the date the news article was released, the headline, and a button to click to go to the source. Sort the section from most recent to least recent. 
```

### Example Prompts

1. **Geographic Focus**
```
Focus on data center developments in the US specifically but include developments from around the world. 
```

2. **Investment Tracking**
```
Find headlines about data center investments and acquisitions.
Extract and display: 
- Investment amount
- Location
- Company names
- Facility size/capacity
```

3. **Sustainability Focus**
```
Filter for news about sustainable data center initiatives.
Look for mentions of:
- Behind-the-meter ("BTM") deals
- Front-of-the-meter ("FTM") deals
- Renewable energy projects
- Carbon reduction goals
```

## How to Use

1. Replace the "Current Active Prompt" section with your desired processing instructions
2. The AI will use these instructions to:
   - Filter and prioritize headlines
   - Extract specific details
   - Format the display
   - Group and sort results

## Prompt Tips

- Be specific about what information to extract
- Mention any grouping or sorting preferences
- Include any specific metrics or details to highlight
- Specify time ranges if relevant

Edit the "Current Active Prompt" section above to modify how the AI processes and presents news items.