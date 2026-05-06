/*
  A topic word framed by a quiet outlined capsule — the house gesture for
  "caixinhas" across the home page (Hero quick-picks, Servicos áreas de
  escuta). The capsule is a 1px ink-faint border, no fill: a typographic
  frame, not a button.

  Non-interactive on purpose: chips are recognition tokens, not links.
  Visitors take action via the dedicated WhatsApp / form CTAs so a
  misclick on a topic word doesn't open a chat by accident.
*/

export type TopicChipSize = "base" | "xl";

type Props = {
  topic: string;
  /** "xl" for hero/comoAjuda; "base" for servicos's smaller register. */
  size?: TopicChipSize;
  className?: string;
};

export function TopicChip({ topic, size = "xl", className }: Props) {
  const sizeClass = size === "xl" ? "topic-chip--xl" : "topic-chip--base";
  return <span className={`topic-chip ${sizeClass} ${className ?? ""}`.trim()}>{topic}</span>;
}
