/**
 * Shared catalog types for cases, products, and talks (agent-readable layer).
 */

export type WorkKind = "case" | "product" | "talk";

export type CatalogWork = {
  kind: WorkKind;
  slug: string;
  title: string;
  summary: string;
  url: string;
  /** Clean markdown mirror (EN), when generated for cases/talks. */
  mdUrl?: string;
  /** Clean markdown mirror (pt-BR), when generated for cases/talks. */
  mdUrlPt?: string;
  year?: number;
  date?: string;
  techStack?: string[];
  topics?: string[];
  status?: string;
  event?: string;
  type?: string;
  role?: string;
  productUrl?: string;
};

export type AgentCatalog = {
  cases: CatalogWork[];
  products: CatalogWork[];
  talks: CatalogWork[];
};

export function allWork(catalog: AgentCatalog): CatalogWork[] {
  return [...catalog.cases, ...catalog.products, ...catalog.talks];
}
