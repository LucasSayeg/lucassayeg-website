/*
  Types and fallback constants for home content. Lives in its own module
  (no `server-only`) so client components can import the types and use the
  fallbacks as default props without dragging the resolver — and Payload's
  server runtime — into the client bundle.
*/

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  COMO_AJUDA,
  CONTACT_FORM,
  CONTATO,
  FAQ_ITEMS,
  FAQ_SUBTITLE,
  HERO,
  SERVICOS,
  SERVICOS_SUBTITLE,
  SITE_META,
  SOBRE,
  SOBRE_BOTTOM_CTA,
} from "@/lib/home-data";
import type { SectionKey } from "@/lib/section-anchors";

export type SectionLayout = { key: SectionKey; enabled: boolean; navLabel: string };

export type HeroContent = {
  heading: string;
  sub: string;
  modalityOnline: string;
  modalityPresencial: string;
  ctaWhatsapp: string;
  cta: string;
  quickPickIntro: string;
  quickPickTopics: string[];
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
export type ServicosContent = { subtitle: string; items: ServicoItem[] };

export type FaqItem = { question: string; answer: string[] };
export type FaqContent = { subtitle: string; items: FaqItem[] };

export type ContatoContent = {
  heading: string;
  invite: string;
  responseTimeLabel: string;
  responseTimeBody: string;
  whatsappBlockLabel: string;
  whatsappPrompt: string;
  whatsappLabel: string;
  sigiloLabel: string;
  sigiloBody: string;
};

export type ContactFormContent = {
  namePlaceholder: string;
  nameValidHint: string;
  emailPlaceholder: string;
  emailValidHint: string;
  messagePlaceholder: string;
  messageValidHint: string;
  disclaimer: string;
  successHeading: string;
  successBody: string;
  successWhatsappPrompt: string;
};

export type SitePortrait = {
  url: string;
  alt: string;
};

export type SiteInfoContent = {
  name: string;
  shortMark: string;
  slogan: string;
  region: string;
  address: string;
  crp: string;
  crisis: string;
  email: string;
  whatsappNumber: string;
  whatsappPrefill: string;
  portrait: SitePortrait | null;
};

export type SobrePageContent = {
  lede: string;
  body: SerializedEditorState | null;
  bodyParagraphs: string[];
  bottomCtaHeading: string;
  bottomCtaBody: string;
  bottomCtaWhatsappLabel: string;
  bottomCtaFormLabel: string;
};

export type HomeContent = {
  sections: SectionLayout[];
  hero: HeroContent;
  comoAjuda: ComoAjudaContent;
  sobre: SobreContent;
  servicos: ServicosContent;
  faq: FaqContent;
  contato: ContatoContent;
  contactForm: ContactFormContent;
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
  quickPickIntro: HERO.quickPickIntro,
  quickPickTopics: [...HERO.quickPickTopics],
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
  subtitle: SERVICOS_SUBTITLE,
  items: SERVICOS.map((s) => ({
    id: s.id,
    label: s.label,
    sublabel: s.sublabel,
    framing: s.framing,
    areas: [...s.items],
  })),
};

export const FALLBACK_FAQ: FaqContent = {
  subtitle: FAQ_SUBTITLE,
  items: FAQ_ITEMS.map((it) => ({ question: it.q, answer: [...it.a] })),
};

export const FALLBACK_CONTATO: ContatoContent = {
  heading: CONTATO.heading,
  invite: CONTATO.invite,
  responseTimeLabel: CONTATO.responseTimeLabel,
  responseTimeBody: CONTATO.responseTimeBody,
  whatsappBlockLabel: CONTATO.whatsappBlockLabel,
  whatsappPrompt: CONTATO.whatsappPrompt,
  whatsappLabel: CONTATO.whatsappLabel,
  sigiloLabel: CONTATO.sigiloLabel,
  sigiloBody: CONTATO.sigiloBody,
};

export const FALLBACK_CONTACT_FORM: ContactFormContent = {
  namePlaceholder: CONTACT_FORM.namePlaceholder,
  nameValidHint: CONTACT_FORM.nameValidHint,
  emailPlaceholder: CONTACT_FORM.emailPlaceholder,
  emailValidHint: CONTACT_FORM.emailValidHint,
  messagePlaceholder: CONTACT_FORM.messagePlaceholder,
  messageValidHint: CONTACT_FORM.messageValidHint,
  disclaimer: CONTACT_FORM.disclaimer,
  successHeading: CONTACT_FORM.successHeading,
  successBody: CONTACT_FORM.successBody,
  successWhatsappPrompt: CONTACT_FORM.successWhatsappPrompt,
};

export const FALLBACK_HOME: HomeContent = {
  sections: FALLBACK_SECTIONS,
  hero: FALLBACK_HERO,
  comoAjuda: FALLBACK_COMO_AJUDA,
  sobre: FALLBACK_SOBRE,
  servicos: FALLBACK_SERVICOS,
  faq: FALLBACK_FAQ,
  contato: FALLBACK_CONTATO,
  contactForm: FALLBACK_CONTACT_FORM,
};

export const FALLBACK_SITE_INFO: SiteInfoContent = {
  name: SITE_META.name,
  shortMark: SITE_META.shortMark,
  slogan: SITE_META.slogan,
  region: SITE_META.region,
  address: SITE_META.address,
  crp: SITE_META.crp,
  crisis: SITE_META.crisis,
  email: SITE_META.email,
  whatsappNumber: SITE_META.whatsappNumber,
  whatsappPrefill: SITE_META.whatsappPrefill,
  portrait: null,
};

export const FALLBACK_SOBRE_PAGE: SobrePageContent = {
  lede: SOBRE.intro,
  body: null,
  bodyParagraphs: [...SOBRE.paragraphs],
  bottomCtaHeading: SOBRE_BOTTOM_CTA.heading,
  bottomCtaBody: SOBRE_BOTTOM_CTA.body,
  bottomCtaWhatsappLabel: SOBRE_BOTTOM_CTA.whatsappLabel,
  bottomCtaFormLabel: SOBRE_BOTTOM_CTA.formLabel,
};
