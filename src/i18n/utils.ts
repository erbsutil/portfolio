import type { AppLocale } from "./config";
import { defaultLocale, isAppLocale } from "./config";

/** Resolve locale from Astro params (static paths). */
export function localeFromParams(
  locale: string | undefined,
): AppLocale {
  if (locale && isAppLocale(locale)) return locale;
  return defaultLocale;
}

/** Static paths for every locale. */
export function localeStaticPaths() {
  return [
    { params: { locale: "en" as const } },
    { params: { locale: "pt-BR" as const } },
  ];
}

/** Deep-merge overlay onto base (arrays replace; objects recurse). */
export function mergeLocalized<T extends Record<string, unknown>>(
  base: T,
  overlay: Record<string, unknown> | undefined | null,
): T {
  if (!overlay) return base;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (value === undefined) continue;
    const current = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      current &&
      typeof current === "object" &&
      !Array.isArray(current)
    ) {
      out[key] = mergeLocalized(
        current as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else {
      out[key] = value;
    }
  }
  return out as T;
}
