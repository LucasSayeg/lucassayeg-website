/*
  Re-exports the canonical fallback constants from `@/lib/home-data`. These
  values render when the CMS is disabled or unreachable; in production the
  resolver in `@/lib/home-content` supplies CMS-edited copy. Kept here so
  existing imports from `@/ui/home/data` (notably `/sobre` and the contact
  form) continue to work unchanged.
*/

export {
  SITE_META,
  WHATSAPP_HREF,
  NAV_LINKS,
  HERO,
  COMO_AJUDA,
  SOBRE,
  SERVICOS,
  FAQ_ITEMS,
  CONTATO,
  FOOTER,
} from "@/lib/home-data";
