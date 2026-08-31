/**
 * Load catalog by parsing MDX frontmatter from the filesystem (MCP / Node).
 * Avoids `astro:content` so the stdio server and serverless MCP can share data.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { catalogFromCollections } from "./catalog";
import type { AgentCatalog } from "./types";

function contentRoot(): string {
  // src/lib/agent → ../../../src/content
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../../content");
}

/** Minimal YAML-ish frontmatter parser for our MDX files (no nested objects needed beyond arrays/strings). */
export function parseMdxFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentList: unknown[] | null = null;

  for (const line of block.split(/\r?\n/)) {
    if (/^\s+-\s+/.test(line) && currentKey && currentList) {
      const item = line.replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, "");
      currentList.push(coerce(item));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    if (currentKey && currentList) {
      data[currentKey] = currentList;
      currentList = null;
    }
    currentKey = kv[1];
    const value = kv[2].trim();
    if (value === "" || value === "|" || value === ">") {
      currentList = [];
      data[currentKey] = currentList;
      continue;
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      data[currentKey] = value
        .slice(1, -1)
        .split(",")
        .map((s) => coerce(s.trim().replace(/^["']|["']$/g, "")))
        .filter((s) => s !== "");
      currentKey = null;
      continue;
    }
    data[currentKey] = coerce(value.replace(/^["']|["']$/g, ""));
    currentKey = null;
  }
  if (currentKey && currentList) {
    data[currentKey] = currentList;
  }
  return data;
}

function coerce(value: string): string | number | boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

async function loadDir(
  dir: string,
): Promise<{ id: string; data: Record<string, unknown> }[]> {
  const root = path.join(contentRoot(), dir);
  let files: string[];
  try {
    files = await readdir(root);
  } catch {
    return [];
  }
  const entries = [];
  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const raw = await readFile(path.join(root, file), "utf8");
    const data = parseMdxFrontmatter(raw);
    entries.push({ id: file.replace(/\.mdx$/, ""), data });
  }
  return entries;
}

export async function loadCatalogFromFs(): Promise<AgentCatalog> {
  const [projects, apps, talks] = await Promise.all([
    loadDir("projects"),
    loadDir("apps"),
    loadDir("speaking"),
  ]);

  return catalogFromCollections(
    projects.map((p) => ({
      id: p.id,
      data: {
        title: String(p.data.title ?? p.id),
        outcomeSummary: String(p.data.outcomeSummary ?? ""),
        year: Number(p.data.year ?? 0),
        techStack: (p.data.techStack as string[]) ?? [],
        status: p.data.status as string | undefined,
        role: p.data.role as string | undefined,
        featured: Boolean(p.data.featured),
        order: p.data.order as number | undefined,
      },
    })),
    apps.map((a) => ({
      id: a.id,
      data: {
        title: String(a.data.title ?? a.id),
        tagline: String(a.data.tagline ?? ""),
        description: String(a.data.description ?? ""),
        year: Number(a.data.year ?? 0),
        techStack: (a.data.techStack as string[]) ?? [],
        status: a.data.status as string | undefined,
        url: a.data.url as string | undefined,
        featured: Boolean(a.data.featured),
        order: a.data.order as number | undefined,
      },
    })),
    talks.map((t) => ({
      id: t.id,
      data: {
        title: String(t.data.title ?? t.id),
        description: String(t.data.description ?? ""),
        event: String(t.data.event ?? ""),
        date: t.data.date ? new Date(String(t.data.date)) : new Date(0),
        type: t.data.type as string | undefined,
        topics: (t.data.topics as string[]) ?? [],
        featured: Boolean(t.data.featured),
      },
    })),
  );
}
