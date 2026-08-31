/**
 * MCP tool implementations (shared by stdio package and HTTP endpoint).
 */
import { profile } from "../../data/profile";
import { buildResumeJson, buildResumeMarkdown } from "./resume";
import type { AgentCatalog, CatalogWork } from "./types";
import { allWork } from "./types";

function textResult(data: unknown) {
  const text =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);
  const structuredContent =
    typeof data === "string"
      ? { text: data }
      : data !== null && typeof data === "object"
        ? (data as Record<string, unknown>)
        : { value: data };
  return {
    content: [{ type: "text" as const, text }],
    structuredContent,
  };
}

function matchesQuery(haystack: string, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return haystack.toLowerCase().includes(q);
}

function workBlob(w: CatalogWork): string {
  return [
    w.title,
    w.summary,
    w.slug,
    w.role,
    w.event,
    w.status,
    ...(w.techStack ?? []),
    ...(w.topics ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

export function getProfileTool() {
  return textResult({
    name: profile.fullName,
    label: profile.label,
    summary: profile.summary,
    contactNote: profile.contactNote,
    email: profile.email,
    location: profile.location,
    links: profile.links,
    sameAs: profile.sameAs,
    knowsAbout: profile.knowsAbout,
    worksFor: profile.worksFor,
    skills: profile.skills,
    languages: profile.languages,
  });
}

export function getExperienceTool(tag?: string) {
  const roles = profile.experience.map((role) => {
    const highlights = tag
      ? role.highlights.filter((h) =>
          h.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
        )
      : role.highlights;
    return {
      company: role.company,
      position: role.position,
      startDate: role.startDate,
      endDate: role.endDate,
      location: role.location,
      highlights: highlights.map((h) => ({ text: h.text, tags: h.tags })),
    };
  }).filter((r) => !tag || r.highlights.length > 0);

  return textResult({ tag: tag ?? null, roles });
}

export function listWorkTool(
  catalog: AgentCatalog,
  opts: { kind?: string; stack?: string; status?: string } = {},
) {
  let items = allWork(catalog);
  if (opts.kind) {
    items = items.filter((w) => w.kind === opts.kind);
  }
  if (opts.status) {
    items = items.filter(
      (w) => w.status?.toLowerCase() === opts.status!.toLowerCase(),
    );
  }
  if (opts.stack) {
    const needle = opts.stack.toLowerCase();
    items = items.filter((w) =>
      w.techStack?.some((t) => t.toLowerCase().includes(needle)),
    );
  }
  return textResult({
    count: items.length,
    items: items.map((w) => ({
      kind: w.kind,
      slug: w.slug,
      title: w.title,
      summary: w.summary,
      url: w.url,
      year: w.year,
      date: w.date,
      techStack: w.techStack,
      status: w.status,
      event: w.event,
    })),
  });
}

export function getWorkTool(catalog: AgentCatalog, slug: string) {
  const item = allWork(catalog).find(
    (w) => w.slug === slug || w.slug.endsWith(slug),
  );
  if (!item) {
    return textResult({ error: `No work found for slug: ${slug}` });
  }
  return textResult(item);
}

export function listTalksTool(catalog: AgentCatalog) {
  return textResult({
    count: catalog.talks.length,
    items: catalog.talks,
  });
}

export function searchTool(catalog: AgentCatalog, query: string) {
  const q = query.trim();
  const experienceHits = profile.experience.flatMap((role) =>
    role.highlights
      .filter((h) =>
        matchesQuery(
          `${role.position} ${role.company} ${h.text} ${h.tags.join(" ")}`,
          q,
        ),
      )
      .map((h) => ({
        source: "experience" as const,
        company: role.company,
        position: role.position,
        text: h.text,
        tags: h.tags,
      })),
  );

  const skillHits = profile.skills
    .filter((s) => matchesQuery(`${s.name} ${s.keywords.join(" ")}`, q))
    .map((s) => ({ source: "skills" as const, ...s }));

  const workHits = allWork(catalog)
    .filter((w) => matchesQuery(workBlob(w), q))
    .map((w) => ({ source: "work" as const, ...w }));

  return textResult({
    query: q,
    experience: experienceHits,
    skills: skillHits,
    work: workHits,
  });
}

/**
 * Structured profile context for a brief (role, project, or collaboration topic).
 * No score is computed; the calling agent interprets the overlap.
 */
export function contextForBriefTool(catalog: AgentCatalog, brief: string) {
  return textResult({
    note: "Context only. No score is computed server-side.",
    brief,
    profile: {
      name: profile.fullName,
      label: profile.label,
      summary: profile.summary,
      contactNote: profile.contactNote,
      knowsAbout: profile.knowsAbout,
      skills: profile.skills,
      experience: profile.experience.map((r) => ({
        company: r.company,
        position: r.position,
        startDate: r.startDate,
        endDate: r.endDate,
        highlights: r.highlights.map((h) => h.text),
      })),
      selectedWork: allWork(catalog).slice(0, 12).map((w) => ({
        kind: w.kind,
        title: w.title,
        summary: w.summary,
        url: w.url,
        techStack: w.techStack,
      })),
      contact: {
        email: profile.email,
        portfolio: profile.url,
        resumeJson: profile.links.resumeJson,
        mcp: profile.links.mcp,
      },
    },
  });
}

export function resumeResourceMarkdown(catalog: AgentCatalog) {
  return buildResumeMarkdown(catalog);
}

export function resumeResourceJson(catalog: AgentCatalog) {
  return buildResumeJson(catalog);
}
