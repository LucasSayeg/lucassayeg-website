/*
  Absolute base URL for og:image / canonical / sitemap resolution.

  Production is PINNED, not derived. This used to read
  VERCEL_PROJECT_PRODUCTION_URL on the theory that it tracks the custom domain
  once one is attached. It does not do so reliably here: with
  lucassayeg.psc.br attached and serving 200, production was still emitting
  `https://lucassayeg-website.vercel.app/` in /sitemap.xml. Shipping that
  under an indexable robots.txt would hand Google the throwaway domain as the
  canonical host, which is very expensive to undo.

  A pinned constant also makes the canonical host reviewable in the diff
  rather than a function of which domains happen to be attached, and of the
  order they were attached in.

  If the domain ever changes, change it here. The one invariant: this must be
  the host that serves 200, not one that redirects. Today www.lucassayeg.psc.br
  308s to the apex, so the apex is canonical — keep the two in agreement or
  every canonical tag will point at a redirect.

  Previews still resolve to their own deployment so og images render from the
  build being reviewed. Locally NEXT_PUBLIC_BASE_URL wins.
*/

/** The canonical production origin. No trailing slash — callers append paths. */
export const PRODUCTION_BASE_URL = "https://lucassayeg.psc.br";

export function getBaseUrl(): string {
  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}
