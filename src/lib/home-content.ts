import "server-only";
import { cache } from "react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  FALLBACK_COMO_AJUDA,
  FALLBACK_CONTACT_FORM,
  FALLBACK_CONTATO,
  FALLBACK_FAQ,
  FALLBACK_HERO,
  FALLBACK_HOME,
  FALLBACK_SECTIONS,
  FALLBACK_SERVICOS,
  FALLBACK_SITE_INFO,
  FALLBACK_SOBRE,
  FALLBACK_SOBRE_PAGE,
  type ComoAjudaContent,
  type ComoAjudaItem,
  type ContactFormContent,
  type ContatoContent,
  type FaqContent,
  type FaqItem,
  type HeroContent,
  type HomeContent,
  type SectionLayout,
  type ServicoItem,
  type ServicosContent,
  type SiteInfoContent,
  type SitePortrait,
  type SobreContent,
  type SobrePageContent,
} from "@/lib/home-content-types";
import { getPayloadSafe } from "@/lib/payload";
import { SECTION_KEYS, type SectionKey } from "@/lib/section-anchors";
import type {
  HomeComoAjuda,
  HomeContactForm,
  HomeContato,
  HomeFaq,
  HomeHero,
  HomeLayout,
  HomeServico,
  HomeSobre,
  Media,
  SiteInfo,
  SobrePage,
} from "@/payload-types";

export type {
  ComoAjudaContent,
  ComoAjudaItem,
  ContactFormContent,
  ContatoContent,
  FaqContent,
  FaqItem,
  HeroContent,
  HomeContent,
  SectionLayout,
  ServicoItem,
  ServicosContent,
  SiteInfoContent,
  SitePortrait,
  SobreContent,
  SobrePageContent,
} from "@/lib/home-content-types";

export {
  FALLBACK_COMO_AJUDA,
  FALLBACK_CONTACT_FORM,
  FALLBACK_CONTATO,
  FALLBACK_FAQ,
  FALLBACK_HERO,
  FALLBACK_HOME,
  FALLBACK_SECTIONS,
  FALLBACK_SERVICOS,
  FALLBACK_SITE_INFO,
  FALLBACK_SOBRE,
  FALLBACK_SOBRE_PAGE,
} from "@/lib/home-content-types";

const REQUIRED_KEYS: ReadonlySet<SectionKey> = new Set(SECTION_KEYS);

function mapSections(
  rows: HomeLayout["sections"] | null | undefined,
  fallback: SectionLayout[],
): SectionLayout[] {
  if (!Array.isArray(rows) || rows.length === 0) return fallback;
  const seen = new Set<SectionKey>();
  const mapped: SectionLayout[] = [];
  for (const row of rows) {
    const key = row?.key as SectionKey | undefined;
    if (!key || !REQUIRED_KEYS.has(key) || seen.has(key)) continue;
    seen.add(key);
    mapped.push({
      key,
      enabled: row?.enabled !== false,
      navLabel: typeof row?.navLabel === "string" ? row.navLabel : "",
    });
  }
  if (mapped.length !== REQUIRED_KEYS.size) return fallback;
  return mapped;
}

function mergeHero(g: HomeHero | null | undefined, fb: HeroContent): HeroContent {
  if (!g) return fb;
  const topics = Array.isArray(g.quickPickTopics)
    ? g.quickPickTopics
        .map((row) => row?.value)
        .filter((v): v is string => typeof v === "string" && v.length > 0)
    : [];
  return {
    heading: g.heading || fb.heading,
    sub: g.sub || fb.sub,
    modalityOnline: g.modalityOnline || fb.modalityOnline,
    modalityPresencial: g.modalityPresencial || fb.modalityPresencial,
    ctaWhatsapp: g.ctaWhatsapp || fb.ctaWhatsapp,
    quickPickTopics: topics.length > 0 ? topics : fb.quickPickTopics,
  };
}

function mergeComoAjuda(
  g: HomeComoAjuda | null | undefined,
  fb: ComoAjudaContent,
): ComoAjudaContent {
  if (!g) return fb;
  const items: ComoAjudaItem[] = Array.isArray(g.items)
    ? g.items
        .filter(
          (row): row is NonNullable<typeof row> =>
            !!row && typeof row.title === "string" && typeof row.body === "string",
        )
        .map((row) => ({ title: row.title.trim(), body: row.body.trim() }))
        .filter((row) => row.title.length > 0 && row.body.length > 0)
    : [];
  return {
    items,
  };
}

function mergeSobre(g: HomeSobre | null | undefined, fb: SobreContent): SobreContent {
  if (!g) return fb;
  const body = (g.body ?? null) as unknown as SerializedEditorState | null;
  return {
    intro: g.intro || fb.intro,
    body,
    paragraphs: fb.paragraphs,
    ctaLabel: g.ctaLabel || fb.ctaLabel,
  };
}

function mergeServicos(g: HomeServico | null | undefined, fb: ServicosContent): ServicosContent {
  const rawItems = g?.items;
  if (!Array.isArray(rawItems) || rawItems.length === 0) return fb;
  const items: ServicoItem[] = rawItems
    .filter((it): it is NonNullable<typeof it> => !!it && typeof it.id === "string")
    .map((it) => ({
      id: it.id,
      label: it.label,
      sublabel: it.sublabel,
      framing: it.framing,
      areas: Array.isArray(it.areas)
        ? it.areas
            .map((a) => a?.value)
            .filter((v): v is string => typeof v === "string" && v.length > 0)
        : [],
    }))
    .filter((it) => it.areas.length > 0);
  if (items.length === 0) return fb;
  return { subtitle: g?.subtitle || fb.subtitle, items };
}

function mergeFaq(g: HomeFaq | null | undefined, fb: FaqContent): FaqContent {
  const rawItems = g?.items;
  if (!Array.isArray(rawItems) || rawItems.length === 0) return fb;
  const items: FaqItem[] = rawItems
    .filter((it): it is NonNullable<typeof it> => !!it && typeof it.question === "string")
    .map((it) => ({
      question: it.question,
      answer: Array.isArray(it.answer)
        ? it.answer
            .map((p) => p?.body)
            .filter((v): v is string => typeof v === "string" && v.length > 0)
        : [],
    }))
    .filter((it) => it.answer.length > 0);
  if (items.length === 0) return fb;
  return { subtitle: g?.subtitle || fb.subtitle, items };
}

function mergeContato(g: HomeContato | null | undefined, fb: ContatoContent): ContatoContent {
  if (!g) return fb;
  return {
    heading: g.heading || fb.heading,
    invite: g.invite || fb.invite,
    responseTimeLabel: g.responseTimeLabel || fb.responseTimeLabel,
    responseTimeBody: g.responseTimeBody || fb.responseTimeBody,
    whatsappBlockLabel: g.whatsappBlockLabel || fb.whatsappBlockLabel,
    whatsappPrompt: g.whatsappPrompt || fb.whatsappPrompt,
    whatsappLabel: g.whatsappLabel || fb.whatsappLabel,
    sigiloLabel: g.sigiloLabel || fb.sigiloLabel,
    sigiloBody: g.sigiloBody || fb.sigiloBody,
  };
}

function mergeContactForm(
  g: HomeContactForm | null | undefined,
  fb: ContactFormContent,
): ContactFormContent {
  if (!g) return fb;
  return {
    namePlaceholder: g.namePlaceholder || fb.namePlaceholder,
    nameValidHint: g.nameValidHint || fb.nameValidHint,
    emailPlaceholder: g.emailPlaceholder || fb.emailPlaceholder,
    emailValidHint: g.emailValidHint || fb.emailValidHint,
    messagePlaceholder: g.messagePlaceholder || fb.messagePlaceholder,
    messageValidHint: g.messageValidHint || fb.messageValidHint,
    disclaimer: g.disclaimer || fb.disclaimer,
    successHeading: g.successHeading || fb.successHeading,
    successBody: g.successBody || fb.successBody,
    successWhatsappPrompt: g.successWhatsappPrompt || fb.successWhatsappPrompt,
  };
}

function resolvePortrait(
  raw: number | Media | null | undefined,
  rawAlt: string | null | undefined,
  fallbackName: string,
): SitePortrait | null {
  if (!raw || typeof raw === "number") return null;
  const url = typeof raw.url === "string" ? raw.url : null;
  if (!url) return null;
  const explicitAlt = typeof rawAlt === "string" ? rawAlt.trim() : "";
  const mediaAlt = typeof raw.alt === "string" ? raw.alt.trim() : "";
  const alt = explicitAlt || mediaAlt || `Retrato de ${fallbackName}`;
  return { url, alt };
}

function mergeSiteInfo(g: SiteInfo | null | undefined, fb: SiteInfoContent): SiteInfoContent {
  if (!g) return fb;
  const name = g.name || fb.name;
  return {
    name,
    shortMark: g.shortMark || fb.shortMark,
    slogan: g.slogan || fb.slogan,
    region: g.region || fb.region,
    address: g.address || fb.address,
    crp: g.crp || fb.crp,
    crisis: g.crisis || fb.crisis,
    email: g.email || fb.email,
    whatsappNumber: g.whatsappNumber || fb.whatsappNumber,
    whatsappPrefill: g.whatsappPrefill || fb.whatsappPrefill,
    portrait: resolvePortrait(g.portrait, g.portraitAlt, name),
  };
}

function mergeSobrePage(g: SobrePage | null | undefined, fb: SobrePageContent): SobrePageContent {
  if (!g) return fb;
  const body = (g.body ?? null) as unknown as SerializedEditorState | null;
  return {
    lede: g.lede || fb.lede,
    body,
    bodyParagraphs: fb.bodyParagraphs,
    bottomCtaHeading: g.bottomCtaHeading || fb.bottomCtaHeading,
    bottomCtaBody: g.bottomCtaBody || fb.bottomCtaBody,
    bottomCtaWhatsappLabel: g.bottomCtaWhatsappLabel || fb.bottomCtaWhatsappLabel,
    bottomCtaFormLabel: g.bottomCtaFormLabel || fb.bottomCtaFormLabel,
  };
}

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const payload = await getPayloadSafe();
  if (!payload) return FALLBACK_HOME;
  try {
    const [layout, hero, comoAjuda, sobre, servicos, faq, contato, contactForm] = await Promise.all(
      [
        payload.findGlobal({ slug: "home-layout" }) as Promise<HomeLayout>,
        payload.findGlobal({ slug: "home-hero" }) as Promise<HomeHero>,
        payload.findGlobal({ slug: "home-como-ajuda" }) as Promise<HomeComoAjuda>,
        payload.findGlobal({ slug: "home-sobre" }) as Promise<HomeSobre>,
        payload.findGlobal({ slug: "home-servicos" }) as Promise<HomeServico>,
        payload.findGlobal({ slug: "home-faq" }) as Promise<HomeFaq>,
        payload.findGlobal({ slug: "home-contato" }) as Promise<HomeContato>,
        payload.findGlobal({ slug: "home-contact-form" }) as Promise<HomeContactForm>,
      ],
    );
    return {
      sections: mapSections(layout.sections, FALLBACK_SECTIONS),
      hero: mergeHero(hero, FALLBACK_HERO),
      comoAjuda: mergeComoAjuda(comoAjuda, FALLBACK_COMO_AJUDA),
      sobre: mergeSobre(sobre, FALLBACK_SOBRE),
      servicos: mergeServicos(servicos, FALLBACK_SERVICOS),
      faq: mergeFaq(faq, FALLBACK_FAQ),
      contato: mergeContato(contato, FALLBACK_CONTATO),
      contactForm: mergeContactForm(contactForm, FALLBACK_CONTACT_FORM),
    };
  } catch (err) {
    console.warn("[home-content] fetch failed, using fallback", err);
    return FALLBACK_HOME;
  }
});

export const getSiteInfo = cache(async (): Promise<SiteInfoContent> => {
  const payload = await getPayloadSafe();
  if (!payload) return FALLBACK_SITE_INFO;
  try {
    const g = (await payload.findGlobal({
      slug: "site-info",
      depth: 1,
    })) as SiteInfo;
    return mergeSiteInfo(g, FALLBACK_SITE_INFO);
  } catch (err) {
    console.warn("[site-info] fetch failed, using fallback", err);
    return FALLBACK_SITE_INFO;
  }
});

export const getHomeLayout = cache(async (): Promise<SectionLayout[]> => {
  const payload = await getPayloadSafe();
  if (!payload) return FALLBACK_SECTIONS;
  try {
    const g = (await payload.findGlobal({ slug: "home-layout" })) as HomeLayout;
    return mapSections(g.sections, FALLBACK_SECTIONS);
  } catch (err) {
    console.warn("[home-layout] fetch failed, using fallback", err);
    return FALLBACK_SECTIONS;
  }
});

export const getSobrePageContent = cache(async (): Promise<SobrePageContent> => {
  const payload = await getPayloadSafe();
  if (!payload) return FALLBACK_SOBRE_PAGE;
  try {
    const g = (await payload.findGlobal({ slug: "sobre-page" })) as SobrePage;
    return mergeSobrePage(g, FALLBACK_SOBRE_PAGE);
  } catch (err) {
    console.warn("[sobre-page] fetch failed, using fallback", err);
    return FALLBACK_SOBRE_PAGE;
  }
});
