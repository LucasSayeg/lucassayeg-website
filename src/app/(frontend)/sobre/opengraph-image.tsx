/*
  /sobre reuses the site-wide link-preview card verbatim.

  This file has to exist. `sobre/page.tsx` declares its own `openGraph` block
  so the card carries the page's own title and description, and Next replaces a
  parent `openGraph` wholesale rather than deep-merging it — `images` included.
  Without a `sobre`-scoped opengraph-image route, /sobre shipped no og:image at
  all and shares of that URL rendered as a bare text link.

  Only the component is re-exported: Next statically parses the route config
  below at compile time, so `revalidate`/`size`/`contentType`/`alt` have to be
  literals here (re-exporting them fails the build). They mirror
  ../opengraph-image.tsx — if that card's dimensions change, change them here too.
*/
export { default } from "../opengraph-image";

export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lucas Sayeg — Psicólogo clínico e orientador profissional";
