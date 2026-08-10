import { renderSiteOgCard } from "@/ui/og/site-og-card";

/*
  /sobre needs its own opengraph-image route: `sobre/page.tsx` declares its own
  `openGraph` block so the card carries this page's title and description, and
  Next replaces a parent `openGraph` wholesale rather than deep-merging it, so
  `images` does not cascade down. Without this file /sobre ships no og:image
  and shares of the URL render as a bare text link.

  It renders the same card as the home page (same name, same portrait), so the
  `alt` text matches. Route config must be static literals — Next parses these
  at compile time and cannot follow an import.
*/
export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lucas Sayeg — Psicólogo clínico e orientador profissional";

export default function SobreOpengraphImage() {
  return renderSiteOgCard();
}
