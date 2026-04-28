import { FALLBACK_SERVICOS, type ServicosContent } from "@/lib/home-content-types";

/*
  Two services — Psicoterapia (Clínica) + Orientação Profissional —
  rendered as a diagonal editorial cascade rather than two equal blocks.

  The earlier 50/50 grid read as "blocky": same-shape twin cards. Here,
  each service is offset on the 12-col grid (one anchored left, one
  anchored right) so the eye steps down the page instead of ping-pong
  between mirrored columns. Display Roman numerals (i. / ii.) carry the
  graphic weight that an icon would otherwise carry — typography over
  ornament, per brief.

  Topic items are laid out as a vertical em-dash list so each area of
  practice is legible at a glance. The earlier inline-punctuated single
  line obscured them.
*/
const NUMERALS = ["i.", "ii."] as const;

type ServicosProps = { content?: ServicosContent };

export function Servicos({ content = FALLBACK_SERVICOS }: ServicosProps = {}) {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="border-t border-paper-deep bg-paper-soft/40 py-[var(--space-3xl)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mb-[var(--space-2xl)] flex flex-wrap items-end justify-between gap-x-[var(--space-lg)] gap-y-[var(--space-md)]">
          <h2
            id="servicos-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink"
          >
            Serviços.
          </h2>
          <p className="max-w-[34ch] font-display text-[length:var(--text-base)] italic leading-[1.55] text-ink-quiet">
            Dois trabalhos próximos, com escutas distintas. O primeiro contato ajuda a decidir qual
            faz mais sentido para você.
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
                {/* Roman numeral — display italic, oversized, as graphic anchor.
                    Service I sits on the far-left; Service II on the far-right —
                    the diagonal that breaks the symmetry of the old 50/50 grid. */}
                <div
                  className={
                    isFirst
                      ? "flex items-start md:col-span-2 md:col-start-1 md:justify-start"
                      : "order-first flex items-start md:order-none md:col-span-2 md:col-start-11 md:justify-end"
                  }
                >
                  <span
                    aria-hidden
                    className="font-display italic leading-[0.85] text-ink-faint"
                    style={{ fontSize: "clamp(3.75rem, 2.5rem + 4vw, 6.5rem)" }}
                  >
                    {NUMERALS[i % NUMERALS.length]}
                  </span>
                </div>

                {/* Body — Service I anchors left, Service II shifts right.
                    The cascade does the asymmetry; the type does the rest. */}
                <div
                  className={
                    isFirst ? "md:col-span-7 md:col-start-3" : "md:col-span-7 md:col-start-4"
                  }
                >
                  <h3 className="font-display text-[length:var(--text-2xl)] font-normal leading-[1.04] tracking-[-0.018em] text-ink">
                    {s.label}
                    <span className="mt-1 block font-display text-[length:var(--text-lg)] font-normal italic text-ink-quiet">
                      {s.sublabel}
                    </span>
                  </h3>

                  <p className="mt-[var(--space-md)] max-w-[58ch] font-display text-[length:var(--text-lg)] italic leading-[1.45] text-ink-soft">
                    {s.framing}
                  </p>

                  <p className="mt-[var(--space-lg)] text-[0.78rem] uppercase tracking-[0.22em] text-ink-quiet">
                    Áreas de escuta
                  </p>

                  <ul className="mt-[var(--space-2xs)] max-w-[58ch] space-y-[var(--space-3xs)] text-[length:var(--text-base)] leading-[1.55] text-ink-soft">
                    {s.areas.map((it) => (
                      <li key={it} className="grid grid-cols-[1.25rem_1fr] items-baseline">
                        <span aria-hidden className="text-ink-faint">
                          —
                        </span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
