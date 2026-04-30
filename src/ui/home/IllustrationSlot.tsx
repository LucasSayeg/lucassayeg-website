/*
  IllustrationSlot — placeholder for the editorial drawings planned in
  /impeccable craft (Como ajuda + Serviços). Renders a paper-clay panel
  with crop-mark corners, "ESBOÇO" label, and the metaphor concept
  inscribed in italic display type. Reads unmistakably as a reserved
  art slot — never as finished work — and doubles as the brief for the
  eventual commissioned illustrator.

  Decorative: aria-hidden. Lives outside the document outline.
  Optional `src` prop short-circuits to a real <img> once art exists.
*/

import * as React from "react";

type Shape = "square" | "wide" | "tall" | "service" | "portrait";

type Props = {
  concept: string;
  shape?: Shape;
  /** When set, renders the final art in place of the placeholder. */
  src?: string;
  className?: string;
};

const aspectByShape: Record<Shape, string> = {
  square: "1 / 1",
  wide: "7 / 4",
  tall: "3 / 4",
  service: "1 / 1",
  portrait: "4 / 5",
};

const widthByShape: Record<Shape, string> = {
  square: "clamp(5.5rem, 10vw, 7rem)",
  wide: "clamp(8.5rem, 15vw, 11rem)",
  tall: "clamp(5rem, 9vw, 6.25rem)",
  service: "clamp(8rem, 18vw, 13.5rem)",
  portrait: "100%",
};

export function IllustrationSlot({ concept, shape = "square", src, className }: Props) {
  const style: React.CSSProperties = {
    aspectRatio: aspectByShape[shape],
    width: widthByShape[shape],
  };

  if (src) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden
        className={`block select-none object-contain ${className ?? ""}`}
        style={style}
        loading="lazy"
        decoding="async"
      />
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
