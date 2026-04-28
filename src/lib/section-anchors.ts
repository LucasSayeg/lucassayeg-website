export const SECTION_KEYS = ["hero", "comoAjuda", "sobre", "servicos", "faq", "contato"] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export const ANCHOR_BY_KEY: Record<SectionKey, string> = {
  hero: "top",
  comoAjuda: "como-ajuda",
  sobre: "sobre",
  servicos: "servicos",
  faq: "faq",
  contato: "contato",
};
