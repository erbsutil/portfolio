#!/usr/bin/env node
/**
 * Generate public/og-image.png (1200×630) for LinkedIn / social previews.
 * Editorial magazine layout matching the site: paper, IBM Plex, speaking photo.
 *
 * Usage: node scripts/generate-og.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "og-image.png");

const font = (rel) =>
  `data:font/woff;base64,${readFileSync(join(root, rel)).toString("base64")}`;

const photo = `data:image/jpeg;base64,${readFileSync(
  join(root, "src/assets/images/speaking/devparana-estrada-26-face.jpg"),
).toString("base64")}`;

const sans600 = font(
  "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff",
);
const sans500 = font(
  "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff",
);
const serif700 = font(
  "node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-700-normal.woff",
);
const mono500 = font(
  "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff",
);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: "IBM Plex Sans";
    font-weight: 600;
    src: url("${sans600}") format("woff");
  }
  @font-face {
    font-family: "IBM Plex Sans";
    font-weight: 500;
    src: url("${sans500}") format("woff");
  }
  @font-face {
    font-family: "IBM Plex Serif";
    font-weight: 700;
    src: url("${serif700}") format("woff");
  }
  @font-face {
    font-family: "IBM Plex Mono";
    font-weight: 500;
    src: url("${mono500}") format("woff");
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: #eef1ee;
    color: #0e1512;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
  }

  .frame {
    position: relative;
    width: 1200px;
    height: 630px;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    background:
      radial-gradient(ellipse 120% 70% at 40% -10%, rgba(255,255,255,0.55) 0%, transparent 62%),
      #eef1ee;
  }

  .frame::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.045;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
    pointer-events: none;
  }

  .copy {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 48px 52px 64px;
    border-right: 1px solid #aeb8b2;
  }

  .folio {
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #176b60;
  }

  .mid { margin-top: 36px; }

  h1 {
    font-family: "IBM Plex Serif", Georgia, serif;
    font-weight: 700;
    font-size: 72px;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #0e1512;
  }

  .role {
    margin-top: 18px;
    font-weight: 600;
    font-size: 28px;
    line-height: 1.25;
    color: #24332c;
  }

  .lede {
    margin-top: 22px;
    max-width: 22ch;
    font-weight: 500;
    font-size: 22px;
    line-height: 1.4;
    color: #3a4d44;
  }

  .foot {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-weight: 500;
    font-size: 20px;
    color: #24332c;
  }

  .rule {
    width: 36px;
    height: 2px;
    background: #176b60;
    flex-shrink: 0;
  }

  .media {
    position: relative;
    z-index: 1;
    overflow: hidden;
    background: #0e1512;
  }

  .media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 62% 18%;
    display: block;
  }

  .media::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(14, 21, 18, 0.18) 0%,
      transparent 28%
    );
    pointer-events: none;
  }

  .badge {
    position: absolute;
    left: 28px;
    bottom: 28px;
    z-index: 2;
    padding: 10px 14px;
    background: rgba(238, 241, 238, 0.92);
    border: 1px solid #aeb8b2;
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #0e1512;
  }
</style>
</head>
<body>
  <div class="frame">
    <section class="copy">
      <div class="folio">Portfolio · Cases &amp; talks</div>
      <div class="mid">
        <h1>Erick Sutil</h1>
        <p class="role">Senior Frontend Engineer</p>
        <p class="lede">Architecture, performance, and products shipped in production.</p>
      </div>
      <div class="foot">
        <span class="rule" aria-hidden="true"></span>
        <span>erbsu.com</span>
      </div>
    </section>
    <aside class="media">
      <img src="${photo}" alt="" width="570" height="630" />
      <div class="badge">Speaking · DevParaná</div>
    </aside>
  </div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const buffer = await page.screenshot({ type: "png", omitBackground: false });
await browser.close();

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, buffer);
console.log(`Wrote ${outPath} (${buffer.length} bytes)`);
