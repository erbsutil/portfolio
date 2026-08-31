/**
 * Catalog builders from Astro content collections or filesystem MDX (MCP).
 */
import { profileOrigin } from "../../data/profile";
import type { AgentCatalog, CatalogWork } from "./types";

type ProjectLike = {
  id: string;
  data: {
    title: string;
    outcomeSummary: string;
    year: number;
    techStack?: string[];
    status?: string;
    role?: string;
    featured?: boolean;
    order?: number;
  };
};

type AppLike = {
  id: string;
  data: {
    title: string;
    tagline: string;
    description: string;
    year: number;
    techStack?: string[];
    status?: string;
    url?: string;
    featured?: boolean;
    order?: number;
  };
};

type TalkLike = {
  id: string;
  data: {
    title: string;
    description: string;
    event: string;
    date: Date | string;
    type?: string;
    topics?: string[];
    featured?: boolean;
  };
};

function originPath(path: string): string {
  const origin = profileOrigin();
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function catalogFromCollections(
  projects: ProjectLike[],
  apps: AppLike[],
  talks: TalkLike[],
): AgentCatalog {
  const cases: CatalogWork[] = [...projects]
    .sort((a, b) => {
      if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
      return (a.data.order ?? 99) - (b.data.order ?? 99) || b.data.year - a.data.year;
    })
    .map((p) => ({
      kind: "case" as const,
      slug: p.id,
      title: p.data.title,
      summary: p.data.outcomeSummary,
      url: originPath(`/en/projects/${p.id}`),
      mdUrl: originPath(`/en/projects/${p.id}.md`),
      mdUrlPt: originPath(`/pt-BR/projects/${p.id}.md`),
      year: p.data.year,
      techStack: p.data.techStack,
      status: p.data.status,
      role: p.data.role,
    }));

  const products: CatalogWork[] = [...apps]
    .sort((a, b) => {
      if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
      return (a.data.order ?? 99) - (b.data.order ?? 99) || b.data.year - a.data.year;
    })
    .map((a) => ({
      kind: "product" as const,
      slug: a.id,
      title: a.data.title,
      summary: a.data.tagline || a.data.description,
      url: originPath(`/en/products`),
      year: a.data.year,
      techStack: a.data.techStack,
      status: a.data.status,
      productUrl: a.data.url,
    }));

  const talkItems: CatalogWork[] = [...talks]
    .sort((a, b) => {
      const da = new Date(a.data.date).getTime();
      const db = new Date(b.data.date).getTime();
      return db - da;
    })
    .map((t) => ({
      kind: "talk" as const,
      slug: t.id,
      title: t.data.title,
      summary: t.data.description,
      url: originPath(`/en/community/${t.id}`),
      mdUrl: originPath(`/en/community/${t.id}.md`),
      mdUrlPt: originPath(`/pt-BR/community/${t.id}.md`),
      date: new Date(t.data.date).toISOString().slice(0, 10),
      topics: t.data.topics,
      event: t.data.event,
      type: t.data.type,
    }));

  return { cases, products, talks: talkItems };
}
