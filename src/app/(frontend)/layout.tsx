import type { Metadata } from "next";
import { Petrona, Atkinson_Hyperlegible } from "next/font/google";
import { cookies } from "next/headers";
import { COOKIE_NAME, DEFAULT_PALETTE_ID, PICKER_COOKIE_NAME, isPaletteId } from "@/core/palettes";
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
const displaySerif = Petrona({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  fallback: ["Iowan Old Style", "Charter", "Georgia", "Cambria", "serif"],
});

const bodySans = Atkinson_Hyperlegible({
  subsets: ["latin", "latin-ext"],
  display: "swap",
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

const SITE_TITLE = "Lucas Sayeg — Psicólogo clínico e orientador profissional";
const SITE_DESCRIPTION =
  "Atendimento online e presencial em Vila Leopoldina, São Paulo. Psicoterapia clínica e orientação profissional para adultos.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s — Lucas Sayeg",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "pt_BR",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Palette exploration — see src/core/palettes.ts. Temporary; remove during cleanup.
  const store = await cookies();
  const cookiePalette = store.get(COOKIE_NAME)?.value;
  const palette = isPaletteId(cookiePalette) ? cookiePalette : DEFAULT_PALETTE_ID;
  const showPalettePanel = store.get(PICKER_COOKIE_NAME)?.value === "1";

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
