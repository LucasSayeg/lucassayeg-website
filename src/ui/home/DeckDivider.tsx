"use client";

import * as React from "react";

type Props = {
  /** Lowercase label set in the gap between the two hairlines. */
  label: string;
  className?: string;
};

/*
  Off-grid labelled divider whose two hairlines draw outward from the label
  when it scrolls into view (CSS animates the ::before / ::after via scaleX —
  see .deck-divider in globals.css).

  Progressive enhancement mirrors CascadeReveal: SSR / no-JS / reduced-motion /
  above-the-fold paths render the lines fully drawn. The component only arms
  (collapses) the lines once JS confirms we're below the fold and motion isn't
  reduced, then flips data-in when the divider intersects.
*/
export function DeckDivider({ label, className }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    el.setAttribute("data-armed", "true");

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute("data-in", "true");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`deck-divider ${className ?? ""}`} aria-hidden>
      <span>{label}</span>
    </div>
  );
}
