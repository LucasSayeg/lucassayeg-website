import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/ui/components/WhatsappIcon";

/*
  The WhatsApp affordance — the only place a visitor opens a chat. Same
  shape across Header, Hero, Contato, and the Sobre page bottom CTA:
  brown pill, brand-green glyph, label, the small paper-deep arrow that
  nudges forward on hover. `size="sm"` matches the dense header row.
*/

type WhatsappCtaProps = {
  href: string;
  /** Visible label next to the icon. */
  children: ReactNode;
  /** Accessible label that replaces the visible label for screen readers. */
  ariaLabel?: string;
  size?: "sm" | "base";
  className?: string;
};

export function WhatsappCta({
  href,
  children,
  ariaLabel,
  size = "base",
  className,
}: WhatsappCtaProps) {
  const iconSize = size === "sm" ? 14 : 16;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      className={cn(
        "btn-primary group font-display",
        size === "sm" && "btn-primary--sm",
        className,
      )}
    >
      <WhatsappIcon size={iconSize} className="text-[#25D366]" />
      <span className={cn("font-display", size === "sm" ? "text-sm" : "text-base")}>
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "font-display text-paper-deep transition-transform group-hover:translate-x-0.5",
          size === "sm" ? "text-sm" : "text-base",
        )}
      >
        →
      </span>
    </a>
  );
}
