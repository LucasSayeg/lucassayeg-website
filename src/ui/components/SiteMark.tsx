import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { preload } from "react-dom";
import type { SiteLogo } from "@/lib/home-content-types";
import { cn } from "@/lib/utils";

/*
  The CMS monogram, printed in the site's ink. The upload's alpha channel
  becomes a CSS mask (`.site-mark` in globals.css) and the box is painted with
  the handmade-ink accent — so any solid-color file (including the
  white-on-transparent placeholder) renders in the identity's ink, a
  printer's mark stamped on the page rather than a pasted image.

  Loading: CSS mask URLs are invisible to the browser's preload scanner and
  bypass next/image, so a naive url() would fetch the raw upload (the
  placeholder is ~484KB) only at paint time. Two countermeasures:
  - the URL is routed through the Next image optimizer (the mark renders at
    ~40px, so a small AVIF/WebP variant replaces whatever the CMS holds), and
  - `preload()` emits a <link rel="preload"> in the document head so the
    fetch starts with the HTML instead of at first paint.

  Decorative by default: in the header the mark sits inside the brand link
  whose visible text already names the site, so exposing it to assistive tech
  would only double the announcement. Pass `decorative={false}` where the
  mark stands alone.
*/

/* The optimizer rejects SVGs by default (and they're tiny anyway) and needs
   intrinsic dimensions — fall back to the raw URL in those cases. */
function resolveMaskUrl(logo: SiteLogo): string {
  if (!logo.width || !logo.height || logo.url.endsWith(".svg")) return logo.url;
  const { props } = getImageProps({
    src: logo.url,
    // Rendered at ≤44px — 128 covers 3x displays; `src` resolves to the 2x
    // srcSet entry, edge-cached by the optimizer.
    width: 128,
    height: Math.round((128 * logo.height) / logo.width),
    quality: 75,
    alt: "",
  });
  return props.src;
}

type SiteMarkProps = {
  logo: SiteLogo;
  decorative?: boolean;
  className?: string;
};

export function SiteMark({ logo, decorative = true, className }: SiteMarkProps) {
  // Box sizes from height alone; the mask has no <img> intrinsics to lean on.
  const ratio = logo.width && logo.height ? logo.width / logo.height : 1;
  const url = resolveMaskUrl(logo);
  preload(url, { as: "image" });
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": logo.alt } as const);
  return (
    <span
      {...a11y}
      className={cn("site-mark", className)}
      style={
        {
          "--mark-url": `url("${url}")`,
          aspectRatio: String(ratio),
        } as CSSProperties
      }
    />
  );
}
