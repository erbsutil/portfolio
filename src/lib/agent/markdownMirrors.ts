/**
 * Clean markdown mirrors for cases and talks (agent-readable, generated from
 * content collections + pt-BR overlays — no hand-copied drift).
 */
import { profile, profileOrigin } from "../../data/profile";
import type { AppLocale } from "../../i18n/config";

export type CaseMirrorData = {
  title: string;
  role: string;
  year: number;
  duration?: string;
  outcomeSummary: string;
  overview: string;
  problem: string;
  constraints: string[];
  approach: string;
  keyDecisions: Array<{
    decision: string;
    reasoning: string;
    alternatives?: string[];
  }>;
  techStack: string[];
  impact: {
    metrics?: Array<{ label: string; value: string }>;
    qualitative: string;
  };
  learnings: string[];
  status?: string;
};

export type TalkMirrorData = {
  title: string;
  description: string;
  event: string;
  eventUrl?: string;
  date: Date | string;
  location: string;
  type: string;
  slides?: string;
  video?: string;
  duration?: string;
  topics?: string[];
  /** Plain-text body (EN MDX body or pt-BR overlay body). */
  body?: string | null;
};

function abs(path: string): string {
  const origin = profileOrigin();
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function isoDate(d: Date | string): string {
  const date = d instanceof Date ? d : new Date(d);
  return date.toISOString().slice(0, 10);
}

/** Public path for a case markdown mirror (locale-prefixed). */
export function caseMdPath(locale: AppLocale, slug: string): string {
  return `/${locale}/projects/${slug}.md`;
}

/** Public path for a talk markdown mirror (locale-prefixed). */
export function talkMdPath(locale: AppLocale, slug: string): string {
  return `/${locale}/community/${slug}.md`;
}

export function buildCaseMarkdown(
  slug: string,
  locale: AppLocale,
  data: CaseMirrorData,
): string {
  const htmlUrl = abs(`/${locale}/projects/${slug}`);
  const lines: string[] = [
    `# ${data.title}`,
    "",
    `> ${data.outcomeSummary}`,
    "",
    `- **Author:** ${profile.name}`,
    `- **Role:** ${data.role}`,
    `- **Year:** ${data.year}`,
  ];

  if (data.duration) lines.push(`- **Duration:** ${data.duration}`);
  if (data.status) lines.push(`- **Status:** ${data.status}`);
  lines.push(
    `- **HTML:** ${htmlUrl}`,
    `- **Locale:** ${locale}`,
    "",
    "## Overview",
    "",
    data.overview,
    "",
    "## Problem",
    "",
    data.problem,
    "",
  );

  if (data.constraints.length) {
    lines.push("## Constraints", "");
    for (const c of data.constraints) lines.push(`- ${c}`);
    lines.push("");
  }

  lines.push("## Approach", "", data.approach, "");

  if (data.keyDecisions.length) {
    lines.push("## Key decisions", "");
    for (const kd of data.keyDecisions) {
      lines.push(`### ${kd.decision}`, "", kd.reasoning);
      if (kd.alternatives?.length) {
        lines.push("", "Alternatives considered:");
        for (const a of kd.alternatives) lines.push(`- ${a}`);
      }
      lines.push("");
    }
  }

  if (data.techStack.length) {
    lines.push("## Stack", "");
    for (const t of data.techStack) lines.push(`- ${t}`);
    lines.push("");
  }

  lines.push("## Impact", "");
  if (data.impact.metrics?.length) {
    for (const m of data.impact.metrics) {
      lines.push(`- **${m.label}:** ${m.value}`);
    }
    lines.push("");
  }
  lines.push(data.impact.qualitative, "");

  if (data.learnings.length) {
    lines.push("## Learnings", "");
    for (const l of data.learnings) lines.push(`- ${l}`);
    lines.push("");
  }

  lines.push(
    "---",
    "",
    `Source: content collection \`${slug}\` (EN MDX + locale overlay). Same facts as the HTML case study.`,
    "",
  );

  return lines.join("\n");
}

export function buildTalkMarkdown(
  slug: string,
  locale: AppLocale,
  data: TalkMirrorData,
): string {
  const htmlUrl = abs(`/${locale}/community/${slug}`);
  const lines: string[] = [
    `# ${data.title}`,
    "",
    `> ${data.description}`,
    "",
    `- **Speaker:** ${profile.name}`,
    `- **Event:** ${data.event}`,
    `- **Date:** ${isoDate(data.date)}`,
    `- **Location:** ${data.location}`,
    `- **Type:** ${data.type}`,
  ];

  if (data.duration) lines.push(`- **Duration:** ${data.duration}`);
  if (data.eventUrl) lines.push(`- **Event URL:** ${data.eventUrl}`);
  if (data.slides) lines.push(`- **Slides:** ${data.slides}`);
  if (data.video) lines.push(`- **Video:** ${data.video}`);
  lines.push(
    `- **HTML:** ${htmlUrl}`,
    `- **Locale:** ${locale}`,
    "",
  );

  if (data.topics?.length) {
    lines.push("## Topics", "");
    for (const t of data.topics) lines.push(`- ${t}`);
    lines.push("");
  }

  const body = data.body?.trim();
  if (body) {
    lines.push("## Notes", "", body, "");
  }

  lines.push(
    "---",
    "",
    `Source: speaking collection \`${slug}\` (EN MDX + locale overlay). Same facts as the HTML talk page.`,
    "",
  );

  return lines.join("\n");
}
