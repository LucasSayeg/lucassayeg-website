/*
  Single go-live indexing switch.

  This module must stay dependency-free: `next.config.ts` imports it (by
  relative path — the config loader doesn't resolve the `@/` alias), so any
  import added here would be pulled into the Next config bundle.
*/

/** Flip to true (one-line commit) to allow indexing in production. */
export const SEO_INDEXING_ENABLED = false;

/** The flag AND a production deploy. Previews/dev stay noindex after the flip. */
export function isIndexingEnabled(): boolean {
  return SEO_INDEXING_ENABLED && process.env.VERCEL_ENV === "production";
}
