/**
 * Sync human resume artifacts from src/data/profile.ts.
 * Writes resume/Erick_Sutil_Resume.md and public/Erick_Sutil_Resume.pdf.
 *
 * Usage: npm run resume:sync
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function loadProfile() {
  const mod = await import(
    pathToFileURL(path.join(root, "src/data/profile.ts")).href
  );
  return mod.profile;
}

function buildMarkdown(profile) {
  const lines = [
    `# ${profile.fullName}`,
    `**Location:** ${profile.location.city}, ${profile.location.region} | **Email:** ${profile.email}`,
    `**LinkedIn:** [${profile.links.linkedin.replace(/^https?:\/\//, "")}](${profile.links.linkedin}) | **GitHub:** [${profile.links.github.replace(/^https?:\/\//, "")}](${profile.links.github}) | **Portfolio:** [${profile.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}](${profile.url})`,
    "",
    "---",
    "",
    "## PROFESSIONAL SUMMARY",
    profile.summary,
    "",
    "## SKILLS",
  ];

  for (const skill of profile.skills) {
    lines.push(`* **${skill.name}:** ${skill.keywords.join(", ")}`);
  }

  lines.push("", "## EXPERIENCE", "");

  for (const role of profile.experience) {
    const end = role.endDate ?? "Present";
    const startLabel = role.startDate.length === 7
      ? formatMonthYear(role.startDate)
      : role.startDate;
    const endLabel =
      end === "Present"
        ? "Present"
        : end.length === 7
          ? formatMonthYear(end)
          : end;
    const companyLabel =
      role.company === "Independent" ? role.company : `${role.company}, ${role.location}`;
    lines.push(
      `**${role.position}** | *${companyLabel}* | **${startLabel} - ${endLabel}**`,
    );
    for (const h of role.highlights) {
      lines.push(`* ${h.text}`);
    }
    lines.push("");
  }

  lines.push("## EDUCATION", "");
  for (const ed of profile.education) {
    const startLabel =
      ed.startDate.length === 7 ? formatMonthYear(ed.startDate) : ed.startDate;
    const end = ed.endDate ?? "Present";
    const endLabel =
      end === "Present" ? "Present" : end.length === 7 ? formatMonthYear(end) : end;
    lines.push(
      `**${ed.studyType}, ${ed.area}** | *${ed.institution}* | **${startLabel} - ${endLabel}**`,
    );
  }

  const awardLine = profile.awards?.length
    ? `* **Awards:** ${profile.awards.map((a) => `${a.title} (${a.summary})`).join("; ")}.`
    : null;

  lines.push(
    "",
    "## CERTIFICATIONS, AWARDS & EXTRAS",
    "",
    `* **Certifications:** ${profile.certificates.join(", ")}.`,
    "* **Community & Talks:** Speaker and mentor (DevParaná, UNIPAR, TechWeek, Inovathon Sudovalley) on Astro, performance, and shipping with AI tools.",
    ...(awardLine ? [awardLine] : []),
    `* **Languages:** ${profile.languages.map((l) => `${l.language} (${l.fluency})`).join(", ")}.`,
    "",
  );

  return lines.join("\n");
}

function formatMonthYear(ym) {
  const [y, m] = ym.split("-").map(Number);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[(m || 1) - 1]} ${y}`;
}

/** Tiny markdown → HTML for the resume CSS (headings, bold, lists, hr, paragraphs). */
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      i += 1;
      continue;
    }
    if (trimmed === "---") {
      out.push("<hr />");
      i += 1;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      out.push(`<h1>${inline(trimmed.slice(2))}</h1>`);
      i += 1;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      out.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
      i += 1;
      continue;
    }
    if (trimmed.startsWith("* ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("* ")) {
        items.push(`<li>${inline(lines[i].trim().replace(/^\*\s+/, ""))}</li>`);
        i += 1;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("# ") &&
      !lines[i].trim().startsWith("## ") &&
      !lines[i].trim().startsWith("* ") &&
      lines[i].trim() !== "---"
    ) {
      para.push(lines[i].trim());
      i += 1;
    }
    out.push(`<p>${para.map(inline).join("<br />")}</p>`);
  }

  return out.join("\n");
}

function inline(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

async function main() {
  const profile = await loadProfile();
  const md = buildMarkdown(profile);
  const resumeDir = path.join(root, "resume");
  const mdPath = path.join(resumeDir, "Erick_Sutil_Resume.md");
  const cssPath = path.join(resumeDir, "resume.css");
  const pdfPath = path.join(root, "public", "Erick_Sutil_Resume.pdf");

  await mkdir(resumeDir, { recursive: true });
  await writeFile(mdPath, md, "utf8");

  const css = await readFile(cssPath, "utf8");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${profile.fullName} | Resume</title>
<style>${css}</style>
</head>
<body>
${mdToHtml(md)}
</body>
</html>`;

  const htmlPath = path.join(resumeDir, "Erick_Sutil_Resume.html");
  await writeFile(htmlPath, html, "utf8");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", bottom: "14mm", left: "14mm", right: "14mm" },
  });
  await browser.close();

  console.log(`Wrote ${path.relative(root, mdPath)}`);
  console.log(`Wrote ${path.relative(root, pdfPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
