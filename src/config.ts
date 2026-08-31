/**
 * Site Configuration
 *
 * @module config
 */

const getEnv = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] ?? fallback;
};

export const siteConfig = {
  url: getEnv('SITE_URL', 'https://www.erbsu.com'),
  language: getEnv('SITE_LANGUAGE', 'en'),
  title: getEnv('SITE_TITLE', 'Erick Sutil, Senior Frontend Engineer'),
  description: getEnv(
    'SITE_DESCRIPTION',
    'Senior Frontend Engineer at Reclame AQUI. Case studies on architecture and performance, products like StackBrief, talks on Astro.'
  ),
  author: {
    name: getEnv('SITE_AUTHOR_NAME', 'Erick Sutil'),
    title: getEnv('SITE_AUTHOR_TITLE', 'Senior Frontend Engineer'),
    bio: getEnv(
      'SITE_AUTHOR_BIO',
      'Senior Frontend Engineer at Reclame AQUI. Nine years on production frontends: microfrontends, delivery pipelines, conversion-critical flows, and products like StackBrief. Speaks on Astro and performance.'
    ),
    email: getEnv('SITE_AUTHOR_EMAIL', 'ericksutil@gmail.com'),
    location: getEnv('SITE_AUTHOR_LOCATION', ''),
  },
  social: {
    github: getEnv('SOCIAL_GITHUB', ''),
    linkedin: getEnv('SOCIAL_LINKEDIN', ''),
    twitter: getEnv('SOCIAL_TWITTER', ''),
    mastodon: getEnv('SOCIAL_MASTODON', ''),
    bluesky: getEnv('SOCIAL_BLUESKY', ''),
  },
  nav: [
    { label: 'Cases', href: '/projects' },
    { label: 'Products', href: '/products' },
    { label: 'Community', href: '/community' },
    { label: 'Contact', href: '/contact' },
  ],
  /** GA4 measurement ID for this site (deferred gtag in BaseLayout). */
  googleAnalyticsId: 'G-F3MNK2ZYD7',
  /** OpenAI Ads / ChatGPT Ads measurement pixel ID. */
  openAiAdsPixelId: 'YVLdKuvXbH3WHN6hAyFCRA',
} as const;

export type SiteConfig = typeof siteConfig;
export type SocialLinks = typeof siteConfig.social;
export type NavItem = typeof siteConfig.nav[number];
