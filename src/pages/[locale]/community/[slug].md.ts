/**
 * Clean markdown mirror for a talk / community entry.
 * Route: /[locale]/community/[slug].md
 */
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { localizeSpeaking } from "../../../i18n/content/localize";
import { isAppLocale } from "../../../i18n/config";
import { localeStaticPaths } from "../../../i18n/utils";
import {
  buildTalkMarkdown,
  type TalkMirrorData,
} from "../../../lib/agent/markdownMirrors";

export const prerender = true;

export async function getStaticPaths() {
  const talks = await getCollection("speaking");
  return localeStaticPaths().flatMap(({ params: { locale } }) =>
    talks.map((talk) => ({
      params: { locale, slug: talk.id },
    })),
  );
}

export const GET: APIRoute = async ({ params }) => {
  const localeParam = params.locale;
  const slug = params.slug;
  if (!localeParam || !slug || !isAppLocale(localeParam)) {
    return new Response("Not found", { status: 404 });
  }

  const talk = await getEntry("speaking", slug);
  if (!talk) {
    return new Response("Not found", { status: 404 });
  }

  const localized = localizeSpeaking(
    talk.id,
    talk.data as Record<string, unknown>,
    localeParam,
  );
  const data = localized.data as TalkMirrorData;
  const body =
    localized.body ??
    (typeof talk.body === "string" && talk.body.trim() ? talk.body : null);

  const markdown = buildTalkMarkdown(talk.id, localeParam, {
    ...data,
    body,
  });

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
