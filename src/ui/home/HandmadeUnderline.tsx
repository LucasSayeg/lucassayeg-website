"use client";

import * as React from "react";

type Props = {
  children: React.ReactNode;
};

/*
  Single signature gesture: the hand-drawn underline under Lucas's name draws
  itself in the first time it enters the viewport. After that, it stays drawn.

  Progressive enhancement (mirrors the Reveal pattern):
  - SSR / no-JS: SVG renders fully drawn (stroke-dashoffset 0 in base CSS).
  - Reduced motion: same — no transition, no flash.
  - JS + motion: if the element is below the fold at mount, arm it (hide the
    stroke), then draw on intersect. Above-the-fold instances stay drawn.
*/
export function HandmadeUnderline({ children }: Props) {
  const ref = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    el.classList.add("handmade-underline__svg--armed");

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("handmade-underline__svg--drawn");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span className="handmade-underline">
      {children}
      <svg
        ref={ref}
        className="handmade-underline__svg"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M2 9 C 30 4, 60 12, 100 7 S 170 5, 198 8" pathLength={1} />
      </svg>
    </span>
  );
}
