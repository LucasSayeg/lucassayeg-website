import { FALLBACK_SOBRE, type SobreContent } from "@/lib/home-content-types";
import { SITE_META } from "@/lib/home-data";
import { IllustrationSlot } from "@/ui/components/IllustrationSlot";
import { PageContainer } from "@/ui/components/PageContainer";
import { Section } from "@/ui/components/Section";
import { SectionHeading } from "@/ui/components/SectionHeading";
import { UnderlineLink } from "@/ui/components/UnderlineLink";
import { DeckDivider } from "@/ui/home/DeckDivider";
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
        {/* Off-grid asymmetric divider — hairlines draw outward from the
            label on scroll (see DeckDivider / .deck-divider). */}
        <DeckDivider label="sobre" className="mb-[var(--space-2xl)]" />

        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
          <div className="space-y-[var(--space-lg)] lg:col-span-4">
            <SectionHeading id="sobre-heading">
              <HandmadeUnderline>{siteName}</HandmadeUnderline>
            </SectionHeading>

            {/* Atmospheric illustration — environment / books / hands per brief.
                Tighter aspect than the hero portrait, so it reads as a
                companion piece rather than a duplicate.

                Matted on a deep-ink plate: a contained rectangle offset behind
                the photo so it peeks out lower-right, like a print tipped onto a
                dark mat. The plate is decorative (aria-hidden) and sits behind
                the photo via the wrapper's own isolate. */}
            <div className="portrait-frame relative isolate w-full max-w-[320px] lg:max-w-none">
              <div aria-hidden className="portrait-plate" />
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
