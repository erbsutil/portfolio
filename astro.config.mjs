/**
 * Astro Configuration
 * 
 * Main configuration file for the Astro site. Defines build settings, integrations,
 * environment variables schema, image optimization, and markdown processing.
 * 
 * Configuration Sections:
 * - Output mode: Static site generation (SSG)
 * - Integrations: MDX for rich content, Sitemap for SEO
 * - Environment variables: Type-safe schema with defaults
 * - Image optimization: Sharp-based processing with responsive sizes
 * - Markdown: Syntax highlighting with Shiki
 * 
 * Setup:
 * 1. Copy .env.example to .env
 * 2. Set SITE_URL and other environment variables
 * 3. Run `npm run dev` for development or `npm run build` for production
 * 
 * @see https://astro.build/config
 */

import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Load environment variables from .env file
 * 
 * Uses Vite's loadEnv to read environment variables at build time.
 * Falls back to 'production' if NODE_ENV is not set.
 */
const { SITE_URL } = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

import vercel from '@astrojs/vercel';

/**
 * Astro configuration object
 * 
 * Defines all build-time settings, integrations, and optimizations for the site.
 * 
 * @see https://astro.build/config
 */
export default defineConfig({
  /**
   * Output mode: Static Site Generation (SSG)
   * 
   * Generates static HTML files at build time for optimal performance
   * and hosting flexibility. All pages are pre-rendered.
   */
  output: 'static',

  adapter: vercel({
    // Emit CSP on prerendered pages as response headers (not only meta).
    experimentalStaticHeaders: true,
  }),

  /**
   * Baseline CSP at build time. scripts/patch-csp.mjs rewrites the emitted
   * headers so production can run deferred gtag, Vercel Analytics, and
   * Cloudflare challenge / insights beacons (hashes would ignore unsafe-inline).
   */
  experimental: {
    csp: {
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
      scriptDirective: {
        resources: [
          "'self'",
          "https://static.cloudflareinsights.com",
          "https://challenges.cloudflare.com",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://va.vercel-scripts.com",
          "https://bzrcdn.openai.com",
        ],
        // Theme boot hash; patch-csp drops hashes so CF challenge + deferred GA work.
        hashes: ["sha256-EUGDV5wrcSR7dSV7QZj/gG+Gy6OugsTVnUZXZVHoXm0="],
      },
    },
  },

  /**
   * Astro integrations
   * 
   * - MDX: Enables MDX support for rich content authoring with JSX components
   * - Sitemap: Automatically generates sitemap.xml for search engines
   */
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'pt-BR': 'pt-BR',
        },
      },
      filter: (page) => {
        try {
          const pathname = new URL(page).pathname;
          // Drop locale chooser and legacy unprefixed redirect stubs
          if (pathname === '/' || pathname === '') return false;
          if (
            pathname.startsWith('/projects') ||
            pathname.startsWith('/community') ||
            pathname.startsWith('/products') ||
            pathname.startsWith('/contact') ||
            pathname.startsWith('/lab') ||
            pathname.startsWith('/speaking')
          ) {
            return false;
          }
          return pathname.startsWith('/en') || pathname.startsWith('/pt-BR');
        } catch {
          return true;
        }
      },
    }),
  ],

  /**
   * Site URL
   */
  site: SITE_URL || 'https://www.erbsu.com',

  redirects: {
    // Locale negotiation for `/` lives in pages/index.astro (SSR).
    '/lab': '/en/products/',
    '/speaking': '/en/community/',
    '/projects': '/en/projects/',
    '/products': '/en/products/',
    '/community': '/en/community/',
    '/contact': '/en/contact/',
  },

  /**
   * Environment variables schema (Astro v5+)
   * 
   * Defines type-safe environment variables with validation and defaults.
   * All variables are client-side accessible and public.
   * 
   * Categories:
   * - Site: URL, language, title, description
   * - Author: Name, title, bio, email, location
   * - Social: GitHub, LinkedIn, Twitter, Mastodon, Bluesky
   */
  env: {
    schema: {
      // Site configuration
      SITE_URL: envField.string({ context: 'client', access: 'public', default: 'https://www.erbsu.com' }),
      SITE_LANGUAGE: envField.string({ context: 'client', access: 'public', default: 'en' }),
      SITE_TITLE: envField.string({ context: 'client', access: 'public', default: 'Erick Sutil, Senior Frontend Engineer' }),
      SITE_DESCRIPTION: envField.string({ context: 'client', access: 'public', default: 'Senior Frontend Engineer at Reclame AQUI. Case studies on architecture and performance, products like StackBrief, and talks on Astro.' }),

      // Author information
      SITE_AUTHOR_NAME: envField.string({ context: 'client', access: 'public', default: 'Erick Sutil' }),
      SITE_AUTHOR_TITLE: envField.string({ context: 'client', access: 'public', default: 'Senior Frontend Engineer' }),
      SITE_AUTHOR_BIO: envField.string({ context: 'client', access: 'public', default: 'Senior Frontend Engineer at Reclame AQUI. Nine years on production frontends: microfrontends, delivery pipelines, conversion-critical flows, and products like StackBrief. Speaks on Astro and performance.' }),
      SITE_AUTHOR_EMAIL: envField.string({ context: 'client', access: 'public', default: 'ericksutil@gmail.com' }),
      SITE_AUTHOR_LOCATION: envField.string({ context: 'client', access: 'public', default: '' }),

      // Social media links (empty string = hidden)
      SOCIAL_GITHUB: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_LINKEDIN: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_TWITTER: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_MASTODON: envField.string({ context: 'client', access: 'public', default: '' }),
      SOCIAL_BLUESKY: envField.string({ context: 'client', access: 'public', default: '' }),

      // Remote MCP (/api/mcp) — server-only
      MCP_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      MCP_RATE_LIMIT: envField.string({ context: 'server', access: 'secret', optional: true, default: '60' }),
      MCP_RATE_WINDOW_MS: envField.string({ context: 'server', access: 'secret', optional: true, default: '60000' }),
    },
  },

  /**
   * Image optimization configuration
   * 
   * Uses Astro's built-in Sharp-based image service for automatic optimization.
   * 
   * Features:
   * - Automatic format conversion (AVIF, WebP, PNG, JPEG)
   * - Responsive image generation with srcset
   * - Build-time optimization for static images
   * - Memory-safe processing with pixel limits
   * 
   * The limitInputPixels setting prevents memory issues when processing
   * very large images (~16K x 16K pixels maximum).
   */
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Limit concurrent image processing to avoid memory issues
        limitInputPixels: 268402689, // ~16K x 16K pixels
      }
    },
    // Remote image patterns (currently empty - add patterns as needed)
    remotePatterns: [],
  },

  /**
   * Markdown configuration
   * 
   * Configures markdown processing and syntax highlighting.
   * 
   * Shiki Configuration:
   * - Theme: GitHub Dark for consistent code highlighting
   * - Wrap: Enables line wrapping for long code lines
   */
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },

  /**
   * Build configuration
   * 
   * inlineStylesheets: 'always' ensures that small CSS files are inlined
   * directly into the HTML to avoid render-blocking network requests.
   */
  build: {
    inlineStylesheets: 'always'
  }
});