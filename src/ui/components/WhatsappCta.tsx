import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/ui/components/WhatsappIcon";

/*
  The WhatsApp affordance — the only place a visitor opens a chat. Ink pill
  (--cta-surface), glyph, label, and a small arrow that nudges forward on
  hover. Two registers:
    - "solid"   — the weighted ink CTA. The Hero (first contact) and the
                  persistent header affordance, so the channel always reads
                  as the page's primary action.
    - "outline" — the quiet register for the contact rail, where a second
                  filled pill would compete with the form.
  `size="sm"` matches the dense header row.
*/

type WhatsappCtaProps = {
  href: string;
  /** Visible label next to the icon. */
  children: ReactNode;
  /** Accessible label that replaces the visible label for screen readers. */
  ariaLabel?: string;
  size?: "sm" | "base";
  /** Visual weight — "solid" is the rare filled CTA, "outline" the quiet repeat. */
  variant?: "solid" | "outline";
  className?: string;
};

export function WhatsappCta({
  href,
  children,
  ariaLabel,
  size = "base",
  variant = "solid",
  className,
}: WhatsappCtaProps) {
  const iconSize = size === "sm" ? 14 : 16;
  const base = variant === "outline" ? "btn-outline" : "btn-primary";
  const sizeClass =
    size === "sm" ? (variant === "outline" ? "btn-outline--sm" : "btn-primary--sm") : undefined;
  // On the solid pill the arrow reads as a light tick; on the outline pill it
  // shares the ink-quiet register so it stays visible against paper.
  const arrowColor = variant === "outline" ? "text-ink-quiet" : "text-paper-deep";
  // Brand-green holds its own against paper, but on the filled pill it argues
  // with the ink ground — there the glyph rides the same paper as the label.
  const iconColor = variant === "outline" ? "text-[#25D366]" : "text-paper";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      className={cn(base, "group font-display", sizeClass, className)}
    >
      <WhatsappIcon size={iconSize} className={iconColor} />
      <span className={cn("font-display", size === "sm" ? "text-sm" : "text-base")}>
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "font-display transition-transform group-hover:translate-x-0.5",
          arrowColor,
          size === "sm" ? "text-sm" : "text-base",
        )}
      >
        →
      </span>
    </a>
  );
}
