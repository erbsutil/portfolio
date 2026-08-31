/**
 * Human-facing identity links (GitHub, LinkedIn, optional socials from env).
 * Falls back to profile.links when SOCIAL_* env is empty so contact/footer
 * and sameAs stay aligned. Never invents platforms that are not configured.
 */
import { siteConfig } from "../config";
import { profile } from "../data/profile";

export type IdentityLink = {
  platform: string;
  url: string;
};

function label(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Links suitable for `rel="me"` and Person sameAs (real profiles only).
 */
export function identitySocialLinks(): IdentityLink[] {
  const github = siteConfig.social.github || profile.links.github;
  const linkedin = siteConfig.social.linkedin || profile.links.linkedin;

  const out: IdentityLink[] = [
    { platform: "GitHub", url: github },
    { platform: "LinkedIn", url: linkedin },
  ];

  const optional: Array<keyof typeof siteConfig.social> = [
    "twitter",
    "mastodon",
    "bluesky",
  ];
  for (const key of optional) {
    const url = siteConfig.social[key];
    if (url) out.push({ platform: label(key), url });
  }

  return out;
}

/** Absolute profile URLs for JSON-LD sameAs (deduped). */
export function identitySameAs(): string[] {
  return [
    ...new Set([
      ...identitySocialLinks().map((l) => l.url),
      ...profile.sameAs,
    ]),
  ];
}
