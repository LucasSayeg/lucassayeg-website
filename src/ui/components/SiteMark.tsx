import type { CSSProperties } from "react";
import type { SiteLogo } from "@/lib/home-content-types";
import { cn } from "@/lib/utils";

/*
  The CMS monogram, printed in the site's ink. The upload's alpha channel
  becomes a CSS mask (`.site-mark` in globals.css) and the box is painted with
  the handmade-ink accent — so any solid-color file (including the
  white-on-transparent placeholder) renders in the identity's navy, a
  printer's mark stamped on the page rather than a pasted image.

  Decorative by default: in the header the mark sits inside the brand link
  whose visible text already names the site, so exposing it to assistive tech
  would only double the announcement. Pass `decorative={false}` where the
  mark stands alone.
*/

type SiteMarkProps = {
  logo: SiteLogo;
  decorative?: boolean;
  className?: string;
};

export function SiteMark({ logo, decorative = true, className }: SiteMarkProps) {
  // Box sizes from height alone; the mask has no <img> intrinsics to lean on.
  const ratio = logo.width && logo.height ? logo.width / logo.height : 1;
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": logo.alt } as const);
  return (
    <span
      {...a11y}
      className={cn("site-mark", className)}
      style={
        {
          "--mark-url": `url("${logo.url}")`,
          aspectRatio: String(ratio),
        } as CSSProperties
      }
    />
  );
}
