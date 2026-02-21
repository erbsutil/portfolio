# erbsutil/portfolio

Personal portfolio for Erick Sutil — built with Astro, content-driven, and designed for maximum performance and maintenance.

## Stack

| Tool | Why |
|---|---|
| [Astro](https://astro.build) | Ships zero JS by default. Static pages are pure HTML; only interactive components are hydrated. |
| React | Used selectively via Islands Architecture. The `HeroCarousel` on the homepage is a prime example — one hydrated React island, the rest of the page remains static HTML. |
| Playwright | End-to-end testing library. Ensures critical user flows, layout stability, and accessibility remain intact without the overhead of fragile DOM unit tests. |
| TypeScript | Strict mode. All content schemas are typed via Zod in `content.config.ts`. |
| MDX | Content collections for projects and speaking engagements — each is a `.mdx` file with typed frontmatter. |
| `@astrojs/sitemap` | Auto-generated sitemap for all routes. |

## Project Structure

```
src/
  assets/
    images/              # Base images for Astro optimization (e.g. speaking photos)
  components/
    HeroCarousel.tsx     # React island — featured projects + speaking on homepage
    TalkCard.astro       # Speaking card (image support, accessible markup)
    ProjectCard.astro    # Project case study card
    Navigation.astro     # Nav with aria-current, aria-label="Main navigation"
    ThemeToggle.astro    # Dark/light toggle with dynamic aria-label + aria-pressed
    SEO.astro            # OG, Twitter card, canonical, meta description
    StructuredData.astro # JSON-LD schemas (Person, WebSite, CreativeWork)
  content/
    projects/            # MDX case studies (typed frontmatter schema)
    speaking/            # MDX speaking engagements (typed frontmatter schema)
  layouts/
    BaseLayout.astro     # HTML shell — skip nav link, theme persistence, ARIA landmarks
  pages/
    projects/            # /projects — static Astro listing
    speaking.astro       # /speaking — static Astro listing
  styles/
    global.css           # CSS custom properties — WCAG AA contrast tokens, theme vars
```

## Key Architectural Decisions

### Astro over Next.js
For a portfolio that's primarily static content, Astro is the right fit. Next.js ships a full React runtime to every page; Astro ships zero JS to pages that don't need it. Performance was a first-class requirement — the choice is documented in the `/projects/portfolio` case study.

### Islands Architecture in practice
The homepage demonstrates selective hydration explicitly: `<HeroCarousel client:load />` is the only hydrated island. The page shell — layout, nav, heading, footer — is static HTML. Open DevTools and you'll see React loaded only for the component that needs it. This is the same concept covered in the "Astro and Web Performance" talk at DevParaná.

### Content Collections over a CMS
Projects and speaking entries are MDX files with Zod-validated schemas. No API calls, no external dependencies — just files. Easy to version, diff, and edit. The schema is defined in `src/content.config.ts`.

### CSS Custom Properties for theming
Dark/light mode is implemented entirely through CSS custom properties on `[data-theme]`. An inline script in `BaseLayout` reads `localStorage` before first paint, preventing any flash of wrong theme. No JS framework required for theming.

## Accessibility

- Skip navigation link (first focusable element, visually hidden until focused)
- `aria-label="Main navigation"` on `<nav>`
- `aria-current="page"` on active nav link (updated on View Transitions)
- ThemeToggle: dynamic `aria-label` ("Switch to light mode" / "Switch to dark mode") + `aria-pressed`
- `id="main-content"` on `<main>` as skip link target
- WCAG AA contrast on all text color tokens (verified against CSS custom property values)

## SEO

- Unique `<title>` + `<meta description>` per page via `SEO.astro`
- Open Graph + Twitter Card tags
- JSON-LD structured data: `Person` + `WebSite` schemas on homepage
- Auto-generated `sitemap-index.xml` via `@astrojs/sitemap`
- Canonical URLs

## Environment Variables

```bash
cp .env.example .env
```

Key variables:

```
SITE_URL=https://yourdomain.com
SITE_AUTHOR_NAME=Your Name
SITE_AUTHOR_TITLE=Your Title
SOCIAL_GITHUB=https://github.com/yourhandle
SOCIAL_LINKEDIN=https://linkedin.com/in/yourhandle
```

## Running Locally

```bash
npm install
npm run dev      # localhost:4321
npm run build    # production build
npm run preview  # preview production build
```

## AI-Assisted Development

This project was built with advanced AI coding agents. The agents handled: schema design, component implementation, CSS tokens, content rewrites, and iteration cycles. Human judgment drove: architectural decisions, content accuracy and voice, what to include vs. cut, and final review of every change. The workflow and its impact on solo dev velocity are documented in the `/projects/portfolio` case study.

## Credits

This portfolio was built using [Case](https://github.com/erlandv/case), an open-source portfolio theme created by [Erland](https://github.com/erlandv). I have customized and extended the theme to suit my professional needs and technical focus.

