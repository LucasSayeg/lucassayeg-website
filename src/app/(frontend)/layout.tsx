import type { Metadata } from "next";
import { Petrona, Atkinson_Hyperlegible } from "next/font/google";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  DEFAULT_PALETTE_ID,
  PICKER_COOKIE_NAME,
  isPaletteId,
  type PaletteId,
} from "@/core/palettes";
import { getBaseUrl } from "@/lib/base-url";
import { getSiteInfo } from "@/lib/home-content";
import { isIndexingEnabled } from "@/lib/seo";
import { PalettePanel } from "@/ui/dev/PalettePanel";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "@/app/globals.css";

/*
  Type stack — interim, en route to a paid/Velvetyne pairing.

  Display: Petrona (Indestructible Type, libre) — a transitional serif with
  generous counters and a calm italic. Stands in for the eventual licensed
  display face (PP Editorial New / Reckless / GT Sectra / a Velvetyne face
  like Le Murmure or Cirruscumulus) without falling back to the AI-default
  serifs the brief explicitly excludes (Fraunces, Newsreader, Lora, Crimson,
  Cormorant, Playfair, DM Serif).

  Body/UI: Atkinson Hyperlegible (Braille Institute, libre) — a humanist
  sans engineered for legibility (clearly differentiated l/1, O/0; rounded
  terminals; generous counters). Sits warm against Petrona without arguing
  for attention, and reads well at small sizes in low-contrast / late-night
  conditions — which matches this audience's actual viewing context. Avoids
  the excluded defaults (Inter, DM Sans, Geist, IBM Plex Sans).

  Weight axis: Atkinson ships Regular (400) and Bold (700) only. Anywhere
  the project previously asked for sans 500/600, it now uses 700 (true Bold
  rather than browser-faked intermediate weight).

  When the licensed faces arrive, drop them as local files in
  `public/fonts/` and swap these `next/font/google` calls for
  `next/font/local`, keeping the same `--font-display` / `--font-sans`
  variables — no consumer change.

  `adjustFontFallback` defaults to true: Next emits a `size-adjust`-tuned
  fallback (Times New Roman for serif, Arial for sans) that closely matches
  each face's metrics, so unstyled-text → web-font swap has minimal layout
  shift. The explicit `fallback` chain below is the second line of defence,
  for browsers that skip the override or fail the fetch.
*/
/*
  display: "fallback" (not "swap") — both faces are self-hosted and preloaded
  by next/font, so they almost always arrive within the ~100ms block window
  and render directly, with no fallback→webfont flash. On a genuinely slow
  connection the metric-matched fallback simply stays (no late swap jolt),
  which suits this audience better than text that reflows mid-read.
*/
const displaySerif = Petrona({
  subsets: ["latin", "latin-ext"],
  display: "fallback",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  fallback: ["Iowan Old Style", "Charter", "Georgia", "Cambria", "serif"],
});

const bodySans = Atkinson_Hyperlegible({
  subsets: ["latin", "latin-ext"],
  display: "fallback",
  variable: "--font-sans",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  // react-cached — shared with the page/og-image fetches, so this adds no
  // extra Payload round-trip and stays ISR-safe (no request APIs).
  const siteInfo = await getSiteInfo();
  const siteTitle = `${siteInfo.name} — ${siteInfo.slogan}`;
  return {
    // Absolute base for og:image / canonical resolution — same convention as
    // sitemap.ts / robots.ts.
    metadataBase: new URL(getBaseUrl()),
    title: {
      default: siteTitle,
      template: `%s — ${siteInfo.name}`,
    },
    description: siteInfo.metaDescription,
    alternates: { canonical: "/" },
    openGraph: {
      title: siteTitle,
      description: siteInfo.metaDescription,
      siteName: siteInfo.name,
      url: "/",
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteInfo.metaDescription,
    },
    // Belt-and-suspenders alongside X-Robots-Tag (next.config.ts) and
    // robots.ts — all three branch on the same switch in lib/seo.
    ...(isIndexingEnabled() ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Production renders statically — no request APIs in the layout. The palette
  // panel is a dev-only exploration tool (see src/core/palettes.ts); reading
  // cookies only in dev keeps the route eligible for static/ISR generation in
  // production.
  const isDev = process.env.NODE_ENV !== "production";
  let palette: PaletteId = DEFAULT_PALETTE_ID;
  let showPalettePanel = false;
  if (isDev) {
    const store = await cookies();
    const cookiePalette = store.get(COOKIE_NAME)?.value;
    palette = isPaletteId(cookiePalette) ? cookiePalette : DEFAULT_PALETTE_ID;
    showPalettePanel = store.get(PICKER_COOKIE_NAME)?.value === "1";
  }

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      data-palette={palette}
      className={`${displaySerif.variable} ${bodySans.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <Toaster position="top-center" theme="light" closeButton richColors={false} />
        {showPalettePanel ? <PalettePanel current={palette} /> : null}
        <Analytics />
      </body>
    </html>
  );
}
