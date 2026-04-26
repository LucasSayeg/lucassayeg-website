import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import { getSettings } from "@/lib/payload";
import { Toaster } from "sonner";
import "@/app/globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
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
      className={`${sourceSerif.variable} ${publicSans.variable}`}
    >
      <body>
        {children}
        <Toaster position="top-center" theme="light" closeButton richColors={false} />
      </body>
    </html>
  );
}
