import { renderSiteOgCard } from "@/ui/og/site-og-card";

/*
  The home page's link-preview card. The card itself lives in
  @/ui/og/site-og-card — see that file for the design rationale and for why
  it is shared rather than re-exported between routes.

  Route config must be static literals: Next parses these at compile time and
  cannot follow an import, so `size` duplicates OG_SIZE by necessity.
*/
export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lucas Sayeg — Psicólogo clínico e orientador profissional";

export default function OpengraphImage() {
  return renderSiteOgCard();
}
