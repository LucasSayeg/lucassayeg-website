import "server-only";
import { cache } from "react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  FALLBACK_COMO_AJUDA,
  FALLBACK_CONTATO,
  FALLBACK_FAQ,
  FALLBACK_HERO,
  FALLBACK_HOME,
  FALLBACK_SECTIONS,
  FALLBACK_SERVICOS,
  FALLBACK_SITE_INFO,
  FALLBACK_SOBRE,
  type ComoAjudaContent,
  type ComoAjudaGroup,
  type ContatoContent,
  type FaqContent,
  type FaqItem,
  type HeroContent,
  type HomeContent,
  type SectionLayout,
  type ServicoItem,
  type ServicosContent,
  type SiteInfoContent,
  type SobreContent,
} from "@/lib/home-content-types";
import { getPayloadSafe } from "@/lib/payload";
import { SECTION_KEYS, type SectionKey } from "@/lib/section-anchors";
import type {
  HomeComoAjuda,
  HomeContato,
  HomeFaq,
  HomeHero,
  HomeLayout,
  HomeServico,
  HomeSobre,
  SiteInfo,
} from "@/payload-types";

export type {
  ComoAjudaContent,
  ComoAjudaGroup,
  ContatoContent,
  FaqContent,
  FaqItem,
  HeroContent,
  HomeContent,
  SectionLayout,
  ServicoItem,
  ServicosContent,
  SiteInfoContent,
  SobreContent,
} from "@/lib/home-content-types";

export {
  FALLBACK_COMO_AJUDA,
  FALLBACK_CONTATO,
  FALLBACK_FAQ,
  FALLBACK_HERO,
  FALLBACK_HOME,
  FALLBACK_SECTIONS,
  FALLBACK_SERVICOS,
  FALLBACK_SITE_INFO,
  FALLBACK_SOBRE,
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
  return {
    heading: g.heading || fb.heading,
    sub: g.sub || fb.sub,
    modalityOnline: g.modalityOnline || fb.modalityOnline,
    modalityPresencial: g.modalityPresencial || fb.modalityPresencial,
    ctaWhatsapp: g.ctaWhatsapp || fb.ctaWhatsapp,
    cta: g.cta || fb.cta,
  };
}

function mergeComoAjuda(
  g: HomeComoAjuda | null | undefined,
  fb: ComoAjudaContent,
): ComoAjudaContent {
  if (!g) return fb;
  const groups: ComoAjudaGroup[] = Array.isArray(g.groups)
    ? g.groups
        .filter((row): row is NonNullable<typeof row> => !!row && typeof row.label === "string")
        .map((row) => ({
          label: row.label,
          words: Array.isArray(row.words)
            ? row.words
                .map((w) => w?.value)
                .filter((v): v is string => typeof v === "string" && v.length > 0)
            : [],
        }))
        .filter((row) => row.words.length > 0)
    : [];
  return {
    intro: g.intro || fb.intro,
    closing: g.closing || fb.closing,
    groups: groups.length > 0 ? groups : fb.groups,
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
  return items.length > 0 ? { items } : fb;
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
  return items.length > 0 ? { items } : fb;
}

function mergeContato(g: HomeContato | null | undefined, fb: ContatoContent): ContatoContent {
  if (!g) return fb;
  return {
    heading: g.heading || fb.heading,
    invite: g.invite || fb.invite,
    whatsappPrompt: g.whatsappPrompt || fb.whatsappPrompt,
    whatsappLabel: g.whatsappLabel || fb.whatsappLabel,
    crisis: g.crisis || fb.crisis,
  };
}

function mergeSiteInfo(g: SiteInfo | null | undefined, fb: SiteInfoContent): SiteInfoContent {
  if (!g) return fb;
  return {
    name: g.name || fb.name,
    shortMark: g.shortMark || fb.shortMark,
    slogan: g.slogan || fb.slogan,
    region: g.region || fb.region,
    address: g.address || fb.address,
    crp: g.crp || fb.crp,
    email: g.email || fb.email,
    whatsappNumber: g.whatsappNumber || fb.whatsappNumber,
    whatsappPrefill: g.whatsappPrefill || fb.whatsappPrefill,
  };
}

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const payload = await getPayloadSafe();
  if (!payload) return FALLBACK_HOME;
  try {
    const [layout, hero, comoAjuda, sobre, servicos, faq, contato] = await Promise.all([
      payload.findGlobal({ slug: "home-layout" }) as Promise<HomeLayout>,
      payload.findGlobal({ slug: "home-hero" }) as Promise<HomeHero>,
      payload.findGlobal({ slug: "home-como-ajuda" }) as Promise<HomeComoAjuda>,
      payload.findGlobal({ slug: "home-sobre" }) as Promise<HomeSobre>,
      payload.findGlobal({ slug: "home-servicos" }) as Promise<HomeServico>,
      payload.findGlobal({ slug: "home-faq" }) as Promise<HomeFaq>,
      payload.findGlobal({ slug: "home-contato" }) as Promise<HomeContato>,
    ]);
    return {
      sections: mapSections(layout.sections, FALLBACK_SECTIONS),
      hero: mergeHero(hero, FALLBACK_HERO),
      comoAjuda: mergeComoAjuda(comoAjuda, FALLBACK_COMO_AJUDA),
      sobre: mergeSobre(sobre, FALLBACK_SOBRE),
      servicos: mergeServicos(servicos, FALLBACK_SERVICOS),
      faq: mergeFaq(faq, FALLBACK_FAQ),
      contato: mergeContato(contato, FALLBACK_CONTATO),
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
    const g = (await payload.findGlobal({ slug: "site-info" })) as SiteInfo;
    return mergeSiteInfo(g, FALLBACK_SITE_INFO);
  } catch (err) {
    console.warn("[site-info] fetch failed, using fallback", err);
    return FALLBACK_SITE_INFO;
  }
});
