"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { type SiteInfoContent } from "@/lib/home-content-types";
import { FALLBACK_SITE_INFO } from "@/lib/home-content-types";
import { NAV_LINKS, WHATSAPP_HREF } from "@/lib/home-data";

/*
  Sticky header with a single scroll-threshold transition. The visual
  hierarchy follows Lucas's mock: logo + "Lucas S." stacked top-left,
  slogan justified top-right, nav + WhatsApp pill on a second row.
*/

export type HeaderNavLink = { href: string; label: string };

type HeaderProps = {
  navLinks?: ReadonlyArray<HeaderNavLink>;
  siteInfo?: SiteInfoContent;
  whatsappHref?: string;
};

export function Header({
  navLinks = NAV_LINKS,
  siteInfo = FALLBACK_SITE_INFO,
  whatsappHref = WHATSAPP_HREF,
}: HeaderProps = {}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeHash, setActiveHash] = React.useState<string>("");

  // Single-threshold scroll state — flips at ~hero height.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 96);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape — and return focus to the toggle so
  // keyboard users don't lose their place.
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-nav"]')?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Active section observer — tracks the topmost section currently in the
  // middle band of the viewport. Falls back to "" when none qualify so the
  // active state clears past the last section instead of sticking.
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((n): n is Element => !!n);
    if (sections.length === 0) return;
    const visible = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const topmost = sections.find((s) => visible.has(s));
        setActiveHash(topmost ? `#${topmost.id}` : "");
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [navLinks]);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", href);
    setMobileOpen(false);
    // After scrolling to the contact section, focus its first field so
    // keyboard users land directly on the form.
    if (href === "#contato") {
      setTimeout(
        () => {
          const firstField = document.querySelector<HTMLInputElement>(
            "#contato input, #contato textarea",
          );
          firstField?.focus();
        },
        reduced ? 0 : 600,
      );
    }
  };

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 bg-paper/85 backdrop-blur-[6px] transition-[box-shadow,padding] duration-300 ease-[var(--ease-out-quart)] data-[scrolled=true]:shadow-[0_1px_0_var(--paper-deep),0_8px_24px_-22px_oklch(0.20_0.02_45/0.45)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Top row — logo + slogan */}
        <div
          className="flex items-start justify-between pt-5 transition-[padding] duration-300 ease-[var(--ease-out-quart)]"
          style={{ paddingBottom: scrolled ? "0.5rem" : "0.875rem" }}
        >
          <a href="#top" onClick={(e) => handleAnchor(e, "#top")} className="group block">
            <span className="block font-display text-[1.4rem] leading-[0.95] tracking-[-0.012em] text-ink sm:text-[1.65rem]">
              {siteInfo.name}
            </span>
            <span className="mt-1 block text-[0.72rem] uppercase tracking-[0.22em] text-ink-quiet">
              {siteInfo.shortMark}
            </span>
          </a>
          <p className="hidden max-w-[26ch] text-right font-display text-sm leading-snug text-ink-soft md:block">
            {siteInfo.slogan}
          </p>
        </div>

        {/* Hairline */}
        <div
          aria-hidden
          className="h-px bg-paper-deep transition-opacity duration-300"
          style={{ opacity: scrolled ? 0.6 : 1 }}
        />

        {/* Bottom row — nav + CTA */}
        <div className="flex items-center justify-between gap-4 py-3">
          <nav aria-label="Seções da página" className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm text-ink-soft">
              {navLinks.map((l) => {
                const isActive = activeHash === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => handleAnchor(e, l.href)}
                      aria-current={isActive ? "true" : undefined}
                      className="relative inline-block py-1 transition-colors hover:text-ink"
                      data-active={isActive}
                    >
                      {l.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 h-px bg-accent transition-[width] duration-300 ease-[var(--ease-out-quart)]"
                        style={{ width: isActive ? "100%" : "0" }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:ml-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Iniciar conversa no WhatsApp"
              className="inline-flex items-center gap-2 rounded-sm border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-accent-deep hover:border-accent-deep"
            >
              WhatsApp
            </a>

            <button
              type="button"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-paper-deep text-ink-soft transition-colors hover:bg-paper-soft md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div id="mobile-nav" data-open={mobileOpen} className="accordion-panel md:hidden">
          <div className="accordion-panel-inner">
            <ul className="flex flex-col gap-1 border-t border-paper-deep pb-4 pt-2 text-base">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    className="block rounded-sm px-2 py-3 text-ink-soft hover:bg-paper-soft hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
