import { FALLBACK_HERO, FALLBACK_SITE_INFO, type HeroContent } from "@/lib/home-content-types";
import { WHATSAPP_HREF } from "@/lib/home-data";
import { TopicChip } from "@/ui/components/TopicChip";
import { WhatsappIcon } from "@/ui/components/WhatsappIcon";
import { IllustrationSlot } from "@/ui/home/IllustrationSlot";

/*
  Hero — slogan-subhead heading + reassurance + portrait + single CTA + modality strip.
  The question owns the page; the portrait sits alongside as a human anchor
  (Lucas-confirmed: visitor should meet a face, not just a wall of type).

  CTA hierarchy: WhatsApp is the only inline action — text-link siblings were
  competing for the primary slot, so they're gone.
*/

type HeroProps = {
  content?: HeroContent;
  slogan?: string;
  whatsappHref?: string;
};

export function Hero({
  content = FALLBACK_HERO,
  slogan = FALLBACK_SITE_INFO.slogan,
  whatsappHref = WHATSAPP_HREF,
}: HeroProps = {}) {
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
            <h1
              id="hero-heading"
              className="max-w-[18ch] font-display text-[length:var(--text-3xl)] font-normal leading-[1.05] tracking-[-0.018em] text-ink sm:max-w-[20ch] sm:text-[length:var(--text-4xl)] lg:max-w-[18ch]"
            >
              {content.heading}
            </h1>

            <p className="mt-[var(--space-sm)] font-display text-[1.25rem] italic leading-[1.3] text-ink-soft">
              {slogan}
            </p>

            <p className="mt-[var(--space-lg)] max-w-[42ch] font-display text-[length:var(--text-lg)] leading-relaxed text-ink-soft md:text-xl">
              {content.sub}
            </p>

            {quickPickTopics.length > 0 ? (
              <div className="mt-[var(--space-xl)]">
                <ul
                  aria-label="Temas para começar uma conversa"
                  className="flex list-none flex-wrap gap-x-[var(--space-lg)] gap-y-[var(--space-md)] p-0"
                >
                  {quickPickTopics.map((topic) => (
                    <li key={topic}>
                      <TopicChip topic={topic} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-[var(--space-xl)]">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Iniciar conversa no WhatsApp"
                className="btn-primary group font-display"
              >
                <WhatsappIcon size={16} className="text-[#25D366]" />
                <span className="font-display text-base">{content.ctaWhatsapp}</span>
                <span
                  aria-hidden
                  className="font-display text-base text-paper-deep transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
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
