/**
 * Post-build CSP patch for production realities:
 * - Drop script/style hashes so 'unsafe-inline' is honored (CSP2 ignores it when
 *   hashes are present). Needed for theme boot + Cloudflare challenge widgets.
 * - Allow GA/gtag, Cloudflare insights/challenge, Vercel Analytics, and OpenAI Ads pixel.
 */
import { readFileSync, writeFileSync } from "node:fs";

const configPath = ".vercel/output/config.json";
const config = JSON.parse(readFileSync(configPath, "utf8"));

const SCRIPT_SRC = [
  "'self'",
  "'unsafe-inline'",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://static.cloudflareinsights.com",
  "https://challenges.cloudflare.com",
  "https://va.vercel-scripts.com",
  "https://bzrcdn.openai.com",
].join(" ");

const STYLE_SRC = ["'self'", "'unsafe-inline'"].join(" ");

const CONNECT_SRC = [
  "'self'",
  "https://www.google-analytics.com",
  "https://analytics.google.com",
  "https://region1.google-analytics.com",
  "https://stats.g.doubleclick.net",
  "https://cloudflareinsights.com",
  "https://static.cloudflareinsights.com",
  "https://challenges.cloudflare.com",
  "https://vitals.vercel-insights.com",
  "https://va.vercel-scripts.com",
  "https://bzr.openai.com",
  "https://bzrcdn.openai.com",
].join(" ");

const IMG_SRC = [
  "'self'",
  "data:",
  "https://www.google-analytics.com",
  "https://www.googletagmanager.com",
  "https://bzr.openai.com",
].join(" ");

const FRAME_SRC = ["'self'", "https://challenges.cloudflare.com"].join(" ");

function upsertDirective(csp, name, value) {
  const re = new RegExp(`${name} [^;]*`);
  if (re.test(csp)) return csp.replace(re, `${name} ${value}`);
  return `${csp}; ${name} ${value}`;
}

let patched = 0;
for (const route of config.routes ?? []) {
  const csp = route.headers?.["content-security-policy"];
  if (!csp || typeof csp !== "string") continue;

  let next = csp
    // Strip any 'sha256-…' / 'nonce-…' tokens so unsafe-inline works again
    .replace(/'sha256-[^']+'/g, "")
    .replace(/'nonce-[^']+'/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/;\s*;/g, ";")
    .replace(/;\s*$/g, "")
    .trim();

  next = upsertDirective(next, "script-src", SCRIPT_SRC);
  next = upsertDirective(next, "style-src", STYLE_SRC);
  next = upsertDirective(next, "connect-src", CONNECT_SRC);
  next = upsertDirective(next, "img-src", IMG_SRC);
  next = upsertDirective(next, "frame-src", FRAME_SRC);

  next = next.replace(/;\s*;/g, ";").replace(/;\s*$/g, "").trim();

  if (next !== csp) {
    route.headers["content-security-policy"] = next;
    patched += 1;
  }
}

writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log(`patched CSP allowlists on ${patched} routes`);
