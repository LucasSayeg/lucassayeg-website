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

  Progressive enhancement: SSR / no-JS / reduced-motion / above-the-fold paths
  all render the list visible. The component only arms (hides) items when JS
  confirms we're below the fold AND motion isn't reduced.
*/
// Bottom inset for the trigger line — the observer fires when the list crosses
// this far up the viewport, and the mount-time "already visible?" guard uses
// the SAME line. They must match: if the guard bailed at the full viewport
// height (100%) while the observer triggered at 82%, a list peeking into the
// bottom 18% at load would bail (render static) yet never reach the observer's
// line — a dead zone. ComoAjuda sits right under the hero and lands there.
const TRIGGER_BOTTOM_INSET = 0.18;

export function CascadeReveal({ className, as: Tag = "ul", children }: Props) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggerLine = window.innerHeight * (1 - TRIGGER_BOTTOM_INSET);
    const rect = el.getBoundingClientRect();
    const inView = rect.top < triggerLine && rect.bottom > 0;
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
