/**
 * Locale configuration (StackBrief-style always-prefix routing).
 */

export const locales = ["en", "pt-BR"] as const;
export type AppLocale = (typeof locales)[number];

/** Default for crawlers, x-default, and unmatched Accept-Language. */
export const defaultLocale: AppLocale = "en";

export const LOCALE_COOKIE = "PREFERRED_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const localeLabels: Record<AppLocale, string> = {
  en: "EN",
  "pt-BR": "PT-BR",
};

export const ogLocales: Record<AppLocale, string> = {
  en: "en_US",
  "pt-BR": "pt_BR",
};

/** BCP 47 tags for <html lang> and Intl. */
export const htmlLang: Record<AppLocale, string> = {
  en: "en",
  "pt-BR": "pt-BR",
};

export function isAppLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}

export function stripLocalePrefix(pathname: string): {
  locale: AppLocale | null;
  pathnameWithoutLocale: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const maybe = segments[0];
  if (maybe && isAppLocale(maybe)) {
    const rest = "/" + segments.slice(1).join("/");
    return {
      locale: maybe,
      pathnameWithoutLocale: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/",
    };
  }
  return { locale: null, pathnameWithoutLocale: pathname || "/" };
}

/** Build a locale-prefixed path. `path` should start with `/` (unprefixed). */
export function withLocale(locale: AppLocale, path: string = "/"): string {
  const normalized =
    !path || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;
  if (normalized === "/") return `/${locale}/`;
  const trimmed = normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
  return `/${locale}${trimmed}/`;
}

/** Swap locale in a prefixed pathname, preserving the rest. */
export function switchLocalePath(
  pathname: string,
  nextLocale: AppLocale,
): string {
  const { pathnameWithoutLocale } = stripLocalePrefix(pathname);
  return withLocale(nextLocale, pathnameWithoutLocale);
}

/**
 * Prefer Portuguese when Accept-Language clearly favors pt.
 * Used for humans only; crawlers should get defaultLocale.
 */
export function localeFromAcceptLanguage(
  header: string | null | undefined,
): AppLocale {
  if (!header) return defaultLocale;
  const parts = header.split(",").map((p) => {
    const [tag, ...params] = p.trim().split(";");
    const q = params.find((x) => x.trim().startsWith("q="));
    const quality = q ? Number(q.split("=")[1]) || 0 : 1;
    return { tag: tag.toLowerCase(), quality };
  });
  parts.sort((a, b) => b.quality - a.quality);
  for (const { tag } of parts) {
    if (tag.startsWith("pt")) return "pt-BR";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

/** Common crawler / preview bot user agents (no Accept-Language negotiation). */
export function isCrawlerUserAgent(ua: string | null | undefined): boolean {
  if (!ua) return false;
  return /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|applebot|semrushbot|ahrefsbot|petalbot|bytespider|gptbot|claudebot|anthropic|perplexity|ccbot/i.test(
    ua,
  );
}
