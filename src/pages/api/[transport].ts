/**
 * Remote MCP (Streamable HTTP + SSE via mcp-handler).
 * Route: /api/mcp (and /api/sse when requested)
 */
import type { APIRoute } from "astro";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { loadCatalogFromAstro } from "../../lib/agent/loadFromAstro";
import { guardMcpRequest } from "../../lib/agent/mcpGuard";
import {
  contextForBriefTool,
  getExperienceTool,
  getProfileTool,
  getWorkTool,
  listTalksTool,
  listWorkTool,
  searchTool,
} from "../../lib/agent/tools";

export const prerender = false;

const handler = createMcpHandler(
  (server) => {
    const catalog = () => loadCatalogFromAstro();

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
          stack: z.string().optional(),
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
          slug: z.string(),
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
          query: z.string(),
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
          brief: z.string().describe("Brief, role outline, or collaboration topic"),
        },
      },
      async ({ brief }) => contextForBriefTool(await catalog(), brief),
    );
  },
  {
    serverInfo: {
      name: "erbsu-portfolio",
      version: "1.0.0",
    },
  },
  {
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: false,
  },
);

const route: APIRoute = ({ request }) => {
  const blocked = guardMcpRequest(request);
  if (blocked) return blocked;
  return handler(request);
};

export const GET = route;
export const POST = route;
export const DELETE = route;
