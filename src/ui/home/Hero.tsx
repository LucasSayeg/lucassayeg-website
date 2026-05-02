import { FALLBACK_HERO, type HeroContent } from "@/lib/home-content-types";
import { WHATSAPP_HREF } from "@/lib/home-data";
import { MarkedWord } from "@/ui/components/MarkedWord";
import { WhatsappIcon } from "@/ui/components/WhatsappIcon";
import { IllustrationSlot } from "@/ui/home/IllustrationSlot";

/*
  Hero — question heading + reassurance + portrait + CTA + modality strip.
  The question owns the page; the portrait sits alongside as a human anchor
  (Lucas-confirmed: visitor should meet a face, not just a wall of type).

  CTA hierarchy (single-primary): WhatsApp is the dominant action. The form
  anchor and "conheça meu trabalho" sit as secondary/tertiary text links so
  they don't compete for the primary slot.
*/

type HeroProps = {
  content?: HeroContent;
  whatsappHref?: string;
};

export function Hero({ content = FALLBACK_HERO, whatsappHref = WHATSAPP_HREF }: HeroProps = {}) {
  const quickPickTopics = content.quickPickTopics.slice(0, 6);
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative pb-[var(--space-2xl)] pt-[var(--space-md)] sm:pt-[var(--space-xl)] lg:pt-[var(--space-2xl)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-[var(--space-xl)] lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
          <div className="lg:col-span-7 lg:pt-[var(--space-sm)]">
            <p className="mb-[var(--space-md)] flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.24em] text-ink-quiet">
              <span aria-hidden className="inline-block h-px w-8 bg-ink-faint" />
              Psicoterapia &amp; orientação profissional
            </p>

            <h1
              id="hero-heading"
              className="max-w-[18ch] font-display text-[length:var(--text-3xl)] font-normal leading-[1.05] tracking-[-0.018em] text-ink sm:max-w-[20ch] sm:text-[length:var(--text-4xl)] lg:max-w-[18ch]"
            >
              {content.heading}
            </h1>

            <p className="mt-[var(--space-lg)] max-w-[42ch] font-display text-[length:var(--text-lg)] leading-relaxed text-ink-soft md:text-xl">
              {content.sub}
            </p>

            {quickPickTopics.length > 0 ? (
              <div className="mt-[var(--space-xl)]">
                <p className="mb-[var(--space-sm)] font-display text-[length:var(--text-base)] italic leading-[1.5] text-ink-quiet">
                  {content.quickPickIntro}
                </p>
                <ul
                  aria-label="Temas para começar uma conversa"
                  className="flex list-none flex-wrap gap-x-[var(--space-sm)] gap-y-[var(--space-xs)] p-0"
                >
                  {quickPickTopics.map((topic) => (
                    <li key={topic}>
                      <MarkedWord topic={topic} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-[var(--space-xl)] flex flex-wrap items-center gap-x-5 gap-y-3">
              {/* Primary — WhatsApp (the only solid CTA on the page) */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Iniciar conversa no WhatsApp"
                className="group inline-flex items-center gap-2.5 rounded-sm bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent-deep"
              >
                <WhatsappIcon size={16} />
                <span className="font-display text-base">{content.ctaWhatsapp}</span>
                <span
                  aria-hidden
                  className="font-display text-base text-paper-deep transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              {/* Secondary — form anchor, demoted to a strong text link */}
              <a
                href="#contato"
                className="group inline-flex items-baseline gap-2 text-sm text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
              >
                {content.cta}
                <span
                  aria-hidden
                  className="font-display transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              {/* Tertiary — alternative path for hesitant visitors */}
              <a
                href="#como-ajuda"
                className="text-sm text-ink-soft underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
              >
                Antes, conheça meu trabalho
              </a>
            </div>

            {/* Modality strip — equal weight on both modalities */}
            <div className="mt-[var(--space-2xl)] flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
              <span>{content.modalityOnline}</span>
              <span aria-hidden className="text-ink-faint">
                ·
              </span>
              <span>{content.modalityPresencial}</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[360px] lg:col-span-5 lg:mx-0 lg:mt-[var(--space-sm)] lg:max-w-none">
            <IllustrationSlot
              concept="Retrato editorial — figura sentada, três-quartos, livros ao fundo, luz lateral. Linha solta, hatching contido."
              shape="portrait"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
