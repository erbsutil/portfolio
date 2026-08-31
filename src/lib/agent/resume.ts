/**
 * Build JSON Resume (https://jsonresume.org/schema/) from profile + catalog.
 */
import { profile, profileOrigin } from "../../data/profile";
import type { AgentCatalog } from "./types";

export function buildResumeJson(catalog?: AgentCatalog) {
  const origin = profileOrigin();

  const projects = (catalog?.cases ?? []).map((c) => ({
    name: c.title,
    description: c.summary,
    url: c.url.startsWith("http") ? c.url : `${origin}${c.url}`,
    keywords: c.techStack ?? [],
    type: "case study",
    roles: c.role ? [c.role] : undefined,
    startDate: c.year ? String(c.year) : undefined,
  }));

  const products = (catalog?.products ?? []).map((p) => ({
    name: p.title,
    description: p.summary,
    url: p.productUrl || (p.url.startsWith("http") ? p.url : `${origin}${p.url}`),
    keywords: p.techStack ?? [],
    type: "application",
    startDate: p.year ? String(p.year) : undefined,
  }));

  return {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: profile.fullName,
      label: profile.label,
      email: profile.email,
      url: profile.url,
      summary: profile.summary,
      location: {
        city: profile.location.city,
        region: profile.location.region,
        countryCode: profile.location.countryCode,
      },
      profiles: [
        {
          network: "GitHub",
          username: "erbsutil",
          url: profile.links.github,
        },
        {
          network: "LinkedIn",
          username: "erbsutil",
          url: profile.links.linkedin,
        },
      ],
    },
    work: profile.experience.map((role) => ({
      name: role.company,
      position: role.position,
      url: role.company === "Reclame AQUI" ? profile.worksFor.url : undefined,
      startDate: role.startDate,
      endDate: role.endDate ?? undefined,
      location: role.location,
      highlights: role.highlights.map((h) => h.text),
    })),
    education: profile.education.map((ed) => ({
      institution: ed.institution,
      area: ed.area,
      studyType: ed.studyType,
      startDate: ed.startDate,
      endDate: ed.endDate ?? undefined,
    })),
    skills: profile.skills.map((s) => ({
      name: s.name,
      keywords: [...s.keywords],
    })),
    languages: profile.languages.map((l) => ({
      language: l.language,
      fluency: l.fluency,
    })),
    certificates: profile.certificates.map((name) => ({ name })),
    awards: profile.awards.map((a) => ({
      title: a.title,
      summary: a.summary,
    })),
    projects: [...projects, ...products],
    meta: {
      canonical: profile.links.resumeJson,
      version: "1.0.0",
      lastModified: new Date().toISOString().slice(0, 10),
    },
  };
}

export function buildResumeMarkdown(catalog?: AgentCatalog): string {
  const lines: string[] = [
    `# ${profile.fullName}`,
    `**${profile.label}** · ${profile.location.region}`,
    "",
    profile.summary,
    "",
    `Contact: ${profile.contactNote}`,
    "",
    "## Contact",
    `- Email: ${profile.email}`,
    `- Portfolio: ${profile.url}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    "",
    "## Skills",
  ];

  for (const skill of profile.skills) {
    lines.push(`- **${skill.name}:** ${skill.keywords.join(", ")}`);
  }

  lines.push("", "## Experience");
  for (const role of profile.experience) {
    const end = role.endDate ?? "Present";
    lines.push(`### ${role.position} · ${role.company}`);
    lines.push(`${role.startDate} to ${end} · ${role.location}`);
    for (const h of role.highlights) {
      lines.push(`- ${h.text}`);
    }
    lines.push("");
  }

  lines.push("## Education");
  for (const ed of profile.education) {
    lines.push(
      `- **${ed.studyType}, ${ed.area}** · ${ed.institution} (${ed.startDate} to ${ed.endDate ?? "Present"})`,
    );
  }

  if (profile.awards.length > 0) {
    lines.push("", "## Awards");
    for (const a of profile.awards) {
      lines.push(`- **${a.title}:** ${a.summary}`);
    }
  }

  if (catalog) {
    lines.push("", "## Selected cases");
    for (const c of catalog.cases) {
      lines.push(`- [${c.title}](${c.url}): ${c.summary}`);
    }
    lines.push("", "## Products");
    for (const p of catalog.products) {
      lines.push(`- [${p.title}](${p.url}): ${p.summary}`);
    }
    lines.push("", "## Community");
    for (const t of catalog.talks) {
      lines.push(`- [${t.title}](${t.url}): ${t.summary}`);
    }
  }

  return lines.join("\n");
}
