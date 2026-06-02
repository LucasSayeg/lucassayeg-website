import { FALLBACK_SOBRE, type SobreContent } from "@/lib/home-content-types";
import { SITE_META } from "@/lib/home-data";
import { IllustrationSlot } from "@/ui/components/IllustrationSlot";
import { PageContainer } from "@/ui/components/PageContainer";
import { Section } from "@/ui/components/Section";
import { SectionHeading } from "@/ui/components/SectionHeading";
import { UnderlineLink } from "@/ui/components/UnderlineLink";
import { HandmadeUnderline } from "@/ui/home/HandmadeUnderline";
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
        <strong key={i} className="font-bold text-ink">
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
    <Section id="sobre" className="relative isolate [overflow:clip]">
      <PageContainer>
        {/* Off-grid asymmetric divider — the brief calls for one carefully placed handmade gesture. */}
        <div className="mb-[var(--space-2xl)] deck-divider" aria-hidden>
          <span>sobre</span>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
          <div className="relative space-y-[var(--space-lg)] lg:col-span-4">
            {/* Asymmetric tone field — deeper clay hugging the portrait side.
                Its right edge lands in the column gutter (never cutting the
                text); the left bleeds off the viewport edge. Decorative; sits
                behind content. On mobile this column is full-width, so the field
                degrades to a clean full-width deeper band. */}
            <div aria-hidden className="tone-field-left" />
            <SectionHeading id="sobre-heading">
              <HandmadeUnderline>{siteName}</HandmadeUnderline>
            </SectionHeading>

            {/* Atmospheric illustration — environment / books / hands per brief.
                Tighter aspect than the hero portrait, so it reads as a
                companion piece rather than a duplicate. */}
            <div className="w-full max-w-[320px] lg:max-w-none">
              <IllustrationSlot
                concept="Mesa do consultório — caderno aberto, caneta, copo d'água, livro de cabeça para baixo. Detalhe, não cena."
                shape="portrait"
                src={content.illustration?.url}
                alt={content.illustration?.alt}
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
              <UnderlineLink
                href="/sobre"
                internal
                prefetch
                className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
              >
                {content.ctaLabel}
                <span aria-hidden className="font-display">
                  →
                </span>
              </UnderlineLink>
            </p>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
