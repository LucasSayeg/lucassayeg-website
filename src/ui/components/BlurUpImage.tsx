"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

// Warm putty tint (--paper-clay) as a 4×5 SVG — the fallback when a remote
// image has no generated blur.
const FLAT_PUTTY =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZGU5ZTAiLz48L3N2Zz4=";

type Props = {
  src: string | StaticImageData;
  alt: string;
  sizes: string;
  fitClassName: string;
  priority?: boolean;
  blurDataURL?: string | null;
  decorative?: boolean;
};

export function BlurUpImage({
  src,
  alt,
  sizes,
  fitClassName,
  priority = false,
  blurDataURL,
  decorative = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // If the image is already complete before hydration (cached), the onLoad
  // may not fire — promote to loaded so it doesn't stay at opacity 0.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  const isStatic = typeof src !== "string";
  const a11y = decorative ? { alt: "", "aria-hidden": true as const } : { alt };

  // Static imports: next/image generates its own blur-up from the bytes.
  if (isStatic) {
    return (
      <Image
        {...a11y}
        ref={ref}
        src={src}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={fitClassName}
      />
    );
  }

  // Remote: own blurred backdrop + cross-fade the sharp image over it.
  const backdrop = blurDataURL ?? FLAT_PUTTY;
  return (
    <>
      <div
        aria-hidden
        className="blur-up-backdrop"
        style={{ backgroundImage: `url("${backdrop}")` }}
      />
      <Image
        {...a11y}
        ref={ref}
        src={src}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="empty"
        onLoad={() => setLoaded(true)}
        className={`${fitClassName} blur-up-fade${loaded ? " is-loaded" : ""}`}
      />
    </>
  );
}
