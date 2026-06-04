import type { FaqContent, SiteInfoContent } from "@/lib/home-content-types";

function toAbsolute(url: string, baseUrl: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

type Options = {
  siteInfo: SiteInfoContent;
  baseUrl: string;
  /** Pass the FAQ content to emit a FAQPage node (home page only). */
  faq?: FaqContent | null;
};

/** schema.org @graph: Person + ProfessionalService (+ FAQPage when given). */
export function buildStructuredData({ siteInfo, baseUrl, faq }: Options) {
  const personId = `${baseUrl}/#lucas`;
  const serviceId = `${baseUrl}/#practice`;
  const image = siteInfo.portrait?.url ? toAbsolute(siteInfo.portrait.url, baseUrl) : undefined;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: siteInfo.name,
      jobTitle: siteInfo.slogan,
      url: baseUrl,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade de São Paulo" },
      ...(siteInfo.crp ? { identifier: siteInfo.crp } : {}),
      ...(image ? { image } : {}),
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: siteInfo.name,
      description:
        "Psicoterapia clínica e orientação profissional, online e presencial em Vila Leopoldina, São Paulo.",
      provider: { "@id": personId },
      url: baseUrl,
      availableLanguage: "pt-BR",
      areaServed: { "@type": "Country", name: "Brasil" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vila Leopoldina",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      ...(image ? { image } : {}),
    },
  ];

  if (faq && faq.items.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${baseUrl}/#faq`,
      mainEntity: faq.items.map((it) => ({
        "@type": "Question",
        name: it.question,
        acceptedAnswer: { "@type": "Answer", text: it.answer.join(" ") },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
