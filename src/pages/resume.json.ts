import type { APIRoute } from "astro";
import { buildResumeJson } from "../lib/agent/resume";
import { loadCatalogFromAstro } from "../lib/agent/loadFromAstro";

export const GET: APIRoute = async () => {
  const catalog = await loadCatalogFromAstro();
  const resume = buildResumeJson(catalog);
  return new Response(JSON.stringify(resume, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
