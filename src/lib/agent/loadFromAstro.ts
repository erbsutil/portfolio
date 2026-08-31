/**
 * Load agent catalog from Astro content collections (build-time / SSR).
 */
import { getCollection } from "astro:content";
import { catalogFromCollections } from "./catalog";
import type { AgentCatalog } from "./types";

export async function loadCatalogFromAstro(): Promise<AgentCatalog> {
  const [projects, apps, talks] = await Promise.all([
    getCollection("projects"),
    getCollection("apps"),
    getCollection("speaking"),
  ]);
  return catalogFromCollections(projects, apps, talks);
}
