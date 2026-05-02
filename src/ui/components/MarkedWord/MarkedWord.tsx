/*
  A topic word held inside a small editorial enclosure — a "caixinha"
  that names what we work with. The chip is type-led: a 1px hairline
  border, paper-toned fill, and the section's display serif doing the
  heavy lifting. Variation lives in the words, not in the chrome.

  Non-interactive on purpose: chips are recognition tokens, not links.
  Visitors take action via the dedicated WhatsApp / form CTAs so a
  misclick on a topic word doesn't open a chat by accident.
*/

export type MarkedWordSize = "base" | "xl";

type Props = {
  topic: string;
  /** "xl" for hero/comoAjuda; "base" for servicos's smaller register. */
  size?: MarkedWordSize;
  className?: string;
};

export function MarkedWord({ topic, size = "xl", className }: Props) {
  const sizeClass = size === "xl" ? "marked-word--xl" : "marked-word--base";

  return (
    <span className={`marked-word ${sizeClass} ${className ?? ""}`.trim()}>
      <span className="marked-word__text">{topic}</span>
    </span>
  );
}
