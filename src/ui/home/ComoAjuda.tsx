import { COMO_AJUDA } from "@/ui/home/data";
import { Reveal } from "@/ui/home/Reveal";

/*
  "Como a terapia pode ajudar" — recognition field. Heading + opening prose
  on a 12-col grid, four labeled clusters of words wrapped as a flowing
  field, closing prose folded with the practice's mechanisms, then the §
  colophon. No interaction: the section just is what it is, leaving the
  FAQ accordion below as the page's only disclosure pattern.
*/
export function ComoAjuda() {
  return (
    <section
      id="como-ajuda"
      aria-labelledby="como-ajuda-heading"
      className="relative bg-paper-soft/60 py-[var(--space-3xl)]"
    >
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
        <Reveal className="mb-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--space-md)] gap-y-[var(--space-lg)] md:grid-cols-12">
          <h2
            id="como-ajuda-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink md:col-span-7"
          >
            Como a terapia pode ajudar.
          </h2>

          <div className="md:col-span-5 md:pt-2">
            <p className="font-display text-[length:var(--text-lg)] italic leading-[1.45] text-ink-quiet md:max-w-[34ch]">
              {COMO_AJUDA.intro}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto max-w-[920px] space-y-[var(--space-2xl)]">
          {COMO_AJUDA.groups.map((group, i) => (
            <Reveal
              key={group.label}
              as="section"
              index={i % 3}
              aria-labelledby={`cluster-label-${i}`}
            >
              <h3
                id={`cluster-label-${i}`}
                className="mb-[var(--space-md)] font-display text-[length:var(--text-sm)] font-normal italic leading-none tracking-[0.01em] text-ink-quiet"
              >
                {group.label}
              </h3>
              <ul className="flex list-none flex-wrap gap-x-[clamp(1.5rem,3.5vw,2.75rem)] gap-y-[var(--space-2xs)] p-0">
                {group.words.map((word) => (
                  <li
                    key={word}
                    className="font-display text-[length:var(--text-xl)] font-normal italic leading-[1.7] text-ink-soft"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-[var(--space-2xl)]">
          <p className="mx-auto max-w-[52ch] text-center font-display text-[length:var(--text-lg)] italic leading-[1.55] text-ink-soft">
            {COMO_AJUDA.closing}
          </p>
        </Reveal>

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
