/**
 * Clean markdown mirror for a case study.
 * Route: /[locale]/projects/[slug].md
 */
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { localizeProjectData } from "../../../i18n/content/localize";
import { isAppLocale } from "../../../i18n/config";
import { localeStaticPaths } from "../../../i18n/utils";
import {
  buildCaseMarkdown,
  type CaseMirrorData,
} from "../../../lib/agent/markdownMirrors";

export const prerender = true;

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return localeStaticPaths().flatMap(({ params: { locale } }) =>
    projects.map((project) => ({
      params: { locale, slug: project.id },
    })),
  );
}

export const GET: APIRoute = async ({ params }) => {
  const localeParam = params.locale;
  const slug = params.slug;
  if (!localeParam || !slug || !isAppLocale(localeParam)) {
    return new Response("Not found", { status: 404 });
  }

  const project = await getEntry("projects", slug);
  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  const data = localizeProjectData(
    project.id,
    project.data as Record<string, unknown>,
    localeParam,
  ) as CaseMirrorData;

  const markdown = buildCaseMarkdown(project.id, localeParam, data);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
