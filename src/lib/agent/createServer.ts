/**
 * Create a configured MCP server for the portfolio profile.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { AgentCatalog } from "./types";
import {
  contextForBriefTool,
  getExperienceTool,
  getProfileTool,
  getWorkTool,
  listTalksTool,
  listWorkTool,
  resumeResourceJson,
  resumeResourceMarkdown,
  searchTool,
} from "./tools";

export function createPortfolioMcpServer(
  getCatalog: () => Promise<AgentCatalog> | AgentCatalog,
): McpServer {
  const server = new McpServer({
    name: "erbsu-portfolio",
    version: "1.0.0",
  });

  const catalog = async () => await getCatalog();

  server.registerTool(
    "get_profile",
    {
      title: "Get profile",
      description: "Core profile: bio, title, links, skills, and contact note.",
      inputSchema: {},
    },
    async () => getProfileTool(),
  );

  server.registerTool(
    "get_experience",
    {
      title: "Get experience",
      description:
        "Work history. Optional tag filters bullets (e.g. microfrontends, ai, performance).",
      inputSchema: {
        tag: z.string().optional().describe("Optional highlight tag filter"),
      },
    },
    async ({ tag }) => getExperienceTool(tag),
  );

  server.registerTool(
    "list_work",
    {
      title: "List work",
      description:
        "List cases and products. Filter by kind (case|product|talk), stack, or status.",
      inputSchema: {
        kind: z.enum(["case", "product", "talk"]).optional(),
        stack: z.string().optional().describe("Technology substring"),
        status: z.string().optional(),
      },
    },
    async ({ kind, stack, status }) =>
      listWorkTool(await catalog(), { kind, stack, status }),
  );

  server.registerTool(
    "get_work",
    {
      title: "Get work",
      description: "Details for one case, product, or talk by slug.",
      inputSchema: {
        slug: z.string().describe("Content slug"),
      },
    },
    async ({ slug }) => getWorkTool(await catalog(), slug),
  );

  server.registerTool(
    "list_talks",
    {
      title: "List talks",
      description: "Community talks, workshops, and mentoring.",
      inputSchema: {},
    },
    async () => listTalksTool(await catalog()),
  );

  server.registerTool(
    "search",
    {
      title: "Search",
      description:
        "Keyword search across experience, skills, cases, products, and talks.",
      inputSchema: {
        query: z.string().describe("Search query"),
      },
    },
    async ({ query }) => searchTool(await catalog(), query),
  );

  server.registerTool(
    "context_for_brief",
    {
      title: "Context for brief",
      description:
        "Return structured profile context related to a brief (role, project, or collaboration topic). No score is computed.",
      inputSchema: {
        brief: z
          .string()
          .describe("Brief, role outline, or collaboration topic"),
      },
    },
    async ({ brief }) => contextForBriefTool(await catalog(), brief),
  );

  server.registerResource(
    "resume-markdown",
    "profile://resume",
    {
      title: "Resume (Markdown)",
      description: "Full resume as Markdown",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: resumeResourceMarkdown(await catalog()),
        },
      ],
    }),
  );

  server.registerResource(
    "resume-json",
    "profile://json",
    {
      title: "Resume (JSON)",
      description: "JSON Resume document",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(resumeResourceJson(await catalog()), null, 2),
        },
      ],
    }),
  );

  return server;
}
