#!/usr/bin/env node
/**
 * Stdio MCP server for Erick Sutil's portfolio.
 *
 * Cursor / Claude Desktop:
 * {
 *   "mcpServers": {
 *     "erbsu": {
 *       "command": "npx",
 *       "args": ["tsx", "/absolute/path/to/portfolio/mcp/src/index.ts"]
 *     }
 *   }
 * }
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createPortfolioMcpServer } from "../../src/lib/agent/createServer.ts";
import { loadCatalogFromFs } from "../../src/lib/agent/loadFromFs.ts";

const server = createPortfolioMcpServer(() => loadCatalogFromFs());
const transport = new StdioServerTransport();
await server.connect(transport);
