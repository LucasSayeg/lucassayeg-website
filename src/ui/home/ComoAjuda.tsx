import { COMO_AJUDA } from "@/ui/home/data";
import { Reveal } from "@/ui/home/Reveal";

/*
  "Como a terapia pode ajudar" — six numbered prose pairs.
  Typographic numerals, two columns at desktop, single column at mobile.
  No icons, no rounded card-frames. Hierarchy comes from type.

  One editorial line-drawing anchors the section opener — a single hand-
  drawn motif read as "knot becoming clear." Used once, deliberately
  off-grid, low-opacity so it punctuates the type instead of competing
  with it. The brief permits a single line-drawing per long section;
  this is that one.

  Section close: an editorial colophon — a classical section sign (§)
  set in display italic, flanked by hairline rules with vertical end-caps.
*/

/*
  ThreadMark — single continuous path. The eye traces a small loop on
  the left that unspools into a long horizontal stroke: from confusion
  to contour, in one gesture. Hand-feel comes from cubic Bezier handles
  that don't quite resolve symmetrically.
*/
function ThreadMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="presentation"
      className={className}
    >
      <path
        d="
          M 38 32
          C 36 27, 39 22, 44 23
          C 49 24, 50 30, 46 33
          C 42 36, 36 33, 35 28
          C 33 21, 38 13, 47 12
          C 60 11, 70 21, 76 32
          C 82 42, 95 44, 112 41
          C 138 37, 164 36, 192 38
          C 218 39, 244 39, 274 37
        "
      />
    </svg>
  );
}

export function ComoAjuda() {
  return (
    <section
      id="como-ajuda"
      aria-labelledby="como-ajuda-heading"
      className="relative bg-paper-soft/60 py-[var(--space-3xl)]"
    >
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--space-md)] gap-y-[var(--space-lg)] md:grid-cols-12">
          <h2
            id="como-ajuda-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink md:col-span-7"
          >
            Como a terapia pode ajudar.
          </h2>

          <div className="md:col-span-5 md:pt-2">
            <p className="font-display text-[length:var(--text-lg)] italic leading-[1.45] text-ink-quiet md:max-w-[34ch]">
              Algumas das questões e movimentos para os quais este trabalho costuma fazer diferença.
            </p>
            <ThreadMark className="mt-[var(--space-md)] w-full max-w-[280px] text-ink-faint opacity-80" />
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-x-[var(--space-2xl)] gap-y-[var(--space-xl)] md:grid-cols-2">
          {COMO_AJUDA.map((item, i) => (
            <Reveal key={item.title} as="li" index={i % 3}>
              <article className="grid grid-cols-[auto_1fr] items-baseline gap-x-[var(--space-md)]">
                <span
                  aria-hidden
                  className="nums-old-style font-display text-[length:var(--text-2xl)] leading-none text-ink-faint"
                  style={{ fontVariantNumeric: "oldstyle-nums" }}
                >
                  {i + 1}.
                </span>
                <div>
                  <h3 className="font-display text-[length:var(--text-xl)] font-medium leading-[1.18] tracking-[-0.005em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-[var(--space-2xs)] max-w-[58ch] text-[length:var(--text-base)] leading-[1.65] text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

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
