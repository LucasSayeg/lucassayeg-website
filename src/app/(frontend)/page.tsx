import { Fragment } from "react";
import {
  getHomeContent,
  getSiteInfo,
  type HomeContent,
  type SiteInfoContent,
} from "@/lib/home-content";
import { getBaseUrl } from "@/lib/base-url";
import { ANCHOR_BY_KEY, type SectionKey } from "@/lib/section-anchors";
import { buildStructuredData } from "@/lib/structured-data";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { ComoAjuda } from "@/ui/home/ComoAjuda";
import { Contato } from "@/ui/home/Contato";
import { FAQ } from "@/ui/home/FAQ";
import { Footer } from "@/ui/home/Footer";
import { Header } from "@/ui/home/Header";
import { Hero } from "@/ui/home/Hero";
import { Servicos } from "@/ui/home/Servicos";
import { Sobre } from "@/ui/home/Sobre";

export const revalidate = 3600;

type SharedProps = { siteInfo: SiteInfoContent; whatsappHref: string };

const SECTION_RENDERERS: Record<
  SectionKey,
  (content: HomeContent, shared: SharedProps) => React.ReactNode
> = {
  hero: (c, s) => (
    <Hero
      content={c.hero}
      slogan={s.siteInfo.slogan}
      whatsappHref={s.whatsappHref}
      portrait={s.siteInfo.portrait}
    />
  ),
  comoAjuda: (c) => <ComoAjuda content={c.comoAjuda} />,
  sobre: (c, s) => <Sobre content={c.sobre} siteName={s.siteInfo.name} />,
  servicos: (c) => <Servicos content={c.servicos} />,
  faq: (c) => <FAQ content={c.faq} />,
  contato: (c, s) => (
    <Contato content={c.contato} formCopy={c.contactForm} whatsappHref={s.whatsappHref} />
  ),
};

export default async function Home() {
  const [content, siteInfo] = await Promise.all([getHomeContent(), getSiteInfo()]);
  const whatsappHref = buildWhatsappHref(siteInfo.whatsappNumber, siteInfo.whatsappPrefill);
  const navLinks = content.sections
    .filter((s) => s.enabled && s.navLabel)
    .map((s) => ({ href: `#${ANCHOR_BY_KEY[s.key]}`, label: s.navLabel }));
  const shared: SharedProps = { siteInfo, whatsappHref };
  const jsonLd = buildStructuredData({ siteInfo, baseUrl: getBaseUrl(), faq: content.faq });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header navLinks={navLinks} siteInfo={siteInfo} whatsappHref={whatsappHref} />
      <main id="main">
        {content.sections
          .filter((s) => s.enabled)
          .map((s) => (
            <Fragment key={s.key}>{SECTION_RENDERERS[s.key](content, shared)}</Fragment>
          ))}
      </main>
      <Footer siteInfo={siteInfo} whatsappHref={whatsappHref} />
    </>
  );
}
