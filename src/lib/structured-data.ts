import type { FaqContent, ServicosContent, SiteInfoContent } from "@/lib/home-content-types";

function toAbsolute(url: string, baseUrl: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

type Options = {
  siteInfo: SiteInfoContent;
  baseUrl: string;
  /** Which page the graph is being emitted on — picks the WebPage node. */
  page: "home" | "sobre";
  /** Pass the FAQ content to emit a FAQPage node (home page only). */
  faq?: FaqContent | null;
  /** Pass the serviços content to emit serviceType on ProfessionalService (home page only). */
  servicos?: ServicosContent | null;
};

/*
  schema.org @graph: WebSite + WebPage + Person + ProfessionalService
  (+ FAQPage / BreadcrumbList when applicable).

  Deliberately omitted, not forgotten:
  - priceRange / openingHours — not published by design (value is combined in
    the first contact).
  - MedicalBusiness & friends — overclaiming for a solo psicólogo; schema.org
    has no Psychologist type, so ProfessionalService is the honest fit.
  - streetAddress / geo — the full address is intentionally private (sent
    after first contact); only locality-level address is published.
  - sameAs — no public profiles yet; becomes a SiteInfo field when
    Instagram/LinkedIn/Doctoralia exist.
*/
export function buildStructuredData({ siteInfo, baseUrl, page, faq, servicos }: Options) {
  const personId = `${baseUrl}/#lucas`;
  const serviceId = `${baseUrl}/#practice`;
  const websiteId = `${baseUrl}/#website`;
  const webpageId = page === "home" ? `${baseUrl}/#webpage` : `${baseUrl}/sobre#webpage`;
  const breadcrumbId = `${baseUrl}/sobre#breadcrumb`;
  const image = siteInfo.portrait?.url ? toAbsolute(siteInfo.portrait.url, baseUrl) : undefined;
  const telephone = siteInfo.whatsappNumber ? `+${siteInfo.whatsappNumber}` : undefined;
  const serviceTypes = servicos?.items.map((s) => `${s.label} — ${s.sublabel}`) ?? [];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteInfo.name,
      url: baseUrl,
      inLanguage: "pt-BR",
      ...(siteInfo.metaDescription ? { description: siteInfo.metaDescription } : {}),
      publisher: { "@id": personId },
    },
    page === "home"
      ? {
          "@type": "WebPage",
          "@id": webpageId,
          url: `${baseUrl}/`,
          name: `${siteInfo.name} — ${siteInfo.slogan}`,
          inLanguage: "pt-BR",
          isPartOf: { "@id": websiteId },
          about: { "@id": personId },
        }
      : {
          "@type": "ProfilePage",
          "@id": webpageId,
          url: `${baseUrl}/sobre`,
          name: `Sobre — ${siteInfo.name}`,
          inLanguage: "pt-BR",
          isPartOf: { "@id": websiteId },
          mainEntity: { "@id": personId },
          breadcrumb: { "@id": breadcrumbId },
        },
    {
      "@type": "Person",
      "@id": personId,
      name: siteInfo.name,
      jobTitle: siteInfo.slogan,
      url: baseUrl,
      mainEntityOfPage: { "@id": webpageId },
      knowsLanguage: "pt-BR",
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade de São Paulo" },
      ...(siteInfo.crp
        ? { identifier: { "@type": "PropertyValue", propertyID: "CRP", value: siteInfo.crp } }
        : {}),
      ...(telephone ? { telephone } : {}),
      ...(siteInfo.email ? { email: siteInfo.email } : {}),
      ...(image ? { image } : {}),
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: siteInfo.name,
      ...(siteInfo.metaDescription ? { description: siteInfo.metaDescription } : {}),
      provider: { "@id": personId },
      url: baseUrl,
      availableLanguage: "pt-BR",
      areaServed: [
        { "@type": "Country", name: "Brasil" },
        { "@type": "City", name: "São Paulo" },
      ],
      // Locality-level only — Vila Leopoldina is a bairro, named in the
      // description; the street address is intentionally not published.
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      ...(serviceTypes.length > 0 ? { serviceType: serviceTypes } : {}),
      ...(telephone ? { telephone } : {}),
      ...(siteInfo.email ? { email: siteInfo.email } : {}),
      ...(image ? { image } : {}),
    },
  ];

  if (page === "sobre") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${baseUrl}/` },
        { "@type": "ListItem", position: 2, name: "Sobre", item: `${baseUrl}/sobre` },
      ],
    });
  }

  if (faq && faq.items.length > 0) {
    // Google restricts FAQ rich results to gov/health sites (2023), but Bing
    // and AI answer engines still consume FAQPage — that's the AEO value.
    graph.push({
      "@type": "FAQPage",
      "@id": `${baseUrl}/#faq`,
      isPartOf: { "@id": webpageId },
      inLanguage: "pt-BR",
      mainEntity: faq.items.map((it) => ({
        "@type": "Question",
        name: it.question,
        acceptedAnswer: { "@type": "Answer", text: it.answer.join(" ") },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
