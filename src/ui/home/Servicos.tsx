import type { CSSProperties } from "react";
import { FALLBACK_SERVICOS, type ServicosContent } from "@/lib/home-content-types";
import { Eyebrow } from "@/ui/components/Eyebrow";
import { PageContainer } from "@/ui/components/PageContainer";
import { Section } from "@/ui/components/Section";
import { SectionHeading } from "@/ui/components/SectionHeading";
import { AreasReveal } from "@/ui/home/AreasReveal";

/*
  Two services — Psicoterapia (Clínica) + Orientação Profissional —
  rendered as an editorial cascade rather than two equal blocks.

  The earlier 50/50 grid read as "blocky": same-shape twin cards. Here,
  each service body is offset on the 12-col grid (one anchored left,
  one anchored right) so the eye steps down the page instead of
  ping-pong between mirrored columns. The Roman numeral (i. / ii.)
  stacks above the heading as a chapter mark — typography over
  ornament, per brief — keeping the numeral inside the body column so
  there are no orphan quadrants when the body wraps long.

  Imagery deliberately omitted: Sobre is the page's single illustrated
  anchor (its desk-detail brief is the strongest in the page). Serviços
  is the typographic anchor — numerals, headings, framing italic, the
  áreas list with hairlines do the visual work. ComoAjuda follows the
  same imageless pattern. The opposite-corner whitespace left by the
  asymmetric offset is intentional breathing room, not missing content.

  Áreas de escuta render as a stacked serif list with hairlines and a
  quiet disc marker — words first, scannable at a glance. The earlier
  chip cloud felt decorative next to the editorial heading; the list
  matches the page's typographic register.

  Motion: the áreas list is the only animated element in the section.
  AreasReveal observes the <ul> itself (not the parent article) with a
  generous bottom inset, so the cascade fires when the list is
  meaningfully in view rather than when the section first peeks in.
  Each item then fades + slides in horizontally with a per-item delay
  (--list-i × 80ms), 760ms ease-out-expo. SSR / no-JS / above-the-fold
  / reduced-motion paths render the list visible without animation.
*/
const NUMERALS = ["i.", "ii."] as const;

type ServicosProps = {
  content?: ServicosContent;
};

export function Servicos({ content = FALLBACK_SERVICOS }: ServicosProps = {}) {
  return (
    <Section id="servicos" className="border-t border-paper-deep bg-paper-soft/40">
      <PageContainer>
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-md)] md:grid-cols-12">
          <SectionHeading id="servicos-heading" className="md:col-span-7">
            Serviços.
          </SectionHeading>
          <p className="max-w-[34ch] text-[length:var(--text-base)] leading-[1.55] text-ink-quiet md:col-span-5 md:pt-3">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-[var(--space-2xl)]">
          {content.items.map((s, i) => {
            const isFirst = i === 0;
            return (
              <article
                key={s.id}
                className="grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-md)] md:grid-cols-12"
              >
                {/* Body — Service I anchors left (cols 1–8), Service II
                    shifts right (cols 5–12). The numeral lives at the top
                    of this column as a chapter mark, so heading and body
                    stay tied together regardless of how long the copy runs. */}
                <div
                  className={
                    isFirst ? "md:col-span-8 md:col-start-1" : "md:col-span-8 md:col-start-5"
                  }
                >
                  <span
                    aria-hidden
                    className="block font-display leading-[0.85] text-ink-faint"
                    style={{ fontSize: "clamp(3rem, 2rem + 2.5vw, 5rem)" }}
                  >
                    {NUMERALS[i % NUMERALS.length]}
                  </span>

                  <h3 className="mt-[var(--space-sm)] font-display text-[length:var(--text-2xl)] font-normal leading-[1.04] tracking-[-0.018em] text-ink">
                    {s.label}
                    <span className="mt-1 block font-display text-[length:var(--text-lg)] font-normal text-ink-quiet">
                      {s.sublabel}
                    </span>
                  </h3>

                  <p className="mt-[var(--space-md)] max-w-[58ch] font-display text-[length:var(--text-lg)] italic leading-[1.45] text-ink-soft">
                    {s.framing}
                  </p>

                  <Eyebrow className="mt-[var(--space-lg)]">Áreas de escuta</Eyebrow>

                  <AreasReveal className="mt-[var(--space-md)] max-w-[58ch] list-disc pl-[var(--space-md)] marker:text-ink-faint">
                    {s.areas.map((it, idx) => (
                      <li
                        key={it}
                        style={{ ["--list-i" as string]: idx } as CSSProperties}
                        className={`py-[var(--space-xs)] font-display text-[length:var(--text-lg)] font-normal leading-[1.2] text-ink ${
                          idx < s.areas.length - 1 ? "border-b border-paper-deep" : ""
                        }`}
                      >
                        {it}
                      </li>
                    ))}
                  </AreasReveal>
                </div>
              </article>
            );
          })}
        </div>
      </PageContainer>
    </Section>
  );
}
