# Portfolio MCP (stdio)

Read-only Model Context Protocol server for Erick Sutil's portfolio. Agents and tooling can query profile, experience, cases, products, and talks without scraping HTML.

## Tools

| Tool | Description |
|------|-------------|
| `get_profile` | Bio, title, links, skills, contact note |
| `get_experience` | Work history (optional `tag` filter) |
| `list_work` | Cases / products / talks (`kind`, `stack`, `status`) |
| `get_work` | One item by slug |
| `list_talks` | Community engagements |
| `search` | Keyword search across profile + work |
| `context_for_brief` | Structured profile context for a brief or topic (no score) |

Resources: `profile://resume` (Markdown), `profile://json` (JSON Resume).

## Install (local stdio)

From this directory:

```bash
npm install
```

## Cursor / Claude Desktop (stdio)

```json
{
  "mcpServers": {
    "erbsu-portfolio": {
      "command": "npx",
      "args": ["tsx", "/ABSOLUTE/PATH/TO/portfolio/mcp/src/index.ts"]
    }
  }
}
```

Or from the portfolio root:

```json
{
  "mcpServers": {
    "erbsu-portfolio": {
      "command": "npm",
      "args": ["run", "start", "--prefix", "/ABSOLUTE/PATH/TO/portfolio/mcp"]
    }
  }
}
```

## Remote (Streamable HTTP)

`https://www.erbsu.com/api/mcp`

```json
{
  "mcpServers": {
    "erbsu-portfolio": {
      "url": "https://www.erbsu.com/api/mcp"
    }
  }
}
```

Optional bearer: set `MCP_API_KEY` on the host and send `Authorization: Bearer <key>`.

Stdio-only clients can use [mcp-remote](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "erbsu-portfolio": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://www.erbsu.com/api/mcp"]
    }
  }
}
```
