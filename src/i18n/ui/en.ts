/**
 * English UI copy (source of truth for keys).
 */

export const en = {
  skipToContent: "Skip to main content",
  navAria: "Main navigation",
  menu: "Menu",
  close: "Close",
  navHome: "Home",
  language: "Language",
  preferences: "Preferences",
  themeLabel: "Theme",
  switchToEn: "English",
  switchToPt: "Português",

  nav: {
    cases: "Cases",
    products: "Products",
    community: "Community",
    contact: "Contact",
  },

  site: {
    title: "Erick Sutil, Senior Frontend Developer",
    description:
      "Senior Frontend Developer at Reclame AQUI. 9 years of experience with React, Next.js, TypeScript, and Astro. Focus on frontend architecture, microfrontends, and web performance.",
    authorTitle: "Senior Frontend Developer",
    authorBio:
      "Senior Frontend Developer with 9 years of experience building web applications across high-traffic, B2B, and broader digital product contexts. Work mainly with React, Next.js, TypeScript, and Astro.",
  },

  pages: {
    projects: {
      title: "Cases",
      description:
        "Architecture decision records from production: problem, constraints, alternatives rejected, and impact.",
      heading: "Cases",
      intro:
        "Production work with the decision trail: what we faced, what we refused, and what shipped.",
      empty: "No cases yet.",
      breadcrumbHome: "Home",
      breadcrumbCases: "Cases",
    },
    community: {
      title: "Community",
      description:
        "Talks, workshops, and mentoring by Erick Sutil: DevParaná, UNIPAR, Inovathon Sudovalley, TechWeek UTFPR, and more.",
      heading: "Community",
      intro:
        "Talks at DevParaná, workshops at UNIPAR, mentoring at hackathons.",
      empty: "No community entries yet.",
      breadcrumbHome: "Home",
      breadcrumbCommunity: "Community",
      itemListName: "Community talks, workshops, and mentoring",
    },
    products: {
      title: "Products",
      description:
        "Try StackBrief and Dieta e Treino: live products with links out to each app.",
      heading: "Products",
      intro:
        "Two live products: StackBrief and Dieta e Treino (free trial, then Pro).",
      featured: "Featured",
      empty: "No products yet.",
      footnoteTitle: "How they were built",
      footnoteBeforeLink: "Architecture, constraints, and trade-offs are in the",
      footnoteLink: "case studies",
      footnoteAfterLink: ". This page links out to each live product.",
      breadcrumbHome: "Home",
      breadcrumbProducts: "Products",
      itemListName: "Products",
    },
    contact: {
      title: "Contact",
      description:
        "Contact Erick Sutil about microfrontends, performance, collaborations, talks, or community work.",
      heading: "Get in touch",
      intro:
        "For collaborations, talks, or conversations about architecture and performance, email is best.",
      resumeElsewhere: "Resume and elsewhere",
      resume: "Resume",
      mailSubject: "Hello from your portfolio",
      breadcrumbHome: "Home",
      breadcrumbContact: "Contact",
      agentsHeading: "For agents and tooling",
      agentsIntro:
        "Machine-readable profile for AI crawlers and MCP clients. Same facts as the site and the resume.",
      agentsLlms: "llms.txt",
      agentsLlmsFull: "llms-full.txt",
      agentsResumeJson: "resume.json",
      agentsMcpPath: "/api/mcp",
      agentsMcpTitle: "Not a browser page. Select and paste into an MCP client.",
      agentsMcpHint:
        "MCP is Streamable HTTP for clients, not a page in the browser. Paste the path above, or run the local stdio server from mcp/.",
    },
  },

  home: {
    roleAt: "Senior Frontend Developer at Reclame AQUI",
    heroTitle: "Frontend architecture for high-traffic web applications",
    heroSub:
      "Nine years building for the web. My work combines frontend development, architectural decisions, and the continuous evolution of digital products.",
    viewCases: "View cases",
    resume: "Resume",
    selectedWork: "Selected work",
    allCases: "All cases",
    products: "Products",
    tryFree: "Try free",
    seeProducts: "See products",
    communityHeading: "Community",
    communityBody:
      "DevParaná talks, UNIPAR workshops, mentoring at Inovathon and TechWeek.",
    communityCta: "Talks, workshops, mentoring",
    blurbs: {
      stackbrief: "Lockfile-aware dependency briefs",
      "dieta-e-treino": "Food and training in Telegram",
    },
  },

  caseStudy: {
    titleSuffix: "Case",
    featured: "Featured",
    allCases: "All cases",
    jumpAria: "Jump to section",
    overview: "Overview",
    decisions: "Decisions",
    impact: "Impact",
    problem: "Problem",
    constraints: "Constraints",
    architecture: "Architecture",
    keyDecisions: "Key Decisions",
    reasoning: "Reasoning",
    alternatives: "Alternatives considered",
    techStack: "Tech stack",
    learnings: "Learnings",
    rejected: "Rejected path",
    statusCompleted: "Completed",
    statusOngoing: "Ongoing",
    statusArchived: "Archived",
    person: "person",
    people: "people",
    sectionCases: "Cases",
  },

  communityDetail: {
    back: "Back to Community",
    sectionCommunity: "Community",
    viewSlides: "View slides",
    watchVideo: "Watch video",
    types: {
      conference: "Conference",
      meetup: "Meetup",
      podcast: "Podcast",
      workshop: "Workshop",
      webinar: "Webinar",
      mentoring: "Mentoring",
      talk: "Talk",
    },
  },

  cards: {
    viewCase: "View case",
    readMore: "Read more",
    readAbout: "Read about {title}",
    comingSoon: "Coming soon",
    tryFree: "Try free",
    openApp: "Open",
    moreTechnologies: "{n} more technologies",
    statusLive: "Live",
    statusBeta: "Beta",
    statusComingSoon: "Coming soon",
    statusArchived: "Archived",
  },

  footer: {
    contact: "Contact",
    resume: "Resume",
    llmsTxt: "llms.txt",
    llmsFull: "llms-full.txt",
    resumeJson: "resume.json",
    mcp: "/api/mcp",
    mcpTitle: "MCP setup on the contact page",
    navLabel: "Footer",
    agentsLabel: "Agent-readable files",
  },

  theme: {
    light: "Light",
    dark: "Dark",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },

  related: {
    heading: "Related",
    caseStudies: "Case Studies",
  },

  reader: {
    backCases: "All cases",
    backTalks: "All talks",
    continueCase: "Scroll for the next case",
    continueTalk: "Scroll for the next talk",
    nextCase: "Next case",
    nextTalk: "Next talk",
    position: "{n} of {total}",
  },

  metrics: {
    verification: "Verification",
    auditDate: "Audit Date",
    ratingGood: "good",
    ratingNeedsImprovement: "needs improvement",
    ratingPoor: "poor",
    scoreOutOf: "{score} out of {total}, {rating}",
  },

  scrollTop: "Scroll to top",
  opensNewTab: "(opens in a new tab)",

  notFound: {
    title: "404 - Page Not Found",
    description:
      "This page was not found. Go home, browse cases, or contact Erick Sutil.",
    heading: "Page not found",
    body: "That URL is not on this site.",
    home: "Home",
    cases: "Cases",
    contact: "Contact",
  },

  localeRoot: {
    title: "Erick Sutil",
    description: "Choose a language to continue.",
    choose: "Choose your language",
    en: "Continue in English",
    pt: "Continuar em português",
  },
};

export type UiMessages = typeof en;
