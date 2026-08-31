/**
 * Locale root `/` — server redirect (no HTML shell).
 *
 * SSR route: with `output: "static"`, a missing `/` page 404s on Vercel
 * because middleware alone does not emit a root handler.
 *
 * Crawlers → default locale (en), permanent 301 so engines consolidate on /en/.
 * Humans → cookie, then Accept-Language (pt* → pt-BR), then default (302).
 *
 * Keep `/` crawlable in robots.txt: blocking only the root made DuckDuckGo
 * show the domain with no snippet while /en/ sitelinks were fine.
 */

import type { APIRoute } from "astro";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  defaultLocale,
  isAppLocale,
  localeFromAcceptLanguage,
  isCrawlerUserAgent,
  withLocale,
  type AppLocale,
} from "../i18n/config";

export const prerender = false;

export const GET: APIRoute = ({ request, cookies, redirect }) => {
  const ua = request.headers.get("user-agent") ?? "";
  const isCrawler = isCrawlerUserAgent(ua);
  let locale: AppLocale = defaultLocale;

  if (!isCrawler) {
    const fromCookie = cookies.get(LOCALE_COOKIE)?.value;
    if (fromCookie && isAppLocale(fromCookie)) {
      locale = fromCookie;
    } else {
      locale = localeFromAcceptLanguage(request.headers.get("accept-language"));
      cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
  }

  // 301 for bots consolidates the apex/root listing onto /en/; 302 for humans
  // keeps locale negotiation from being sticky in intermediary caches.
  return redirect(withLocale(locale, "/"), isCrawler ? 301 : 302);
};
