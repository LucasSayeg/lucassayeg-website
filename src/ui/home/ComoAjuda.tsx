import { COMO_AJUDA } from "@/ui/home/data";
import { Reveal } from "@/ui/home/Reveal";

/*
  "Como a terapia pode ajudar" — six numbered prose pairs.
  Typographic numerals, two columns at desktop, single column at mobile.
  No icons, no rounded card-frames. Hierarchy comes from type.
*/
export function ComoAjuda() {
  return (
    <section
      id="como-ajuda"
      aria-labelledby="como-ajuda-heading"
      className="bg-paper-soft/60 py-[var(--space-3xl)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-[var(--space-md)] md:grid-cols-12">
          <h2
            id="como-ajuda-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.08] tracking-[-0.015em] text-ink md:col-span-7"
          >
            Como a terapia pode ajudar.
          </h2>
          <p className="text-[length:var(--text-base)] leading-relaxed text-ink-quiet md:col-span-5 md:pt-3">
            Algumas das questões e movimentos para os quais este trabalho costuma fazer diferença.
          </p>
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
      </div>
    </section>
  );
}
