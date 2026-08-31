/**
 * Robots.txt API Route
 *
 * Allows all crawlers, exposes the sitemap, and documents agent-readable
 * profile endpoints. Intentionally does not block `/$` — the root is a
 * locale redirect; blocking it left DuckDuckGo with a domain listing and
 * no snippet.
 *
 * Route: /robots.txt
 */

import type { APIRoute } from 'astro';
import { siteConfig } from '../config';

/**
 * GET handler for robots.txt
 * 
 * Generates the robots.txt content dynamically using the site URL from configuration.
 * Normalizes the URL by removing trailing slashes to ensure consistent sitemap URLs.
 * 
 * @returns Response with robots.txt content and text/plain content type
 */
export const GET: APIRoute = () => {
  /**
   * Normalizes the site URL by removing trailing slash
   * 
   * Ensures the sitemap URL is consistently formatted without double slashes.
   */
  const siteUrl = siteConfig.url.endsWith('/') 
    ? siteConfig.url.slice(0, -1) 
    : siteConfig.url;

  // Do not Disallow `/$`: DuckDuckGo (and similar) still list the domain root as
  // the primary result. Blocking it yields "No information is available" while
  // sitelinks under /en/ look fine. Crawlers should hit `/` and follow the
  // redirect to the locale homepage (see src/pages/index.ts).
  const robotsTxt = `User-agent: *
Allow: /

# Agent-readable profile (GEO / B2A)
# llms.txt: ${siteUrl}/llms.txt
# llms-full.txt: ${siteUrl}/llms-full.txt
# resume.json: ${siteUrl}/resume.json
# MCP (Streamable HTTP): ${siteUrl}/api/mcp
# Case markdown mirrors: ${siteUrl}/en/projects/{slug}.md (also /pt-BR/...)
# Talk markdown mirrors: ${siteUrl}/en/community/{slug}.md (also /pt-BR/...)

Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
