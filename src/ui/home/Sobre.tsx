import Link from "next/link";
import { FALLBACK_SOBRE, type SobreContent } from "@/lib/home-content-types";
import { SITE_META } from "@/lib/home-data";
import { HandmadeUnderline } from "@/ui/home/HandmadeUnderline";
import { IllustrationSlot } from "@/ui/home/IllustrationSlot";
import { SobreRichText } from "@/ui/home/SobreRichText";

/*
  Renders bold-marked text from the fallback paragraphs — the source uses
  **...** for emphasis on the credentials. Simple inline parser, not full
  markdown. Used only when CMS body is absent (fallback path).
*/
function withEmphasis(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type SobreProps = {
  content?: SobreContent;
  siteName?: string;
};

export function Sobre({ content = FALLBACK_SOBRE, siteName = SITE_META.name }: SobreProps = {}) {
  return (
    <section id="sobre" aria-labelledby="sobre-heading" className="py-[var(--space-3xl)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Off-grid asymmetric divider — the brief calls for one carefully placed handmade gesture. */}
        <div className="mb-[var(--space-2xl)] deck-divider" aria-hidden>
          <span>sobre</span>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
          <div className="space-y-[var(--space-lg)] lg:col-span-4">
            <h2
              id="sobre-heading"
              className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.1] tracking-[-0.015em] text-ink"
            >
              <HandmadeUnderline>{siteName}</HandmadeUnderline>
            </h2>

            {/* Atmospheric illustration — environment / books / hands per brief.
                Tighter aspect than the hero portrait, so it reads as a
                companion piece rather than a duplicate. */}
            <div className="w-full max-w-[320px] lg:max-w-none">
              <IllustrationSlot
                concept="Mesa do consultório — caderno aberto, caneta, copo d'água, livro de cabeça para baixo. Detalhe, não cena."
                shape="portrait"
                className="w-full"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="max-w-[60ch] text-[length:var(--text-lg)] leading-relaxed text-ink-soft">
              {content.intro}
            </p>

            <div className="mt-[var(--space-lg)] max-w-[64ch] space-y-[var(--space-md)] text-[length:var(--text-base)] leading-[1.7] text-ink-soft">
              {content.body ? (
                <SobreRichText data={content.body} />
              ) : (
                content.paragraphs.map((p, i) => <p key={i}>{withEmphasis(p)}</p>)
              )}
            </div>

            <p className="mt-[var(--space-lg)]">
              <Link
                href="/sobre"
                prefetch
                className="inline-flex items-center gap-2 text-sm text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
              >
                {content.ctaLabel}
                <span aria-hidden className="font-display">
                  →
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
