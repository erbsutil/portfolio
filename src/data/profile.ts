/**
 * Canonical agent-readable profile (EN).
 * Feeds Person JSON-LD, resume.json, llms.txt, and the MCP server.
 */

export type SkillCategory = {
  name: string;
  keywords: string[];
};

export type ExperienceBullet = {
  text: string;
  tags: string[];
};

export type ExperienceRole = {
  company: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string | null;
  location: string;
  summary?: string;
  highlights: ExperienceBullet[];
};

export type EducationEntry = {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string | null;
};

export const profile = {
  name: "Erick Sutil",
  fullName: "Erick Bruno Sutil",
  label: "Senior Frontend Engineer",
  email: "ericksutil@gmail.com",
  url: "https://www.erbsu.com",
  location: {
    city: "Paraná",
    countryCode: "BR",
    region: "Brazil",
  },
  summary:
    "Senior Frontend Developer with 9 years of experience building web applications across high-traffic, B2B, and broader digital product contexts. I work mainly with React, Next.js, TypeScript, and Astro, with a focus on frontend architecture, microfrontends, and web performance.",
  /** Topics welcome by email (employed; not job-seeking). */
  contactNote:
    "Conversations about frontend architecture, web performance, and digital products.",
  /** Real public profiles only (GitHub + LinkedIn). Do not invent Bluesky/Mastodon/etc. */
  sameAs: [
    "https://github.com/erbsutil",
    "https://linkedin.com/in/erbsutil",
  ],
  links: {
    portfolio: "https://www.erbsu.com",
    portfolioEn: "https://www.erbsu.com/en/",
    resumePdf: "https://www.erbsu.com/Erick_Sutil_Resume.pdf",
    resumeJson: "https://www.erbsu.com/resume.json",
    llmsTxt: "https://www.erbsu.com/llms.txt",
    llmsFull: "https://www.erbsu.com/llms-full.txt",
    mcp: "https://www.erbsu.com/api/mcp",
    github: "https://github.com/erbsutil",
    linkedin: "https://linkedin.com/in/erbsutil",
  },
  worksFor: {
    name: "Reclame AQUI",
    url: "https://www.reclameaqui.com.br",
  },
  skills: [
    {
      name: "Languages & Core",
      keywords: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      name: "Frontend",
      keywords: [
        "React.js",
        "Next.js (App Router, Server Components)",
        "Astro",
        "Web Components",
        "CDN delivery",
      ],
    },
    {
      name: "Full-stack & AI",
      keywords: [
        "Google Gemini",
        "Windmill",
        "Supabase (PostgreSQL, pgvector)",
        "Telegram / Meta WhatsApp APIs",
        "Stripe",
      ],
    },
    {
      name: "Quality",
      keywords: [
        "React Testing Library",
        "Jest",
        "Playwright (E2E)",
        "Storybook",
      ],
    },
  ] satisfies SkillCategory[],
  /** Flat list for schema.org knowsAbout */
  knowsAbout: [
    "Frontend architecture",
    "Microfrontends",
    "Web performance",
    "Astro",
    "React",
    "Next.js",
    "TypeScript",
    "Delivery pipelines",
    "AI-assisted workflows",
  ],
  experience: [
    {
      company: "Reclame AQUI",
      position: "Senior Frontend Developer",
      startDate: "2026-04",
      endDate: null,
      location: "Brazil",
      highlights: [
        {
          text: "Contribute to frontend architecture decisions across high-traffic surfaces and user-facing flows.",
          tags: ["architecture", "performance"],
        },
        {
          text: "Help teams implement React patterns, TypeScript standards, and frontend performance improvements.",
          tags: ["mentoring", "react", "performance"],
        },
      ],
    },
    {
      company: "Reclame AQUI",
      position: "Frontend Developer (Mid-level / Pleno)",
      startDate: "2023-02",
      endDate: "2026-04",
      location: "Brazil",
      highlights: [
        {
          text: "Developed and maintained microfrontends distributed through a CDN, allowing parts of the application to be deployed independently.",
          tags: ["microfrontends", "cdn", "react"],
        },
        {
          text: "Contributed to the architecture of a multi-tenant identity system built with Astro and React.",
          tags: ["astro", "react", "identity", "b2b"],
        },
        {
          text: "Developed a B2B registration microfrontend integrated with A/B testing.",
          tags: ["microfrontends", "ab-testing", "b2b"],
        },
        {
          text: "Implemented CI/CD pipelines and contributed to frontend performance improvements.",
          tags: ["cicd", "performance"],
        },
        {
          text: "Contributed to architectural decisions for a high-traffic platform.",
          tags: ["architecture", "performance", "scale"],
        },
      ],
    },
    {
      company: "Independent",
      position: "Freelance Product & Full-stack Engineer",
      startDate: "2025-01",
      endDate: null,
      location: "Brazil",
      highlights: [
        {
          text: "StackBrief (2026): shipped a micro-SaaS that matches dependency releases to lockfile versions and sends a short daily brief (web + Telegram). Next.js, Windmill, Supabase, Stripe (BRL/USD), PT-BR/EN/ES. Live at stackbrief.erbsu.com.",
          tags: ["ai", "saas", "nextjs", "stripe"],
        },
        {
          text: "Dieta e Treino (2026): self-hosted Telegram bot (Bun/Windmill) with Gemini agents Ana/Renan for meal and workout logging, Next.js landing + dashboard from a bot link (Supabase RLS, Groups opt-in, Stripe trial path). Live at dietaetreino.erbsu.com.",
          tags: ["ai", "telegram", "gemini"],
        },
        {
          text: "Portfolio (erbsu.com): Astro case-study site, near-zero JS by default, deferred analytics, Playwright coverage.",
          tags: ["astro", "performance", "a11y"],
        },
      ],
    },
    {
      company: "Reclame AQUI",
      position: "Frontend Developer (Junior)",
      startDate: "2021-04",
      endDate: "2023-02",
      location: "Brazil",
      highlights: [
        {
          text: "Developed standardized React components for the platform.",
          tags: ["react"],
        },
        {
          text: "Implemented state management with Context API and Recoil.",
          tags: ["react", "state"],
        },
        {
          text: "Maintained and evolved the frontend codebase.",
          tags: ["react"],
        },
      ],
    },
    {
      company: "Reclame AQUI",
      position: "Technical Account Consultant",
      startDate: "2017-04",
      endDate: "2021-03",
      location: "Brazil",
      highlights: [
        {
          text: "Joined Trustvox in April 2017. After Reclame AQUI acquired Trustvox in 2019, continued working on the product as part of Reclame AQUI.",
          tags: ["trustvox", "history"],
        },
        {
          text: "Supported technical API integrations for enterprise clients.",
          tags: ["api", "integrations"],
        },
        {
          text: "Created API documentation using Postman.",
          tags: ["api", "docs"],
        },
        {
          text: "Optimized product SEO with rich snippets for e-commerce.",
          tags: ["seo", "schema"],
        },
      ],
    },
  ] satisfies ExperienceRole[],
  education: [
    {
      institution: "Descomplica Faculdade Digital",
      area: "Data Science",
      studyType: "Postgraduate Degree",
      startDate: "2026-01",
      endDate: "2027-01",
    },
    {
      institution: "Descomplica Faculdade Digital",
      area: "Software Engineering",
      studyType: "Postgraduate Degree",
      startDate: "2024-03",
      endDate: "2025-05",
    },
    {
      institution: "UNISEP - União de Ensino do Sudoeste do Paraná",
      area: "Information Systems",
      studyType: "Bachelor's Degree",
      startDate: "2013",
      endDate: "2016",
    },
  ] satisfies EducationEntry[],
  languages: [
    { language: "Portuguese", fluency: "Native" },
    { language: "English", fluency: "Professional working proficiency" },
  ],
  certificates: [
    "SEO para Devs",
    "ReactJS Accessibility",
    "Next.js App Router & Testing",
    "DevOps Culture Fundamentals",
  ],
  awards: [
    {
      title: "1st Place Hackathon Winner",
      summary: "Retail Solutions - Southwest Paraná",
    },
  ],
} as const;

export type Profile = typeof profile;

/** Absolute site origin without trailing slash (profile URL preferred). */
export function profileOrigin(): string {
  return profile.url.replace(/\/$/, "");
}
