# Scraping Configuration

## News Sources

Configure which sites to scrape for data center industry news:

```json
{
  "sources": [
    {
      "name": "Wall Street Journal",
      "url": "https://www.wsj.com/news/technology",
      "selectors": {
        "headlines": "article h2 a",
        "date": "[data-timestamp]",
        "source": ".category",
        "keywords": ["data center", "cloud", "infrastructure"]
      },
      "updateInterval": "30m",
      "requiresSubscription": true,
      "apiKey": "YOUR_WSJ_API_KEY"
    },
    {
      "name": "Yahoo Finance",
      "url": "https://finance.yahoo.com/topic/technology",
      "selectors": {
        "headlines": "h3.Mb\\(5px\\) a",
        "date": "span.Fz\\(11px\\)",
        "source": ".C\\(\\#959595\\)",
        "keywords": ["data center", "cloud infrastructure", "digital infrastructure"]
      },
      "updateInterval": "15m",
      "rssFeed": "https://finance.yahoo.com/rss/technology"
    },
    {
      "name": "Financial Times",
      "url": "https://www.ft.com/technology",
      "selectors": {
        "headlines": ".js-teaser-heading-link",
        "date": "time.o-date",
        "source": ".o-teaser__tag",
        "keywords": ["data centre", "infrastructure", "cloud computing"]
      },
      "updateInterval": "1h",
      "requiresSubscription": true,
      "apiKey": "YOUR_FT_API_KEY"
    },
    {
      "name": "Data Center Knowledge",
      "url": "https://www.datacenterknowledge.com/",
      "selectors": {
        "headlines": "h2 a",
        "date": ".article-date",
        "source": ".source"
      },
      "updateInterval": "1h"
    },
    {
      "name": "Data Center Frontier",
      "url": "https://www.datacenterfrontier.com/",
      "selectors": {
        "headlines": "h2 a",
        "date": ".entry-date",
        "source": ".source-link"
      },
      "updateInterval": "2h"
    },
    {
      "name": "Data Center Dynamics",
      "url": "https://www.datacenterdynamics.com/news/",
      "selectors": {
        "headlines": "article h2 a",
        "date": ".article-date",
        "source": ".source-name"
      },
      "updateInterval": "1h"
    },
    {
      "name": "Data Center Magazine",
      "url": "https://datacentremagazine.com/",
      "selectors": {
        "headlines": ".article-card__title a",
        "date": ".article-card__date",
        "source": ".article-card__category"
      },
      "updateInterval": "4h"
    },
    {
      "name": "Mission Critical Magazine",
      "url": "https://www.missioncriticalmagazine.com/",
      "selectors": {
        "headlines": ".article-card h2 a",
        "date": ".article-date",
        "source": ".category-tag"
      },
      "updateInterval": "4h"
    },
    {
      "name": "Data Economy",
      "url": "https://dataeconomy.com/",
      "selectors": {
        "headlines": ".post-title a",
        "date": ".post-date",
        "source": ".post-category"
      },
      "updateInterval": "2h"
    },
    {
      "name": "Capacity Media",
      "url": "https://www.capacitymedia.com/data-centers",
      "selectors": {
        "headlines": ".article-title a",
        "date": ".article-date",
        "source": ".article-category"
      },
      "updateInterval": "4h"
    },
    {
      "name": "BizClik Data Centre Magazine",
      "url": "https://datacentermagazine.com/articles",
      "selectors": {
        "headlines": ".article-title a",
        "date": ".published-date",
        "source": ".category"
      },
      "updateInterval": "6h"
    }
  ]
}
```

## Filtering Rules

Define how to filter and process the scraped content:

```json
{
  "filters": {
    "categories": {
      "expansion": {
        "keywords": [
          "expansion",
          "new facility",
          "breaking ground",
          "development",
          "campus",
          "megacampus"
        ],
        "metrics": [
          "MW",
          "square feet",
          "acres",
          "capacity"
          "GW"
        ]
      },
      "investment": {
        "keywords": [
          "investment",
          "funding",
          "capital",
          "financing",
          "venture",
          "million",
          "billion"
        ],
        "metrics": [
          "USD",
          "EUR",
          "investment round",
          "valuation"
        ]
      },
      "acquisition": {
        "keywords": [
          "acquisition",
          "merger",
          "takeover",
          "consolidation",
          "portfolio purchase"
        ]
      },
      "sustainability": {
        "keywords": [
          "renewable",
          "solar",
          "wind",
          "green",
          "carbon neutral",
          "net zero",
          "PUE"
        ],
        "metrics": [
          "CO2",
          "PUE",
          "WUE",
          "renewable percentage"
        ]
      },
      "technology": {
        "keywords": [
          "cooling",
          "infrastructure",
          "power systems",
          "network",
          "interconnection",
          "edge computing"
        ]
      }
    },
    "regions": {
      "powerMarkets": {
        "ERCOT": {
          "states": ["TX"],
          "keyMarkets": [
            "Dallas-Fort Worth",
            "Houston",
            "Austin",
            "San Antonio"
          ],
          "metrics": [
            "wholesale power prices",
            "renewable mix",
            "grid stability",
            "interconnection queue"
          ],
          "keywords": [
            "ERCOT",
            "Texas grid",
            "power reliability",
            "renewable integration"
          ]
        },
        "PJM": {
          "states": [
            "VA", "PA", "NJ", "MD", 
            "DE", "IL", "OH", "WV",
            "NC", "MI", "IN", "KY"
          ],
          "keyMarkets": [
            "Northern Virginia",
            "Ashburn",
            "Chicago",
            "Columbus"
          ],
          "metrics": [
            "capacity prices",
            "transmission constraints",
            "interconnection backlog",
            "power pricing"
          ],
          "keywords": [
            "PJM",
            "capacity market",
            "grid congestion",
            "interconnection study"
          ]
        },
        "SPP": {
          "states": [
            "KS", "OK", "NE", "AR",
            "MO", "ND", "SD"
          ],
          "keyMarkets": [
            "Kansas City",
            "Tulsa",
            "Oklahoma City"
          ],
          "metrics": [
            "wind penetration",
            "transmission expansion",
            "market prices"
          ],
          "keywords": [
            "SPP",
            "wind energy",
            "transmission planning"
          ]
        },
        "MISO": {
          "states": [
            "MN", "IA", "MO", "IL",
            "WI", "MI", "IN", "AR",
            "MS", "LA"
          ],
          "keyMarkets": [
            "Chicago",
            "Minneapolis",
            "Detroit"
          ],
          "metrics": [
            "renewable integration",
            "transmission capacity",
            "market clearing prices"
          ]
        },
        "NYISO": {
          "states": ["NY"],
          "keyMarkets": [
            "New York Metro",
            "Albany",
            "Buffalo"
          ],
          "metrics": [
            "capacity costs",
            "transmission constraints",
            "renewable targets"
          ]
        },
        "ISO-NE": {
          "states": [
            "ME", "NH", "VT", "MA",
            "CT", "RI"
          ],
          "keyMarkets": [
            "Boston",
            "Providence",
            "Hartford"
          ],
          "metrics": [
            "capacity costs",
            "fuel security",
            "renewable integration"
          ]
        },
        "CAISO": {
          "states": ["CA"],
          "keyMarkets": [
            "Silicon Valley",
            "Los Angeles",
            "Sacramento"
          ],
          "metrics": [
            "renewable curtailment",
            "transmission constraints",
            "market prices",
            "carbon pricing"
          ]
        }
      },
      "powerMetrics": {
        "reliability": [
          "outage frequency",
          "grid stability",
          "redundancy",
          "backup systems"
        ],
        "sustainability": [
          "renewable percentage",
          "carbon intensity",
          "PPA availability",
          "green tariffs"
        ],
        "costs": [
          "wholesale rates",
          "demand charges",
          "transmission costs",
          "capacity charges"
        ],
        "infrastructure": [
          "substation capacity",
          "transmission headroom",
          "interconnection availability",
          "grid modernization"
        ]
      },
      "europeanRegions": {
        "northernEurope": {
          "regions": [
            "Nordic-Baltic",
            "British Isles",
            "North Sea"
          ],
          "powerSystems": {
            "nordPool": {
              "description": "Nordic and Baltic power market",
              "coverage": [
                "Norway",
                "Sweden",
                "Finland",
                "Denmark",
                "Estonia",
                "Latvia",
                "Lithuania"
              ],
              "metrics": [
                "hydropower capacity",
                "wind integration",
                "cross-border capacity",
                "spot prices"
              ]
            },
            "ukPowerMarket": {
              "description": "British electricity market",
              "metrics": [
                "capacity market",
                "renewable obligations",
                "grid stability",
                "interconnector capacity"
              ]
            }
          },
          "keyFeatures": [
            "abundant renewable resources",
            "stable grid infrastructure",
            "cold climate advantages",
            "submarine cable connections"
          ]
        },
        "centralEurope": {
          "regions": [
            "DACH",
            "Benelux",
            "Central-East"
          ],
          "powerSystems": {
            "germanMarket": {
              "description": "Central European power hub",
              "metrics": [
                "renewable penetration",
                "industrial power prices",
                "grid congestion",
                "interconnection capacity"
              ]
            },
            "centralEuropeanGrid": {
              "metrics": [
                "cross-border flows",
                "market coupling",
                "frequency stability",
                "reserve capacity"
              ]
            }
          },
          "keyFeatures": [
            "industrial base",
            "interconnected grids",
            "energy transition policies",
            "market integration"
          ]
        },
        "southernEurope": {
          "regions": [
            "Mediterranean",
            "Iberian",
            "Adriatic"
          ],
          "powerSystems": {
            "iberianMarket": {
              "description": "MIBEL power market",
              "metrics": [
                "solar potential",
                "renewable integration",
                "interconnection constraints",
                "market prices"
              ]
            },
            "mediterraneanGrid": {
              "metrics": [
                "thermal generation",
                "renewable deployment",
                "grid stability",
                "interconnector capacity"
              ]
            }
          },
          "keyFeatures": [
            "solar resources",
            "emerging renewables",
            "grid modernization",
            "interconnector projects"
          ]
        },
        "europeanMetrics": {
          "powerMarket": {
            "wholesale": [
              "day-ahead prices",
              "intraday market",
              "balancing costs",
              "capacity mechanisms"
            ],
            "transmission": [
              "cross-border capacity",
              "congestion rates",
              "interconnector availability",
              "grid expansion plans"
            ],
            "renewable": [
              "generation mix",
              "curtailment rates",
              "support schemes",
              "PPA market"
            ]
          },
          "infrastructure": {
            "grid": [
              "transmission capacity",
              "distribution networks",
              "smart grid deployment",
              "storage integration"
            ],
            "interconnection": [
              "cross-border links",
              "capacity allocation",
              "market coupling",
              "system integration"
            ]
          },
          "policy": {
            "energyTransition": [
              "carbon pricing",
              "renewable targets",
              "efficiency standards",
              "grid codes"
            ],
            "marketDesign": [
              "capacity mechanisms",
              "ancillary services",
              "flexibility markets",
              "demand response"
            ]
          }
        }
      }
    },
    "companies": {
      "operators": [
        "Digital Realty",
        "Equinix",
        "CyrusOne",
        "QTS",
        "NTT",
        "Iron Mountain"
      ],
      "hyperscalers": [
        "Amazon Web Services",
        "Microsoft Azure",
        "Google Cloud",
        "Meta",
        "Apple"
      ],
      "contractors": [
        "Turner Construction",
        "DPR Construction",
        "Holder Construction"
      ]
    },
    "exclusions": {
      "contentTypes": [
        "webinar",
        "sponsored",
        "advertisement",
        "whitepaper"
      ],
      "phrases": [
        "register now",
        "download our",
        "subscribe to"
      ]
    },
    "processing": {
      "extractMetrics": true,
      "highlightCompanies": true,
      "categorizeByType": true,
      "identifyTrends": true,
      "minimumConfidence": 0.8,
      "deduplication": {
        "enabled": true,
        "similarityThreshold": 0.85,
        "timeWindow": "24h"
      },
      "summaryGeneration": {
        "enabled": true,
        "maxLength": 280,
        "includeMetrics": true
      }
    }
  }
}
```

## Update Schedule

Configure when and how often to fetch new content:

```json
{
  "schedule": {
    "news": {
      "interval": "1h",
      "retainDays": 7
    },
    "rfps": {
      "interval": "4h",
      "retainDays": 30
    }
  }
}
```

Edit this file to modify scraping behavior, sources, and filtering rules.