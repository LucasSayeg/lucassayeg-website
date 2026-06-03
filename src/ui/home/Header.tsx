"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type SiteInfoContent } from "@/lib/home-content-types";
import { FALLBACK_SITE_INFO } from "@/lib/home-content-types";
import { NAV_LINKS, WHATSAPP_HREF } from "@/lib/home-data";
import { Eyebrow } from "@/ui/components/Eyebrow";
import { PageContainer } from "@/ui/components/PageContainer";
import { SiteMark } from "@/ui/components/SiteMark";
import { WhatsappCta } from "@/ui/components/WhatsappCta";

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
  const pathname = usePathname();
  // Home owns the section anchors. On any other route the nav links must
  // navigate back to "/#anchor" — otherwise they scroll to nothing.
  const isHome = pathname === "/";
  const resolveAnchor = React.useCallback(
    (href: string) => (isHome || !href.startsWith("#") ? href : `/${href}`),
    [isHome],
  );

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
    if (!isHome) {
      setActiveHash("");
      return;
    }
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
  }, [navLinks, isHome]);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    // Off-home: let the browser handle the navigation back to "/#anchor".
    if (!isHome) return;
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
      className="sticky top-0 z-40 transition-[box-shadow] duration-300 ease-[var(--ease-out-quart)] data-[scrolled=true]:shadow-[0_1px_0_var(--paper-deep),0_8px_24px_-22px_oklch(0.20_0.02_45/0.45)]"
    >
      {/* Masthead plate — the nameplate sits on a full-bleed navy ink ground,
          a literary-journal masthead. `on-dark` flips focus-visible outlines
          to bone so keyboard focus stays visible on the plate. */}
      <div className="on-dark bg-masthead">
        <PageContainer>
          {/* Top row — brand + slogan */}
          <div
            className="flex items-start justify-between pt-5 transition-[padding] duration-300 ease-[var(--ease-out-quart)]"
            style={{ paddingBottom: scrolled ? "0.5rem" : "0.875rem" }}
          >
            <div>
              <a
                href={resolveAnchor("#top")}
                onClick={(e) => handleAnchor(e, "#top")}
                className="group flex items-center gap-3"
              >
                {siteInfo.logo ? (
                  // Printer's mark in bone — same on-dark ink as the name.
                  <SiteMark logo={siteInfo.logo} className="h-9 bg-[var(--ink-on-dark)] sm:h-10" />
                ) : null}
                <span className="block">
                  <span className="block font-display text-[1.4rem] leading-[0.95] tracking-[-0.012em] text-[var(--ink-on-dark)] sm:text-[1.65rem]">
                    {siteInfo.name}
                  </span>
                  {/* With the monogram present the shortMark eyebrow would make
                      the brand block say the name three times — the mark absorbs
                      its job. Typographic fallback keeps it. */}
                  {siteInfo.logo ? null : (
                    <Eyebrow
                      as="span"
                      size="sm"
                      className="mt-1 block text-[var(--ink-on-dark-quiet)]"
                    >
                      {siteInfo.shortMark}
                    </Eyebrow>
                  )}
                </span>
              </a>
              {/* Mobile drops the slogan from the sticky bar — the Hero carries it
                  immediately below, so repeating it here only lengthened the
                  header and doubled the first-screen message. Desktop keeps the
                  top-right slogan (it has the horizontal room). */}
            </div>
            <p className="hidden max-w-[26ch] text-right font-display text-base leading-snug text-[var(--ink-on-dark-quiet)] md:block">
              {siteInfo.slogan}
            </p>
          </div>
        </PageContainer>
      </div>

      {/* Press rule — the navy plate itself is the thick stroke, so only the
          thin echo remains: a paper slit, then a 1px accent hairline. */}
      <div aria-hidden className="h-[4px] border-b border-accent bg-paper" />

      <div className="bg-paper">
        <PageContainer>
          {/* Bottom row — nav + CTA */}
          <div className="flex items-center justify-between gap-4 py-3">
            <nav aria-label="Seções da página" className="hidden md:block">
              <ul className="flex items-center gap-7 text-sm text-ink-soft">
                {navLinks.map((l) => {
                  const isActive = activeHash === l.href;
                  return (
                    <li key={l.href}>
                      <a
                        href={resolveAnchor(l.href)}
                        onClick={(e) => handleAnchor(e, l.href)}
                        aria-current={isActive ? "location" : undefined}
                        className="relative inline-block py-1 transition-colors hover:text-ink"
                        data-active={isActive}
                      >
                        {l.label}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-[var(--ease-out-quart)]"
                          style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2 md:ml-auto">
              {/* On mobile the Hero owns the first CTA, so the header WhatsApp
                stays hidden until the visitor scrolls past it — then it returns
                as the persistent affordance. Always present from md up. */}
              <WhatsappCta
                href={whatsappHref}
                size="sm"
                variant="solid"
                ariaLabel="Iniciar conversa no WhatsApp"
                className={scrolled ? undefined : "hidden md:inline-flex"}
              >
                WhatsApp
              </WhatsappCta>

              <button
                type="button"
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-paper-deep text-ink-soft transition-colors hover:bg-paper-soft md:hidden"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <div
            id="mobile-nav"
            data-open={mobileOpen}
            inert={!mobileOpen || undefined}
            className="accordion-panel md:hidden"
          >
            <div className="accordion-panel-inner">
              <ul className="flex flex-col divide-y divide-paper-deep/50 border-t border-paper-deep pb-2 pt-1 text-base">
                {navLinks.map((l) => {
                  // Same navy "active" signal the desktop nav uses — so the
                  // current section is marked on mobile too, not just desktop.
                  const isActive = activeHash === l.href;
                  return (
                    <li key={l.href}>
                      <a
                        href={resolveAnchor(l.href)}
                        onClick={(e) => handleAnchor(e, l.href)}
                        aria-current={isActive ? "location" : undefined}
                        data-active={isActive}
                        className={`block px-2 py-3 transition-colors hover:text-ink ${
                          isActive ? "text-accent" : "text-ink-soft"
                        }`}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </PageContainer>
      </div>
    </header>
  );
}
