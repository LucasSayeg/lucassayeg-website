"use client";

import * as React from "react";

type Props = {
  className?: string;
  /** List element to render. */
  as?: "ul" | "ol";
  children: React.ReactNode;
};

/*
  Coordinated cascading reveal for an editorial list.

  The list element itself is the trigger (not its parent), observed with a
  generous bottom inset so the cascade fires when the list is meaningfully in
  view rather than when the section first peeks in. Items default to a small
  horizontal offset (translateX) + opacity 0, then settle to rest one-by-one
  with a per-item delay (--list-i × 80ms), 760ms ease-out-expo.

  Shared by the Serviços "áreas de escuta" list (ul) and the Como ajuda
  numbered list (ol). Each child <li> sets its own --list-i.

  Progressive enhancement: SSR / no-JS / reduced-motion paths all render the
  list visible. When JS runs and motion isn't reduced, the list arms (hides)
  and the cascade plays — on intersection for below-the-fold lists, or
  immediately on load for a list already past the trigger line (ComoAjuda
  peeks out under the hero; it should perform its entrance like Serviços
  does, not appear pre-shown).
*/
// Bottom inset for the trigger line — the observer fires when the list
// crosses this far up the viewport. A list already past this line at mount
// skips the observer and plays at once (there's nothing left to wait for).
const TRIGGER_BOTTOM_INSET = 0.18;

export function CascadeReveal({ className, as: Tag = "ul", children }: Props) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.setAttribute("data-armed", "true");

    const triggerLine = window.innerHeight * (1 - TRIGGER_BOTTOM_INSET);
    const rect = el.getBoundingClientRect();
    const inView = rect.top < triggerLine && rect.bottom > 0;
    if (inView) {
      // Double rAF: the armed (hidden) state must commit a paint before
      // data-in flips, or the browser coalesces both states into one style
      // update and the transition never runs.
      let rafInner = 0;
      const rafOuter = requestAnimationFrame(() => {
        rafInner = requestAnimationFrame(() => el.setAttribute("data-in", "true"));
      });
      return () => {
        cancelAnimationFrame(rafOuter);
        cancelAnimationFrame(rafInner);
      };
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute("data-in", "true");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.01, rootMargin: `0px 0px -${TRIGGER_BOTTOM_INSET * 100}% 0px` },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const composed = className ? `cascade-reveal ${className}` : "cascade-reveal";

  return React.createElement(
    Tag,
    { ref: ref as React.RefObject<HTMLElement>, className: composed },
    children,
  );
}
