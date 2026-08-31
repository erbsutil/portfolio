import type { APIRoute } from "astro";
import { buildLlmsTxt } from "../lib/agent/llms";
import { loadCatalogFromAstro } from "../lib/agent/loadFromAstro";

export const GET: APIRoute = async () => {
  const catalog = await loadCatalogFromAstro();
  return new Response(buildLlmsTxt(catalog), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
