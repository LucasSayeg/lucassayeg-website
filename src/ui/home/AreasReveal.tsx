"use client";

import * as React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

/*
  Horizontal cascading reveal for the Serviços "Áreas de escuta" list.

  The list is the focal item — the heading/framing above it are
  introductory. So the trigger is the <ul> itself (not its parent
  article), with a generous bottom inset so the cascade fires when the
  list is meaningfully in view — not when the section first peeks in.
  Items default to a small horizontal offset (translateX) + opacity 0,
  then settle to rest one-by-one with a per-item delay.

  Progressive enhancement: SSR / no-JS / reduced-motion / above-the-fold
  paths all render the list visible. The component only arms (hides)
  items when JS confirms we're below the fold AND motion isn't reduced.
*/
export function AreasReveal({ className, children }: Props) {
  const ref = React.useRef<HTMLUListElement | null>(null);

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
      { threshold: 0.01, rootMargin: "0px 0px -18% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const composed = className ? `areas-reveal ${className}` : "areas-reveal";

  return (
    <ul ref={ref} className={composed}>
      {children}
    </ul>
  );
}
