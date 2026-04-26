import type { Metadata } from "next";
import { Spectral, Geist } from "next/font/google";
import { getSettings } from "@/lib/payload";
import { Toaster } from "sonner";
import "@/app/globals.css";

/*
  Display: Spectral (Production Type) — editorial workhorse, sharp terminals.
  Body/UI: Geist (Vercel) — refined neo-grotesque, free analog to Söhne.

  `adjustFontFallback` defaults to true: Next emits a `size-adjust`-tuned
  fallback (Times New Roman for serif, Arial for sans) that closely matches
  each face's metrics, so unstyled-text → web-font swap has minimal layout
  shift. The explicit `fallback` chain below is the second line of defence,
  for browsers that skip the override or fail the fetch.
*/
const spectral = Spectral({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  fallback: ["Iowan Old Style", "Charter", "Georgia", "Cambria", "serif"],
});

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

const SITE_NAME_FALLBACK = "Lucas Sayeg — Psicólogo clínico e orientador profissional";
const SITE_DESCRIPTION_FALLBACK =
  "Atendimento online e presencial em Vila Leopoldina, São Paulo. Psicoterapia clínica e orientação profissional para adultos.";

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSettings();
  const title = settings?.siteName?.trim() || SITE_NAME_FALLBACK;
  const description = settings?.description?.trim() || SITE_DESCRIPTION_FALLBACK;

  return {
    title: {
      default: title,
      template: `%s — ${settings?.siteName?.trim() || "Lucas Sayeg"}`,
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
    },
  };
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${spectral.variable} ${geist.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <Toaster position="top-center" theme="light" closeButton richColors={false} />
      </body>
    </html>
  );
}
