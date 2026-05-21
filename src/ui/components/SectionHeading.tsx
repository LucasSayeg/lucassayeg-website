import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Section heading — the editorial h2 that opens every page section
  (Como ajuda, Sobre, Serviços, FAQ, Vamos conversar). Locks the display
  rhythm in one place: text-3xl, normal weight, tight tracking, 1.04
  leading. Override per-instance via className when the heading needs to
  span a grid column (md:col-span-7) or carry extra spacing.

  Defaults to h2. Use `as="h3"` for the (currently inline) subheadings
  in ComoAjuda and FAQ if they ever migrate over.
*/

type SectionHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3";
  children: ReactNode;
};

export function SectionHeading({
  as: Tag = "h2",
  className,
  children,
  ...rest
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
