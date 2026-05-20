import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Editorial overline — the tiny uppercase label that introduces a block of
  body copy (Áreas de escuta, Atendimento, response-time, etc). Two sizes:
  `md` (0.78rem, body register) and `sm` (0.72rem, header / footer register).
*/

type EyebrowOwnProps<T extends ElementType> = {
  as?: T;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
};

type EyebrowProps<T extends ElementType> = EyebrowOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof EyebrowOwnProps<T>>;

export function Eyebrow<T extends ElementType = "p">({
  as,
  size = "md",
  className,
  children,
  ...rest
}: EyebrowProps<T>) {
  const Tag = (as ?? "p") as ElementType;
  return (
    <Tag
      {...rest}
      className={cn(
        "font-normal uppercase leading-none tracking-[0.22em] text-ink-quiet",
        size === "md" ? "text-[0.78rem]" : "text-[0.72rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
