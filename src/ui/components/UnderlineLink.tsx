import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Body-text underline link — the warm decoration-ink-faint rule with the
  accent-soft hover. Two registers:
    - default (6px offset) for standalone section links and footer items
    - tight (5px offset) for inline body copy in dense paragraphs

  The recipe is decoration-only on purpose: text color and hover color
  shifts are contextual (Footer brightens to ink, Sobre shifts to accent,
  ContactForm inline keeps text static). Call sites layer those via the
  `className` prop and tailwind-merge dedupes.

  Renders <a> by default; `internal` opts into next/link for client-side
  navigation. External links pass `external` to get the usual blank-tab
  attributes.
*/

type Variant = "default" | "tight";

const baseClasses = "underline decoration-ink-faint hover:decoration-accent-soft";

const variantClasses: Record<Variant, string> = {
  default: "decoration-[1px] underline-offset-[6px]",
  tight: "decoration-1 underline-offset-[5px]",
};

export function underlineLinkClass(opts?: { variant?: Variant; className?: string }) {
  const variant = opts?.variant ?? "default";
  return cn(baseClasses, variantClasses[variant], opts?.className);
}

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ExternalProps = CommonProps & {
  href: string;
  internal?: false;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children" | "onClick">;

type InternalProps = CommonProps & {
  href: string;
  internal: true;
  prefetch?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function UnderlineLink(props: ExternalProps | InternalProps) {
  const { variant = "default", className, children, href } = props;
  const merged = underlineLinkClass({ variant, className });

  if (props.internal) {
    return (
      <Link href={href} prefetch={props.prefetch} className={merged} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const {
    external,
    onClick,
    internal: _internal,
    variant: _variant,
    className: _className,
    children: _children,
    href: _href,
    ...rest
  } = props;
  const externalAttrs = external ? { target: "_blank", rel: "noreferrer noopener" } : null;
  return (
    <a href={href} {...externalAttrs} {...rest} className={merged} onClick={onClick}>
      {children}
    </a>
  );
}
