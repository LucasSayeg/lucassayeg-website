import Link from "next/link";
import type { Metadata } from "next";
import {
  getHomeLayout,
  getSiteInfo,
  getSobrePageContent,
  type SobrePageContent,
} from "@/lib/home-content";
import { ANCHOR_BY_KEY } from "@/lib/section-anchors";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { Footer } from "@/ui/home/Footer";
import { HandmadeUnderline } from "@/ui/home/HandmadeUnderline";
import { Header } from "@/ui/home/Header";
import { IllustrationSlot } from "@/ui/home/IllustrationSlot";
import { SobreRichText } from "@/ui/home/SobreRichText";
import { WhatsappIcon } from "@/ui/components/WhatsappIcon";

export async function generateMetadata(): Promise<Metadata> {
  const [siteInfo, content] = await Promise.all([getSiteInfo(), getSobrePageContent()]);
  return {
    title: { absolute: `Sobre — ${siteInfo.name}` },
    description: content.lede,
  };
}

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

function FormacaoBody({ content }: { content: SobrePageContent }) {
  if (content.body) return <SobreRichText data={content.body} />;
  return (
    <>
      {content.bodyParagraphs.map((p, i) => (
        <p key={i}>{withEmphasis(p)}</p>
      ))}
    </>
  );
}

export default async function SobrePage() {
  const [content, siteInfo, sections] = await Promise.all([
    getSobrePageContent(),
    getSiteInfo(),
    getHomeLayout(),
  ]);
  const whatsappHref = buildWhatsappHref(siteInfo.whatsappNumber, siteInfo.whatsappPrefill);
  const navLinks = sections
    .filter((s) => s.enabled && s.navLabel)
    .map((s) => ({ href: `#${ANCHOR_BY_KEY[s.key]}`, label: s.navLabel }));
  const portrait = siteInfo.portrait;

  return (
    <>
      <Header navLinks={navLinks} siteInfo={siteInfo} whatsappHref={whatsappHref} />
      <main id="main">
        {/* Band 1 — Identity + Formação merged */}
        <section
          aria-labelledby="sobre-page-heading"
          className="pb-[var(--space-2xl)] pt-[var(--space-2xl)] sm:pt-[var(--space-3xl)]"
        >
          <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
            <div className="grid grid-cols-1 items-start gap-[var(--space-xl)] lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
              <div className="lg:col-span-7">
                <h1
                  id="sobre-page-heading"
                  className="font-display text-[length:var(--text-4xl)] font-normal leading-[1.05] tracking-[-0.018em] text-ink"
                >
                  <HandmadeUnderline>{siteInfo.name}</HandmadeUnderline>
                </h1>

                <p className="mt-[var(--space-2xs)] font-display text-[length:var(--text-lg)] text-ink-soft">
                  {siteInfo.slogan}
                </p>

                <p className="mt-[var(--space-xl)] max-w-[60ch] font-display text-[length:var(--text-lg)] leading-relaxed text-ink-soft">
                  {content.lede}
                </p>

                <h2
                  id="formacao-heading"
                  className="mb-[var(--space-md)] mt-[var(--space-xl)] flex items-center gap-3 text-[0.78rem] font-normal uppercase tracking-[0.24em] text-ink-quiet"
                >
                  <span aria-hidden className="inline-block h-px w-8 bg-ink-faint" />
                  <span>Formação</span>
                </h2>

                <div className="max-w-[60ch] space-y-[var(--space-md)] text-[length:var(--text-base)] leading-[1.75] text-ink-soft">
                  <FormacaoBody content={content} />
                </div>

                <p className="mt-[var(--space-2xl)] font-display text-sm text-ink-quiet">
                  {siteInfo.crp}
                </p>
              </div>

              <div className="order-first mx-auto w-full max-w-[320px] lg:order-last lg:col-span-5 lg:mx-0 lg:max-w-none">
                <IllustrationSlot
                  concept="Retrato editorial — figura sentada, três-quartos, livros ao fundo, luz lateral. Linha solta, hatching contido."
                  shape="portrait"
                  src={portrait?.url}
                  alt={portrait?.alt}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Band 2 — Bottom CTA */}
        <section
          aria-labelledby="sobre-cta-heading"
          className="pb-[var(--space-3xl)] pt-[var(--space-xl)]"
        >
          <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
            <h2
              id="sobre-cta-heading"
              className="font-display text-[length:var(--text-2xl)] font-normal leading-[1.15] tracking-[-0.012em] text-ink"
            >
              {content.bottomCtaHeading}
            </h2>
            <p className="mt-[var(--space-2xs)] max-w-[52ch] text-[length:var(--text-base)] leading-relaxed text-ink-soft">
              {content.bottomCtaBody}
            </p>

            <div className="mt-[var(--space-lg)] flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Iniciar conversa no WhatsApp"
                className="group inline-flex items-center gap-2.5 rounded-sm bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent-deep"
              >
                <WhatsappIcon size={16} />
                <span className="font-display text-base">{content.bottomCtaWhatsappLabel}</span>
                <span
                  aria-hidden
                  className="font-display text-base text-paper-deep transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <Link
                href="/#contato"
                className="group inline-flex items-baseline gap-2 text-sm text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
              >
                {content.bottomCtaFormLabel}
                <span
                  aria-hidden
                  className="font-display transition-transform group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer siteInfo={siteInfo} whatsappHref={whatsappHref} />
    </>
  );
}
