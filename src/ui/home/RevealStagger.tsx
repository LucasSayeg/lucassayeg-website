"use client";

import * as React from "react";

/* The observer's effective viewport is shrunk from the bottom by this
   amount, so each child only flips on once it has scrolled meaningfully
   into view (not at first-pixel contact). */
const TRIGGER_BOTTOM_INSET = "-30%";

type RevealStaggerProps = {
  as?: "div" | "section" | "ul" | "ol";
  className?: string;
  children: React.ReactNode;
};

/*
  Per-child reveal: each direct child of the wrapper is observed
  individually and flipped to .reveal-stagger-item--in on first
  intersection.

  Progressive enhancement: the SSR/no-JS default is visible. The hidden
  off-state in CSS is gated behind [data-reveal-armed="true"], which we
  set on the parent only after mount, immediately before attaching the
  observer. If JS fails or is slow, content stays visible — no
  above-the-fold flash of hidden content.

  Reduced-motion is handled in CSS (the @media rule overrides children to
  opacity 1, transform none), so JS does nothing special for it.
*/
export function RevealStagger({ as: Tag = "div", className, children }: RevealStaggerProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    parent.setAttribute("data-reveal-armed", "true");

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-stagger-item--in");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: `0px 0px ${TRIGGER_BOTTOM_INSET} 0px` },
    );
    for (const child of Array.from(parent.children)) obs.observe(child);
    return () => obs.disconnect();
  }, []);

  const composed = className ? `reveal-stagger ${className}` : "reveal-stagger";

  return React.createElement(
    Tag,
    {
      ref: ref as React.RefObject<HTMLElement>,
      className: composed,
    },
    children,
  );
}
