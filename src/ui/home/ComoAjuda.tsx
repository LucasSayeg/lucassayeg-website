import { FALLBACK_COMO_AJUDA, type ComoAjudaContent } from "@/lib/home-content-types";
import { PageContainer } from "@/ui/components/PageContainer";
import { Reveal } from "@/ui/components/Reveal";
import { Section } from "@/ui/components/Section";
import { SectionHeading } from "@/ui/components/SectionHeading";

type ComoAjudaProps = {
  content?: ComoAjudaContent;
};

export function ComoAjuda({ content = FALLBACK_COMO_AJUDA }: ComoAjudaProps = {}) {
  if (content.items.length === 0) return null;
  return (
    <Section id="como-ajuda" className="relative isolate">
      <PageContainer className="relative">
        <SectionHeading id="como-ajuda-heading" className="mb-[var(--space-2xl)]">
          Como a terapia pode ajudar.
        </SectionHeading>

        <ol className="grid grid-cols-1 gap-x-[var(--space-2xl)] gap-y-[var(--space-lg)] md:grid-cols-2">
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

        {/* Editorial colophon — § flanked by hairlines with end-caps. Dips
            across the ComoAjuda→Sobre seam (translate ≤ ½ of Sobre's top pad,
            so it never collides with Sobre's first content); degrades in-flow
            on mobile. Static transform → reduced-motion-safe. */}
        <div
          aria-hidden
          className="relative z-10 mt-[var(--space-2xl)] flex translate-y-[2.5rem] items-center justify-center gap-[var(--space-sm)] text-paper-deep max-md:translate-y-0"
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
      </PageContainer>
    </Section>
  );
}
