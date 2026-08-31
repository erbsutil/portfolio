/**
 * llms.txt / llms-full.txt builders (Jeremy Howard convention).
 */
import { profile, profileOrigin } from "../../data/profile";
import type { AgentCatalog, CatalogWork } from "./types";

function abs(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const origin = profileOrigin();
  return `${origin}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function mdLinks(item: CatalogWork): string {
  if (!item.mdUrl) return "";
  const pt = item.mdUrlPt ? `; [pt-BR](${abs(item.mdUrlPt)})` : "";
  return ` Markdown: [EN](${abs(item.mdUrl)})${pt}.`;
}

export function buildLlmsTxt(catalog?: AgentCatalog): string {
  const cases = catalog?.cases?.slice(0, 6) ?? [];
  const products = catalog?.products ?? [];
  const talks = catalog?.talks?.slice(0, 4) ?? [];
  const allCases = catalog?.cases ?? [];
  const allTalks = catalog?.talks ?? [];

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    `Contact: ${profile.contactNote}`,
    "",
    "## Docs",
    "",
    `- [Home (EN)](${profile.links.portfolioEn}): Portfolio homepage with selected cases, products, and community.`,
    `- [Cases](${abs("/en/projects")}): Architecture and performance case studies.`,
    `- [Products](${abs("/en/products")}): Shipped products (StackBrief, Dieta e Treino).`,
    `- [Community](${abs("/en/community")}): Talks, workshops, mentoring.`,
    `- [Contact](${abs("/en/contact")}): Email and links.`,
    `- [Resume (JSON)](${profile.links.resumeJson}): Machine-readable JSON Resume.`,
    `- [Resume (PDF)](${profile.links.resumePdf}): Human-readable PDF resume.`,
    `- [Full profile for agents](${profile.links.llmsFull}): Expanded bio, skills, experience, and work index.`,
    `- [MCP endpoint](${profile.links.mcp}): Model Context Protocol server (Streamable HTTP) for agents and tooling.`,
    "",
    "## Markdown mirrors",
    "",
    "Prefer these clean `.md` files over HTML when citing a specific case or talk (same facts as the site; EN + pt-BR).",
    "",
  ];

  if (allCases.length || allTalks.length) {
    for (const c of allCases) {
      if (!c.mdUrl) continue;
      lines.push(
        `- [${c.title}](${abs(c.mdUrl)}) (EN)${c.mdUrlPt ? ` · [pt-BR](${abs(c.mdUrlPt)})` : ""}: ${c.summary}`,
      );
    }
    for (const t of allTalks) {
      if (!t.mdUrl) continue;
      lines.push(
        `- [${t.title}](${abs(t.mdUrl)}) (EN)${t.mdUrlPt ? ` · [pt-BR](${abs(t.mdUrlPt)})` : ""}: ${t.summary}`,
      );
    }
    lines.push("");
  } else {
    lines.push(
      "- Case and talk mirrors live at `/en/projects/{slug}.md` and `/en/community/{slug}.md` (pt-BR under `/pt-BR/...`).",
      "",
    );
  }

  if (cases.length || products.length || talks.length) {
    lines.push("## Optional", "");
    for (const c of cases) {
      lines.push(`- [${c.title}](${abs(c.url)}): ${c.summary}${mdLinks(c)}`);
    }
    for (const p of products) {
      lines.push(`- [${p.title}](${abs(p.url)}): ${p.summary}`);
    }
    for (const t of talks) {
      lines.push(`- [${t.title}](${abs(t.url)}): ${t.summary}${mdLinks(t)}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function buildLlmsFullTxt(catalog?: AgentCatalog): string {
  const lines = [
    `# ${profile.fullName}: full agent profile`,
    "",
    `> ${profile.summary}`,
    "",
    `Label: ${profile.label}`,
    `Location: ${profile.location.region}`,
    `Email: ${profile.email}`,
    `Site: ${profile.url}`,
    `Contact: ${profile.contactNote}`,
    "",
    "## Skills",
    "",
  ];

  for (const skill of profile.skills) {
    lines.push(`- **${skill.name}:** ${skill.keywords.join(", ")}`);
  }

  lines.push("", "## Experience", "");
  for (const role of profile.experience) {
    const end = role.endDate ?? "Present";
    lines.push(`### ${role.position} @ ${role.company} (${role.startDate} to ${end})`);
    for (const h of role.highlights) {
      lines.push(`- ${h.text}`);
    }
    lines.push("");
  }

  lines.push("## Education", "");
  for (const ed of profile.education) {
    lines.push(
      `- ${ed.studyType}, ${ed.area}, ${ed.institution} (${ed.startDate} to ${ed.endDate ?? "Present"})`,
    );
  }

  lines.push("", "## Languages", "");
  for (const lang of profile.languages) {
    lines.push(`- ${lang.language}: ${lang.fluency}`);
  }

  if (catalog) {
    lines.push("", "## Cases", "");
    for (const c of catalog.cases) {
      const stack = c.techStack?.length ? ` Stack: ${c.techStack.join(", ")}.` : "";
      lines.push(`- [${c.title}](${abs(c.url)}): ${c.summary}.${stack}${mdLinks(c)}`);
    }
    lines.push("", "## Products", "");
    for (const p of catalog.products) {
      const stack = p.techStack?.length ? ` Stack: ${p.techStack.join(", ")}.` : "";
      lines.push(`- [${p.title}](${abs(p.url)}): ${p.summary}.${stack}`);
    }
    lines.push("", "## Community / talks", "");
    for (const t of catalog.talks) {
      lines.push(
        `- [${t.title}](${abs(t.url)}): ${t.summary}${t.event ? ` (${t.event})` : ""}${mdLinks(t)}`,
      );
    }
  }

  lines.push(
    "",
    "## Machine endpoints",
    "",
    `- llms.txt: ${profile.links.llmsTxt}`,
    `- resume.json: ${profile.links.resumeJson}`,
    `- MCP: ${profile.links.mcp}`,
    `- Case markdown: ${abs("/en/projects/{slug}.md")} (and /pt-BR/...)`,
    `- Talk markdown: ${abs("/en/community/{slug}.md")} (and /pt-BR/...)`,
    "",
  );

  return lines.join("\n");
}
