/**
 * Real product/UI covers for cases that have screenshots.
 * Cases without a cover sit in the text grid — no stock art or fake initials.
 */
import type { ImageMetadata } from "astro";
import stackbriefCover from "../assets/images/screens/stackbrief/app-briefing.png";
import diarioFitCover from "../assets/images/screens/fit/home-macros.png";

const caseCovers: Record<string, ImageMetadata> = {
  stackbrief: stackbriefCover,
  "diario-fit": diarioFitCover,
};

export function getCaseCover(id: string): ImageMetadata | undefined {
  return caseCovers[id];
}

export function hasCaseCover(id: string): boolean {
  return id in caseCovers;
}
