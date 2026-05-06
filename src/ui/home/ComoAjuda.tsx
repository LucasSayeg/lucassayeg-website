import { FALLBACK_COMO_AJUDA, type ComoAjudaContent } from "@/lib/home-content-types";
import { Reveal } from "@/ui/home/Reveal";

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
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--space-md)] gap-y-[var(--space-lg)] md:grid-cols-12">
          <h2
            id="como-ajuda-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink md:col-span-7"
          >
            Como a terapia pode ajudar.
          </h2>

          <div className="md:col-span-5 md:pt-2">
            <p className="font-display text-[length:var(--text-lg)] italic leading-[1.45] text-ink-quiet md:max-w-[34ch]">
              {content.intro}
            </p>
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-x-[var(--space-2xl)] gap-y-[var(--space-xl)] md:grid-cols-2">
          {content.items.map((item, i) => (
            <Reveal key={item.title} as="li" index={i % 3}>
              <article className="grid grid-cols-[auto_1fr] items-baseline gap-x-[var(--space-md)]">
                <span
                  aria-hidden
                  className="nums-old-style font-display text-[length:var(--text-2xl)] leading-none text-ink-faint"
                  style={{ fontVariantNumeric: "oldstyle-nums" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[length:var(--text-xl)] font-medium leading-[1.18] tracking-[-0.005em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-[var(--space-2xs)] max-w-[58ch] text-[length:var(--text-base)] leading-[1.55] text-ink-soft">
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
