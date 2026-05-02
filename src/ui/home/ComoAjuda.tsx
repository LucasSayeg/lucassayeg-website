import { FALLBACK_COMO_AJUDA, type ComoAjudaContent } from "@/lib/home-content-types";
import { MarkedWord } from "@/ui/components/MarkedWord";
import { RevealStagger } from "@/ui/home/RevealStagger";

/*
  "Como a terapia pode ajudar" — recognition field. Heading + opening prose
  on a 12-col grid, four labeled clusters of words wrapped as a flowing
  field, closing prose folded with the practice's mechanisms, then the §
  colophon. The section's metaphor (columns of lived terms — what one
  notices, before explaining) is enacted by the marked-word clusters
  themselves; the right margin is left as deliberate silence. No
  interaction: the section just is what it is, leaving the FAQ accordion
  below as the page's only disclosure pattern.

  Italic-display use is rationed here: the opening pull-line keeps it (one
  per section, per the typeset brief); the cluster labels, the words
  themselves, and the closing prose run upright so the italic never reads
  as a default body voice. The § colophon keeps italic — it's a glyph, not
  prose.
*/

type ComoAjudaProps = {
  content?: ComoAjudaContent;
};

export function ComoAjuda({ content = FALLBACK_COMO_AJUDA }: ComoAjudaProps = {}) {
  return (
    <section
      id="como-ajuda"
      aria-labelledby="como-ajuda-heading"
      className="relative bg-paper-soft/60 py-[var(--space-3xl)]"
    >
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-md)] md:grid-cols-12">
          <h2
            id="como-ajuda-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink md:col-span-7"
          >
            Como a terapia pode ajudar.
          </h2>

          <div className="md:col-span-5 md:pt-3">
            <p className="font-display text-[length:var(--text-lg)] italic leading-[1.45] text-ink-quiet md:max-w-[34ch]">
              {content.intro}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-xl)] md:grid-cols-12">
          <RevealStagger className="space-y-[var(--space-2xl)] md:col-span-8 md:col-start-1 lg:col-span-7 lg:col-start-2">
            {content.groups.map((group, i) => (
              <section key={group.label} aria-labelledby={`cluster-label-${i}`}>
                <h3
                  id={`cluster-label-${i}`}
                  className="mb-[var(--space-md)] text-[0.78rem] font-normal uppercase leading-none tracking-[0.22em] text-ink-quiet"
                >
                  {group.label}
                </h3>
                <ul className="flex list-none flex-wrap gap-x-[var(--space-sm)] gap-y-[var(--space-xs)] p-0">
                  {group.words.map((word) => (
                    <li key={word}>
                      <MarkedWord topic={word} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </RevealStagger>
        </div>

        <p className="mx-auto mt-[var(--space-2xl)] max-w-[52ch] text-center font-display text-[length:var(--text-lg)] leading-[1.55] text-ink-soft">
          {content.closing}
        </p>

        {/* Editorial colophon — § flanked by hairlines with end-caps. */}
        <div
          aria-hidden
          className="mt-[var(--space-2xl)] flex items-center justify-center gap-[var(--space-sm)] text-paper-deep"
        >
          <span className="relative inline-block h-px w-[72px] bg-current sm:w-[96px] lg:w-[112px]">
            <span className="absolute left-0 top-1/2 block h-[9px] w-px -translate-y-1/2 bg-current" />
          </span>
          <span className="font-display text-[length:var(--text-xl)] italic leading-none text-ink-quiet">
            §
          </span>
          <span className="relative inline-block h-px w-[72px] bg-current sm:w-[96px] lg:w-[112px]">
            <span className="absolute right-0 top-1/2 block h-[9px] w-px -translate-y-1/2 bg-current" />
          </span>
        </div>
      </div>
    </section>
  );
}
