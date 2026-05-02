/*
  IllustrationSlot — placeholder for the editorial drawings planned in
  /impeccable craft (Como ajuda + Serviços). Renders a paper-clay panel
  with crop-mark corners, "ESBOÇO" label, and the metaphor concept
  inscribed in italic display type. Reads unmistakably as a reserved
  art slot — never as finished work — and doubles as the brief for the
  eventual commissioned illustrator.

  Decorative: aria-hidden. Lives outside the document outline.
  Optional `src` prop short-circuits to a real next/image once art exists.
*/

import Image from "next/image";
import type { CSSProperties } from "react";

type Shape = "square" | "wide" | "service" | "portrait";

type Props = {
  concept: string;
  shape?: Shape;
  /** When set, renders the final art in place of the placeholder. */
  src?: string;
  /** Alt text for the final art. Empty string is treated as decorative. */
  alt?: string;
  className?: string;
};

const aspectByShape: Record<Shape, string> = {
  square: "1 / 1",
  wide: "7 / 4",
  service: "1 / 1",
  portrait: "4 / 5",
};

const widthByShape: Record<Shape, string> = {
  square: "clamp(5.5rem, 10vw, 7rem)",
  wide: "clamp(8.5rem, 15vw, 11rem)",
  service: "clamp(8rem, 18vw, 13.5rem)",
  portrait: "100%",
};

// `sizes` mirrors the CSS column the slot occupies in its parent grid.
// Portrait sits in lg:col-span-5 of a max-w-[1240px] container (≈ ~500px
// at desktop, capped); below the lg breakpoint it stretches to ~100vw
// minus gutters. The other shapes are small fixed-width vignettes — a
// generous mobile-first fallback is fine since they cap via widthByShape.
const sizesByShape: Record<Shape, string> = {
  square: "(min-width: 1024px) 7rem, 10vw",
  wide: "(min-width: 1024px) 11rem, 15vw",
  service: "(min-width: 1024px) 13.5rem, 18vw",
  portrait: "(min-width: 1024px) 40vw, 100vw",
};

export function IllustrationSlot({ concept, shape = "square", src, alt, className }: Props) {
  const style: CSSProperties = {
    aspectRatio: aspectByShape[shape],
    width: widthByShape[shape],
  };

  if (src) {
    // `alt` falls back to the concept brief so screen readers get *something*
    // descriptive when the CMS doesn't provide explicit alt text. Empty
    // string is honored — that's the "decorative image" signal.
    const resolvedAlt = alt !== undefined ? alt : concept;
    const isDecorative = resolvedAlt === "";
    return (
      <div
        className={`relative block select-none ${className ?? ""}`}
        style={style}
        {...(isDecorative ? { "aria-hidden": true } : {})}
      >
        <Image
          src={src}
          alt={resolvedAlt}
          fill
          sizes={sizesByShape[shape]}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <figure
      aria-hidden
      className={`illustration-slot relative isolate ${className ?? ""}`}
      style={style}
    >
      <span className="illustration-slot__corner illustration-slot__corner--tl" />
      <span className="illustration-slot__corner illustration-slot__corner--tr" />
      <span className="illustration-slot__corner illustration-slot__corner--bl" />
      <span className="illustration-slot__corner illustration-slot__corner--br" />

      <figcaption className="illustration-slot__caption">
        <span className="illustration-slot__label">Esboço</span>
        <span className="illustration-slot__concept">{concept}</span>
      </figcaption>
    </figure>
  );
}
