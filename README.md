# erbsutil/portfolio

Personal portfolio for Erick Sutil. Astro, content-driven, paper-first editorial UI, near-zero client JS by default.

Live: [www.erbsu.com](https://www.erbsu.com)

## Stack

| Tool | Why |
|---|---|
| [Astro](https://astro.build) 5 + `@astrojs/vercel` | Static HTML by default; SSR only where needed (locale `/`, MCP). |
| TypeScript + Zod | Strict mode; content schemas in `content.config.ts`. |
| MDX collections | Cases, talks, and products as typed files (EN source + pt-BR overlays). |
| Vanilla CSS + IBM Plex | Paper-first tokens; no Tailwind. Serif display / sans / mono. |
| Playwright | E2E on critical flows and accessibility. |
| `@astrojs/sitemap` + JSON-LD | Sitemap i18n, Person/WebSite/CreativeWork/Event schemas. |
| Sharp | Build-time image optimization. |
| Vercel Analytics + deferred GA | Measure traffic without blocking LCP. |
| MCP (`mcp-handler` + SDK) | Agent-readable profile for agents and IDE tooling (`/api/mcp`). |

## Project conventions (frontend)

- **JS is a cost.** Ship zero client JS on content pages unless an interaction earns an island.
- **EN MDX is source of truth;** Portuguese lives in `src/i18n/content/pt-BR/` overlays.
- **Real screenshots only** for case covers; no stock art or fake initials.
- **Editorial layout:** year folios, 2-column grids, hairlines; not card dashboards.
- **AppCards on Products are protected;** do not redesign without intent.
- **Workplace-safe copy:** collaborations, talks, and architecture conversations.
- **Measure honestly:** keep analytics and Cloudflare Bot Fight; document Lighthouse trade-offs instead of stripping them for vanity scores.

## Project structure

```
src/
  assets/images/         # Speaking photos + product screens
  components/            # Astro UI (CaseLead, TalkCard, AppCard, SEO, …)
  content/
    projects/            # Case studies (EN MDX)
    speaking/            # Community talks
    apps/                # Products shelf
  data/profile.ts        # Canonical agent-readable profile
  i18n/                  # Locales, UI strings, PT overlays
  lib/agent/             # llms.txt, resume.json, MCP tools/guard
  pages/
    [locale]/            # Localized routes
    api/[transport].ts   # Remote MCP (Streamable HTTP)
    llms.txt.ts          # Agent manifesto
    resume.json.ts       # JSON Resume
mcp/                     # Local stdio MCP server
resume/                  # Human PDF source (sync via npm run resume:sync)
```

## Architecture notes

### Astro over Next.js
A case-study site does not need a React runtime on every page. Documented in `/en/projects/portfolio`.

### Content collections over a CMS
Zod-validated MDX: versionable, diffable, no runtime CMS.

### Agent-readable layer (GEO + MCP)

| URL | Purpose |
|-----|---------|
| `/llms.txt` | Short map for agents |
| `/llms-full.txt` | Full bio, skills, experience, work index |
| `/en/projects/{slug}.md` | Clean case markdown (also `/pt-BR/...`) |
| `/en/community/{slug}.md` | Clean talk markdown (also `/pt-BR/...`) |
| `/resume.json` | [JSON Resume](https://jsonresume.org/) |
| `/api/mcp` | Remote MCP (rate-limited; optional `MCP_API_KEY`) |

Profile source: `src/data/profile.ts`. Local MCP: [`mcp/README.md`](mcp/README.md).

```bash
npm run resume:sync   # regenerate resume MD + public PDF from profile
npm run mcp           # stdio MCP
```

## Accessibility

- Skip link → `#main-content`
- `aria-current="page"` on nav; ThemeToggle `aria-pressed`
- WCAG AA contrast on paper/dark tokens
- Playwright a11y coverage on critical paths

## SEO

- Per-page title, description, canonical, hreflang
- Open Graph + Twitter cards
- JSON-LD (Person, WebSite, ItemList, CreativeWork, Event, …)
- Sitemap with locale alternates; root `/` redirects crawlers to `/en/`

## Lighthouse (live www)

Audited **2026-08-09** with Lighthouse **12.8.2** on `https://www.erbsu.com/en/` (Cloudflare in front, deferred analytics on):

| Form factor | Perf | A11y | Best Practices | SEO |
|-------------|------|------|----------------|-----|
| Desktop | 99 | 98 | 100 | 100 |
| Mobile | 89 | 98 | 100 | 100 |

Vercel origin (no Bot Fight challenge injection) historically scores higher on Perf; www accepts edge protection. Details in the portfolio case study.

## Environment

```bash
cp .env.example .env
```

| Variable | Notes |
|----------|--------|
| `SITE_URL` | Canonical origin |
| `SITE_AUTHOR_*` / `SOCIAL_*` | Identity + sameAs |
| `MCP_API_KEY` | Optional bearer for `/api/mcp` |
| `MCP_RATE_LIMIT` / `MCP_RATE_WINDOW_MS` | MCP throttle (default 60/min) |

## Scripts

```bash
npm install
npm run dev       # localhost:4321
npm run build     # check + build + CSP patch
npm run preview
npm run test:e2e
npm run resume:sync
npm run mcp
```

## AI-assisted development

Agents helped with schema, components, tokens, and copy passes. Humans own architecture, voice, and what ships. Workflow is documented in `/en/projects/portfolio`.

## Credits

Built on [Case](https://github.com/erlandv/case) by [Erland](https://github.com/erlandv); customized for this stack and editorial system.
