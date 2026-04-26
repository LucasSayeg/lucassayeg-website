"use client";

import * as React from "react";

type RevealProps = {
  /** Sequence index for stagger (0-based). */
  index?: number;
  /** Element type to render. */
  as?: "div" | "li" | "section" | "article" | "p" | "blockquote";
  className?: string;
  children: React.ReactNode;
};

/*
  Progressive-enhancement reveal-on-scroll.

  SSR / no-JS / reduced-motion: content renders immediately visible (no .reveal class).
  After mount, JS arms .reveal on elements that are below the fold, then an
  IntersectionObserver flips them to .reveal--in when scrolled into view.
  Elements already in the viewport stay visible without animation.
*/
export function Reveal({ index = 0, as: Tag = "div", className, children }: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    el.classList.add("reveal");

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--in");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const style = { ["--reveal-i" as string]: index } as React.CSSProperties;

  return React.createElement(
    Tag,
    {
      ref: ref as React.RefObject<HTMLElement>,
      className,
      style,
    },
    children,
  );
}
