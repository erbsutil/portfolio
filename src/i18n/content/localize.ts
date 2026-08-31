import type { AppLocale } from "../config";
import { mergeLocalized } from "../utils";
import { appsPtBR } from "./pt-BR/apps";
import { projectsPtBR } from "./pt-BR/projects";
import { speakingPtBR } from "./pt-BR/speaking";

export function localizeProjectData<T extends Record<string, unknown>>(
  id: string,
  data: T,
  locale: AppLocale,
): T {
  if (locale !== "pt-BR") return data;
  return mergeLocalized(data, projectsPtBR[id]);
}

export function localizeAppData<T extends Record<string, unknown>>(
  id: string,
  data: T,
  locale: AppLocale,
): T {
  if (locale !== "pt-BR") return data;
  return mergeLocalized(data, appsPtBR[id]);
}

export function localizeSpeaking(
  id: string,
  data: Record<string, unknown>,
  locale: AppLocale,
): { data: Record<string, unknown>; body: string | null } {
  if (locale !== "pt-BR") {
    return { data, body: null };
  }
  const entry = speakingPtBR[id];
  if (!entry) return { data, body: null };
  return {
    data: mergeLocalized(data, entry.fields),
    body: entry.body ?? null,
  };
}
