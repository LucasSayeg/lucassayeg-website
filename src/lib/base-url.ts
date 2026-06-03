/*
  Absolute base URL for og:image / canonical / sitemap resolution.

  On Vercel the system env vars are authoritative: a misconfigured
  NEXT_PUBLIC_BASE_URL in the dashboard (e.g. `http://localhost:3000` copied
  from .env.example) must never leak into link-preview or sitemap URLs —
  that ships cards scrapers can't fetch. VERCEL_PROJECT_PRODUCTION_URL
  tracks the shortest production domain automatically (it switches to the
  custom domain once one is attached), so production needs no dashboard
  config at all. Previews resolve to their own deployment so og images
  render from the build being reviewed. Locally NEXT_PUBLIC_BASE_URL wins.
*/
export function getBaseUrl(): string {
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}
