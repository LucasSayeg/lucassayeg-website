/*
  Types and fallback constants for home content. Lives in its own module
  (no `server-only`) so client components can import the types and use the
  fallbacks as default props without dragging the resolver — and Payload's
  server runtime — into the client bundle.
*/

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { COMO_AJUDA, CONTATO, FAQ_ITEMS, HERO, SERVICOS, SITE_META, SOBRE } from "@/lib/home-data";
import type { SectionKey } from "@/lib/section-anchors";

export type SectionLayout = { key: SectionKey; enabled: boolean; navLabel: string };

export type HeroContent = {
  heading: string;
  sub: string;
  modalityOnline: string;
  modalityPresencial: string;
  ctaWhatsapp: string;
  cta: string;
};

export type ComoAjudaGroup = { label: string; words: string[] };
export type ComoAjudaContent = {
  intro: string;
  closing: string;
  groups: ComoAjudaGroup[];
};

export type SobreContent = {
  intro: string;
  body: SerializedEditorState | null;
  paragraphs: string[];
  ctaLabel: string;
};

export type ServicoItem = {
  id: string;
  label: string;
  sublabel: string;
  framing: string;
  areas: string[];
};
export type ServicosContent = { items: ServicoItem[] };

export type FaqItem = { question: string; answer: string[] };
export type FaqContent = { items: FaqItem[] };

export type ContatoContent = {
  heading: string;
  invite: string;
  whatsappPrompt: string;
  whatsappLabel: string;
  crisis: string;
};

export type SiteInfoContent = {
  name: string;
  shortMark: string;
  slogan: string;
  region: string;
  address: string;
  crp: string;
  email: string;
  whatsappNumber: string;
  whatsappPrefill: string;
};

export type HomeContent = {
  sections: SectionLayout[];
  hero: HeroContent;
  comoAjuda: ComoAjudaContent;
  sobre: SobreContent;
  servicos: ServicosContent;
  faq: FaqContent;
  contato: ContatoContent;
};

export const FALLBACK_SECTIONS: SectionLayout[] = [
  { key: "hero", enabled: true, navLabel: "" },
  { key: "comoAjuda", enabled: true, navLabel: "Como ajuda" },
  { key: "sobre", enabled: true, navLabel: "Sobre" },
  { key: "servicos", enabled: true, navLabel: "Serviços" },
  { key: "faq", enabled: true, navLabel: "FAQ" },
  { key: "contato", enabled: true, navLabel: "Contato" },
];

export const FALLBACK_HERO: HeroContent = {
  heading: HERO.heading,
  sub: HERO.sub,
  modalityOnline: HERO.modality.online,
  modalityPresencial: HERO.modality.presencial,
  ctaWhatsapp: HERO.ctaWhatsapp,
  cta: HERO.cta,
};

export const FALLBACK_COMO_AJUDA: ComoAjudaContent = {
  intro: COMO_AJUDA.intro,
  closing: COMO_AJUDA.closing,
  groups: COMO_AJUDA.groups.map((g) => ({ label: g.label, words: [...g.words] })),
};

export const FALLBACK_SOBRE: SobreContent = {
  intro: SOBRE.intro,
  body: null,
  paragraphs: [...SOBRE.paragraphs],
  ctaLabel: SOBRE.cta,
};

export const FALLBACK_SERVICOS: ServicosContent = {
  items: SERVICOS.map((s) => ({
    id: s.id,
    label: s.label,
    sublabel: s.sublabel,
    framing: s.framing,
    areas: [...s.items],
  })),
};

export const FALLBACK_FAQ: FaqContent = {
  items: FAQ_ITEMS.map((it) => ({ question: it.q, answer: [...it.a] })),
};

export const FALLBACK_CONTATO: ContatoContent = {
  heading: CONTATO.heading,
  invite: CONTATO.invite,
  whatsappPrompt: CONTATO.whatsappPrompt,
  whatsappLabel: CONTATO.whatsappLabel,
  crisis: CONTATO.crisis,
};

export const FALLBACK_HOME: HomeContent = {
  sections: FALLBACK_SECTIONS,
  hero: FALLBACK_HERO,
  comoAjuda: FALLBACK_COMO_AJUDA,
  sobre: FALLBACK_SOBRE,
  servicos: FALLBACK_SERVICOS,
  faq: FALLBACK_FAQ,
  contato: FALLBACK_CONTATO,
};

export const FALLBACK_SITE_INFO: SiteInfoContent = {
  name: SITE_META.name,
  shortMark: SITE_META.shortMark,
  slogan: SITE_META.slogan,
  region: SITE_META.region,
  address: SITE_META.address,
  crp: SITE_META.crp,
  email: SITE_META.email,
  whatsappNumber: SITE_META.whatsappNumber,
  whatsappPrefill: SITE_META.whatsappPrefill,
};
