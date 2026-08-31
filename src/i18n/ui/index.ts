import type { AppLocale } from "../config";
import { en, type UiMessages } from "./en";
import { ptBR } from "./pt-BR";

const catalogs: Record<AppLocale, UiMessages> = {
  en,
  "pt-BR": ptBR,
};

export function getUi(locale: AppLocale): UiMessages {
  return catalogs[locale] ?? en;
}

export type { UiMessages };
