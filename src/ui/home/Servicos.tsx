import { FALLBACK_SERVICOS, type ServicosContent } from "@/lib/home-content-types";
import { MarkedWord } from "@/ui/components/MarkedWord";
import { IllustrationSlot } from "@/ui/home/IllustrationSlot";

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

  An editorial illustration slot sits opposite the body on each
  article — the service's metaphor as a small considered drawing,
  marginal rather than central. The body/slot swap is what does the
  page-stepping; the type does the rest.

  Topic items are laid out as a vertical em-dash list so each area of
  practice is legible at a glance. The earlier inline-punctuated single
  line obscured them.
*/
const NUMERALS = ["i.", "ii."] as const;

const ILLUSTRATION_BY_SERVICE: Record<string, string> = {
  clinica:
    "A sala — uma cadeira, uma janela, o tempo que passa entre as palavras. Interior lento, hatching contido.",
  orientacao: "A bússola sobre a mesa, virada na direção certa — instrumento, não jornada.",
};

type ServicosProps = {
  content?: ServicosContent;
};

export function Servicos({ content = FALLBACK_SERVICOS }: ServicosProps = {}) {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="border-t border-paper-deep bg-paper-soft/40 py-[var(--space-3xl)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-md)] md:grid-cols-12">
          <h2
            id="servicos-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink md:col-span-7"
          >
            Serviços.
          </h2>
          <p className="max-w-[34ch] text-[length:var(--text-base)] leading-[1.55] text-ink-quiet md:col-span-5 md:pt-3">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-[var(--space-2xl)]">
          {content.items.map((s, i) => {
            const isFirst = i === 0;
            const illustrationConcept = ILLUSTRATION_BY_SERVICE[s.id];
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

                  <p className="mt-[var(--space-lg)] text-[0.78rem] font-normal uppercase leading-none tracking-[0.22em] text-ink-quiet">
                    Áreas de escuta
                  </p>

                  <ul className="mt-[var(--space-sm)] flex max-w-[58ch] list-none flex-wrap gap-x-[var(--space-xs)] gap-y-[var(--space-2xs)] p-0">
                    {s.areas.map((it) => (
                      <li key={it}>
                        <MarkedWord topic={it} size="base" />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Illustration — opposite the body block. Service I drawing
                    sits far-right (cols 10–12); Service II drawing sits
                    far-left (cols 1–3) and is pinned to row 1 so it sits
                    beside the heading instead of wrapping below. Decorative,
                    aria-hidden by the component itself. */}
                {illustrationConcept ? (
                  <div
                    className={
                      isFirst
                        ? "hidden md:col-span-3 md:col-start-10 md:flex md:justify-end md:pt-[var(--space-md)]"
                        : "hidden md:col-span-3 md:col-start-1 md:row-start-1 md:flex md:justify-start md:pt-[var(--space-md)]"
                    }
                  >
                    <IllustrationSlot concept={illustrationConcept} shape="service" />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
