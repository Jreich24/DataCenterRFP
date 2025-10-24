# Display Configuration

## Layout Configuration

Configure the split-screen layout:

```json
{
  "layout": {
    "type": "split-screen",
    "orientation": "vertical",
    "topSection": {
      "component": "news",
      "height": "50vh",
      "minHeight": "400px"
    },
    "bottomSection": {
      "component": "rfps",
      "height": "50vh",
      "minHeight": "400px"
    },
    "divider": {
      "style": "draggable",
      "defaultPosition": "50%"
    }
  }
}
```

## News Highlights Section

Configure the news section in the top half:

```json
{
  "newsSection": {
    "header": {
      "title": "Recent Data Center News",
      "actions": ["refresh", "expand", "filter"]
    },
    "layout": {
      "style": "modern-list",
      "itemSpacing": "16px",
      "highlightFirst": true
    },
    "featuredStory": {
      "enabled": true,
      "style": "card",
      "height": "200px",
      "showImage": true
    },
    "items": {
      "style": "compact-card",
      "showMetrics": true,
      "hover": "expand"
    },
    "displayFields": {
      "primary": [
        "title",
        "date",
        "source"
      ],
      "secondary": [
        "region",
        "powerMarket",
        "capacity",
        "investment"
      ],
      "expanded": [
        "summary",
        "relatedStories"
      ]
    },
    "filters": {
      "position": "top",
      "style": "chip-group",
      "quickFilters": [
        {
          "label": "Last 24 Hours",
          "value": "1d"
        },
        {
          "label": "Power Markets",
          "value": "powerMarkets"
        },
        {
          "label": "Expansions",
          "value": "expansion"
        }
      ],
      "advancedFilters": {
        "date": {
          "type": "dateRange",
          "presets": ["24h", "7d", "30d", "custom"]
        },
        "region": {
          "type": "multiSelect",
          "source": "powerMarkets"
        },
        "type": {
          "type": "multiSelect",
          "options": [
            "expansion",
            "acquisition",
            "sustainability",
            "technology"
          ]
        }
      },
      "sorting": {
        "options": [
          {
            "label": "Most Recent",
            "value": "date-desc"
          },
          {
            "label": "Largest Capacity",
            "value": "capacity-desc"
          },
          {
            "label": "Highest Investment",
            "value": "investment-desc"
          }
        ]
      }
    }
  }
}
```

## RFP Tracker Section

Configure the RFP section in the bottom half:

```json
{
  "rfpSection": {
    "header": {
      "title": "Data Center RFP Tracker",
      "actions": ["refresh", "expand", "export"]
    },
    "layout": {
      "style": "data-grid",
      "density": "comfortable",
      "stickyHeader": true
    },
    "columns": [
      {
        "field": "status",
        "width": 80,
        "type": "status-indicator"
      },
      {
        "field": "title",
        "width": "2fr",
        "primary": true
      },
      {
        "field": "powerMarket",
        "width": "1fr"
      },
      {
        "field": "capacity",
        "width": "1fr",
        "type": "numeric"
      },
      {
        "field": "dueDate",
        "width": "1fr",
        "type": "date"
      },
      {
        "field": "organization",
        "width": "1fr"
      }
    ],
    "filters": {
      "position": "top",
      "style": "toolbar",
      "quickFilters": [
        {
          "label": "Active RFPs",
          "value": "active"
        },
        {
          "label": "Due Soon",
          "value": "due-7d"
        },
        {
          "label": "High Priority",
          "value": "priority-high"
        }
      ],
      "advancedFilters": {
        "dueDate": {
          "type": "dateRange",
          "presets": ["7d", "30d", "90d", "custom"]
        },
        "powerMarket": {
          "type": "multiSelect",
          "source": "powerMarkets"
        },
        "capacity": {
          "type": "range",
          "unit": "MW",
          "min": 0,
          "max": 1000
        },
        "type": {
          "type": "multiSelect",
          "options": [
            "New Construction",
            "Expansion",
            "Power Infrastructure",
            "Cooling Systems"
          ]
        },
        "status": {
          "type": "multiSelect",
          "options": [
            "Draft",
            "Open",
            "Due Soon",
            "Under Review",
            "Awarded",
            "Closed"
          ]
        }
      },
      "sorting": {
        "options": [
          {
            "label": "Due Date (Ascending)",
            "value": "dueDate-asc"
          },
          {
            "label": "Capacity (Descending)",
            "value": "capacity-desc"
          },
          {
            "label": "Recently Added",
            "value": "created-desc"
          }
        ]
      }
    },
    "actions": {
      "rowActions": [
        "view",
        "edit",
        "track",
        "export"
      ],
      "batchActions": [
        "export",
        "track",
        "share"
      ]
    }
  }
}
```

## Theme & Styling

Customize the visual appearance:

```json
{
  "theme": {
    "mode": "dark",
    "colors": {
      "primary": "#4f9fff",
      "secondary": "#60cdff",
      "background": {
        "main": "#1a1a1a",
        "sections": "#2d2d2d",
        "hover": "#363636"
      },
      "text": {
        "primary": "#ffffff",
        "secondary": "#b3b3b3",
        "muted": "#808080"
      },
      "card": {
        "background": "#2d2d2d",
        "border": "#404040",
        "hover": "#363636"
      },
      "divider": "#404040",
      "status": {
        "success": "#4caf50",
        "warning": "#ff9800",
        "error": "#f44336",
        "info": "#2196f3"
      }
    },
    "typography": {
      "fonts": {
        "primary": "Calibri",
        "fallback": "-apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif"
      },
      "weights": {
        "normal": 400,
        "medium": 500,
        "bold": 700
      },
      "sizes": {
        "h1": "24px",
        "h2": "20px",
        "h3": "16px",
        "body": "14px",
        "small": "12px"
      }
    },
    "spacing": {
      "sectionPadding": "24px",
      "cardPadding": "16px",
      "itemSpacing": "12px"
    },
    "borders": {
      "radius": {
        "small": "4px",
        "medium": "8px",
        "large": "12px"
      }
    },
    "shadows": {
      "card": "0 2px 4px rgba(0, 0, 0, 0.2)",
      "raised": "0 4px 8px rgba(0, 0, 0, 0.3)",
      "modal": "0 8px 16px rgba(0, 0, 0, 0.4)"
    },
    "transitions": {
      "hover": "all 0.2s ease",
      "expand": "all 0.3s ease"
    },
    "sections": {
      "news": {
        "background": "#2d2d2d",
        "headerBg": "#262626",
        "cardBg": "#333333",
        "hover": "#363636"
      },
      "rfps": {
        "background": "#2d2d2d",
        "headerBg": "#262626",
        "rowBg": "#333333",
        "altRowBg": "#2f2f2f",
        "hover": "#363636"
      }
    },
    "components": {
      "button": {
        "primary": {
          "background": "#4f9fff",
          "hover": "#60a9ff",
          "text": "#ffffff"
        },
        "secondary": {
          "background": "#404040",
          "hover": "#4a4a4a",
          "text": "#ffffff"
        }
      },
      "input": {
        "background": "#333333",
        "border": "#404040",
        "text": "#ffffff",
        "placeholder": "#808080"
      },
      "select": {
        "background": "#333333",
        "optionHover": "#363636",
        "selected": "#404040"
      },
      "scrollbar": {
        "track": "#2d2d2d",
        "thumb": "#404040",
        "hover": "#4a4a4a"
      }
    }
  }
}
```

Edit this file to modify how content is displayed in the UI.