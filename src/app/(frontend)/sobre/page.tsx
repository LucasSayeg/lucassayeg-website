import type { Metadata } from "next";
import {
  getHomeLayout,
  getSiteInfo,
  getSobrePageContent,
  type SobrePageContent,
} from "@/lib/home-content";
import { getBaseUrl } from "@/lib/base-url";
import { ANCHOR_BY_KEY } from "@/lib/section-anchors";
import { buildStructuredData } from "@/lib/structured-data";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { Eyebrow } from "@/ui/components/Eyebrow";
import { PageContainer } from "@/ui/components/PageContainer";
import { UnderlineLink } from "@/ui/components/UnderlineLink";
import { WhatsappCta } from "@/ui/components/WhatsappCta";
import { Footer } from "@/ui/home/Footer";
import { HandmadeUnderline } from "@/ui/home/HandmadeUnderline";
import { Header } from "@/ui/home/Header";
import { IllustrationSlot } from "@/ui/components/IllustrationSlot";
import { SobreRichText } from "@/ui/home/SobreRichText";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [siteInfo, content] = await Promise.all([getSiteInfo(), getSobrePageContent()]);
  const title = `Sobre — ${siteInfo.name}`;
  return {
    title: { absolute: title },
    description: content.lede,
    alternates: { canonical: "/sobre" },
    // A child openGraph replaces the layout's wholesale (no deep merge), so
    // shared fields are restated here.
    //
    // KNOWN GAP: og:image does NOT cascade either — it went with the replaced
    // parent block, so /sobre currently ships no og:image and shares of this
    // URL render as a bare text link. The fix needs a `sobre`-scoped
    // opengraph-image route. Adding one that re-exports ../opengraph-image
    // built fine locally but broke BOTH og routes on Vercel with
    // "TypeError: u2 is not iterable" (only reproducible there, where static
    // generation runs in a single worker). Do it by extracting the card into a
    // shared non-route module that each route wraps — no route importing
    // another route.
    openGraph: {
      title,
      description: content.lede,
      siteName: siteInfo.name,
      url: "/sobre",
      type: "profile",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.lede,
    },
  };
}

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
  const jsonLd = buildStructuredData({ siteInfo, baseUrl: getBaseUrl(), page: "sobre" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header navLinks={navLinks} siteInfo={siteInfo} whatsappHref={whatsappHref} />
      <main id="main">
        {/* Band 1 — Identity + Formação merged */}
        <section
          aria-labelledby="sobre-page-heading"
          className="pb-[var(--space-2xl)] pt-[var(--space-2xl)] sm:pt-[var(--space-3xl)]"
        >
          <PageContainer>
            <div className="grid grid-cols-1 items-start gap-[var(--space-xl)] lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
              <div className="lg:col-span-7">
                <h1
                  id="sobre-page-heading"
                  className="font-display text-[length:var(--text-4xl)] font-normal leading-[1.05] tracking-[-0.018em] text-ink"
                >
                  <HandmadeUnderline>{siteInfo.name}</HandmadeUnderline>
                </h1>

                <p className="mt-[var(--space-2xs)] font-display italic text-[length:var(--text-base)] text-ink-soft">
                  {siteInfo.slogan}
                </p>

                <p className="mt-[var(--space-xl)] max-w-[60ch] font-display text-[length:var(--text-lg)] leading-relaxed text-ink-soft">
                  {content.lede}
                </p>

                <Eyebrow
                  as="h2"
                  id="formacao-heading"
                  className="mb-[var(--space-md)] mt-[var(--space-xl)] flex items-center gap-3 tracking-[0.24em]"
                >
                  <span aria-hidden className="inline-block h-px w-8 bg-ink-faint" />
                  <span>Formação</span>
                </Eyebrow>

                <div className="max-w-[60ch] space-y-[var(--space-md)] text-[length:var(--text-base)] leading-[1.75] text-ink-soft">
                  <FormacaoBody content={content} />
                </div>

                <p className="mt-[var(--space-lg)] font-display text-sm text-ink-quiet">
                  {siteInfo.crp}
                </p>
              </div>

              <div className="order-first mx-auto w-full max-w-[320px] lg:order-last lg:col-span-5 lg:mx-0 lg:max-w-none">
                <IllustrationSlot
                  concept="Retrato editorial — figura sentada, três-quartos, livros ao fundo, luz lateral. Linha solta, hatching contido."
                  shape="portrait"
                  src={portrait?.url}
                  alt={portrait?.alt}
                  blurDataURL={portrait?.blurDataURL}
                  priority
                  className="w-full"
                />
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Band 2 — Bottom CTA */}
        <section
          aria-labelledby="sobre-cta-heading"
          className="pb-[var(--space-3xl)] pt-[var(--space-xl)]"
        >
          <PageContainer>
            <h2
              id="sobre-cta-heading"
              className="font-display text-[length:var(--text-2xl)] font-normal leading-[1.15] tracking-[-0.012em] text-ink"
            >
              {content.bottomCtaHeading}
            </h2>
            <p className="mt-[var(--space-2xs)] max-w-[56ch] text-[length:var(--text-lg)] leading-relaxed text-ink-soft">
              {content.bottomCtaBody}
            </p>

            <div className="mt-[var(--space-lg)] flex flex-wrap items-center gap-x-5 gap-y-3">
              <UnderlineLink
                href="/#contato"
                internal
                className="group inline-flex items-baseline gap-2 text-sm text-ink transition-colors hover:text-accent"
              >
                {content.bottomCtaFormLabel}
                <span
                  aria-hidden
                  className="font-display transition-transform group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </UnderlineLink>
              <WhatsappCta href={whatsappHref} ariaLabel="Iniciar conversa no WhatsApp">
                {content.bottomCtaWhatsappLabel}
              </WhatsappCta>
            </div>
          </PageContainer>
        </section>
      </main>
      <Footer siteInfo={siteInfo} whatsappHref={whatsappHref} />
    </>
  );
}
