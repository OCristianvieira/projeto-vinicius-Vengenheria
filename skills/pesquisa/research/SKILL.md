---
name: research
description: >
  Comprehensive research grounded in web data with explicit citations.
  Use when you need multi-source synthesis—comparisons, current events, market analysis, detailed reports.
---

# Research Skill

Conduct comprehensive research on any topic with automatic source gathering, analysis, and response generation with citations.

## Authentication

If you prefer using an API key, get one at https://tavily.com and add to `~/.claude/settings.json`:
```json
{
  "env": {
    "TAVILY_API_KEY": "tvly-your-api-key-here"
  }
}
```

## Quick Start

> **Tip**: Research can take 30-120 seconds. Press **Ctrl+B** to run in the background.

### Basic Research (Python)

```python
from tavily import TavilyClient
import time

client = TavilyClient()

result = client.research(
    input="quantum computing trends",
    model="mini"
)
request_id = result["request_id"]

# Poll until completed
response = client.get_research(request_id)
while response["status"] not in ["completed", "failed"]:
    time.sleep(10)
    response = client.get_research(request_id)

print(response["content"])
```

## Parameters

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `input` | string | Required | Research topic or question |
| `model` | string | `"mini"` | Model: `mini`, `pro`, `auto` |

## Model Selection

**Rule of thumb**: "what does X do?" -> mini. "X vs Y vs Z" or "best way to..." -> pro.

| Model | Use Case | Speed |
|-------|----------|-------|
| `mini` | Single topic, targeted research | ~30s |
| `pro` | Comprehensive multi-angle analysis | ~60-120s |
| `auto` | API chooses based on complexity | Varies |

## Examples

### Quick Overview
```python
result = client.research(input="What is retrieval augmented generation?", model="mini")
```

### Technical Comparison
```python
result = client.research(input="LangGraph vs CrewAI for multi-agent systems", model="pro")
```

### Market Research
```python
result = client.research(input="Fintech startup landscape 2025", model="pro")
```
