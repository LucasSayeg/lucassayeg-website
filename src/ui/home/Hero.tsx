import { HERO } from "@/ui/home/data";

/*
  Hero — portrait + question heading + reassurance + CTA + modality strip.
  Layout: portrait on the right at desktop, above the heading on mobile.
  No parallax, no Ken Burns, no hover effect on the portrait.
*/
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative pb-[var(--space-2xl)] pt-[var(--space-xl)] sm:pt-[var(--space-2xl)]"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-[var(--space-xl)] px-6 sm:px-8 lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
        {/* Words */}
        <div className="lg:col-span-7 lg:pt-[var(--space-lg)]">
          <p className="mb-[var(--space-md)] flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.24em] text-ink-quiet">
            <span aria-hidden className="inline-block h-px w-8 bg-ink-faint" />
            Psicoterapia &amp; orientação profissional
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[length:var(--text-4xl)] font-normal leading-[1.05] tracking-[-0.018em] text-ink"
          >
            {HERO.heading}
          </h1>

          <p className="mt-[var(--space-lg)] max-w-[42ch] font-display text-[length:var(--text-lg)] leading-relaxed text-ink-soft md:text-xl">
            {HERO.sub}
          </p>

          <div className="mt-[var(--space-xl)] flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="#contato"
              className="group inline-flex items-baseline gap-3 rounded-sm bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent-deep"
            >
              <span className="text-sm uppercase tracking-[0.18em]">{HERO.cta}</span>
              <span
                aria-hidden
                className="font-display text-base italic text-paper-deep transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#como-ajuda"
              className="text-sm text-ink-soft underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
            >
              Antes, conheça meu trabalho
            </a>
          </div>

          {/* Modality strip — online first, then presencial */}
          <div className="mt-[var(--space-2xl)] flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-quiet">
            <span className="font-display italic text-ink-soft">{HERO.modality.primary}</span>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span>{HERO.modality.secondary}</span>
          </div>
        </div>

        {/* Portrait — placeholder block until Lucas supplies the photograph */}
        <div className="order-first lg:order-none lg:col-span-5 lg:mt-[var(--space-md)]">
          <figure
            className="portrait-placeholder mx-auto hidden aspect-[3/4] w-full max-w-[420px] lg:flex lg:max-w-none"
            aria-label="Retrato de Lucas Sayeg (a substituir)"
          >
            <span className="portrait-placeholder__label">Retrato · a substituir</span>
          </figure>
        </div>
      </div>
    </section>
  );
}
