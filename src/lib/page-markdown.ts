/*
  Markdown mirrors of the two rendered pages, for AI agents and assistants.

  These are a companion to /llms.txt, not a replacement: llms.txt is a short
  index of the site, while these carry a page's full text with no HTML tag
  noise, no nav chrome and no footer cruft. Served at /index.md and /sobre.md,
  linked from llms.txt and advertised on the HTML pages via a
  `Link: rel="alternate" type="text/markdown"` header.

  Conventions, per the agent-readability playbook: one H1, then H2/H3 with no
  skipped levels; the first lines state what the page is and who it's for; the
  canonical URL is stated inline so an assistant quoting this can cite it.

  Content is authored in Payload and is prose, not Markdown — the only
  active markup it carries is the `**emphasis**` convention used by the
  hardcoded fallbacks, which passes through as valid Markdown.
*/

import type { HomeContent, SiteInfoContent, SobrePageContent } from "@/lib/home-content-types";
import { lexicalToParagraphs } from "@/lib/lexical-text";

type HomeOptions = {
  siteInfo: SiteInfoContent;
  content: HomeContent;
  baseUrl: string;
};

type SobreOptions = {
  siteInfo: SiteInfoContent;
  sobre: SobrePageContent;
  baseUrl: string;
};

/*
  Collapses whitespace so a CMS paragraph with stray newlines can't break out
  of its Markdown block (a bare newline mid-paragraph is harmless, but a blank
  line would split one paragraph into two).
*/
function paragraph(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Identity/contact facts an assistant needs to answer "who is this and how do I reach them". */
function identityBlock(siteInfo: SiteInfoContent, baseUrl: string): string[] {
  const lines: string[] = [];
  if (siteInfo.crp) lines.push(`- **Registro profissional:** ${siteInfo.crp}`);
  lines.push("- **Atendimento online:** todo o Brasil");
  if (siteInfo.region) lines.push(`- **Atendimento presencial:** ${siteInfo.region}`);
  if (siteInfo.address) lines.push(`- **Endereço:** ${siteInfo.address}`);
  if (siteInfo.email) lines.push(`- **E-mail:** ${siteInfo.email}`);
  if (siteInfo.whatsappNumber) lines.push(`- **WhatsApp:** ${siteInfo.whatsappNumber}`);
  lines.push(`- **Site:** ${baseUrl}/`);
  return lines;
}

/*
  The crisis notice. Deliberately near the top of both documents: if an
  assistant relays this site's content to someone in distress, the emergency
  routing should be part of what it relays, not a footer detail it truncated.
*/
function crisisBlock(siteInfo: SiteInfoContent): string[] {
  if (!siteInfo.crisis) return [];
  return ["## Em caso de crise", "", `> ${paragraph(siteInfo.crisis)}`, ""];
}

export function buildHomeMarkdown({ siteInfo, content, baseUrl }: HomeOptions): string {
  const lines: string[] = [];

  lines.push(`# ${siteInfo.name} — ${siteInfo.slogan}`);
  lines.push("");
  lines.push(`> ${paragraph(siteInfo.metaDescription)}`);
  lines.push("");
  lines.push(`URL canônica: ${baseUrl}/`);
  lines.push("");
  lines.push(...identityBlock(siteInfo, baseUrl));
  lines.push("");

  lines.push(...crisisBlock(siteInfo));

  if (content.hero.heading) {
    lines.push("## Apresentação");
    lines.push("");
    lines.push(paragraph(content.hero.heading));
    if (content.hero.sub) {
      lines.push("");
      lines.push(paragraph(content.hero.sub));
    }
    lines.push("");
  }

  if (content.comoAjuda.items.length > 0) {
    lines.push("## Como ajudo");
    lines.push("");
    for (const item of content.comoAjuda.items) {
      lines.push(`### ${item.title}`);
      lines.push("");
      lines.push(paragraph(item.body));
      lines.push("");
    }
  }

  if (content.sobre.intro) {
    lines.push("## Sobre Lucas");
    lines.push("");
    lines.push(paragraph(content.sobre.intro));
    lines.push("");
    lines.push(`Formação completa em ${baseUrl}/sobre (Markdown: ${baseUrl}/sobre.md).`);
    lines.push("");
  }

  if (content.servicos.items.length > 0) {
    lines.push("## Serviços");
    lines.push("");
    if (content.servicos.subtitle) {
      lines.push(paragraph(content.servicos.subtitle));
      lines.push("");
    }
    for (const s of content.servicos.items) {
      lines.push(`### ${s.label} — ${s.sublabel}`);
      lines.push("");
      lines.push(paragraph(s.framing));
      if (s.areas.length > 0) {
        lines.push("");
        for (const area of s.areas) lines.push(`- ${area}`);
      }
      lines.push("");
    }
  }

  if (content.faq.items.length > 0) {
    lines.push("## Perguntas frequentes");
    lines.push("");
    for (const f of content.faq.items) {
      lines.push(`### ${f.question}`);
      lines.push("");
      lines.push(paragraph(f.answer.join(" ")));
      lines.push("");
    }
  }

  lines.push("## Contato");
  lines.push("");
  if (content.contato.invite) {
    lines.push(paragraph(content.contato.invite));
    lines.push("");
  }
  if (content.contato.responseTimeLabel) {
    lines.push(
      `- **${content.contato.responseTimeLabel}:** ${paragraph(content.contato.responseTimeBody)}`,
    );
  }
  if (content.contato.sigiloLabel) {
    lines.push(`- **${content.contato.sigiloLabel}:** ${paragraph(content.contato.sigiloBody)}`);
  }
  if (siteInfo.email) lines.push(`- **E-mail:** ${siteInfo.email}`);
  if (siteInfo.whatsappNumber) lines.push(`- **WhatsApp:** ${siteInfo.whatsappNumber}`);
  lines.push(`- **Formulário de contato:** ${baseUrl}/#contato`);
  lines.push("");

  return `${lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

export function buildSobreMarkdown({ siteInfo, sobre, baseUrl }: SobreOptions): string {
  const lines: string[] = [];

  lines.push(`# Sobre ${siteInfo.name}`);
  lines.push("");
  lines.push(`> ${paragraph(sobre.lede)}`);
  lines.push("");
  lines.push(`URL canônica: ${baseUrl}/sobre`);
  lines.push("");
  lines.push(...identityBlock(siteInfo, baseUrl));
  lines.push("");

  lines.push(...crisisBlock(siteInfo));

  // Rich text when the CMS has it; the `**emphasis**` fallbacks pass through
  // as-is, since they are already valid Markdown here.
  const bodyParagraphs =
    sobre.body !== null ? lexicalToParagraphs(sobre.body) : sobre.bodyParagraphs;

  if (bodyParagraphs.length > 0) {
    lines.push("## Formação");
    lines.push("");
    for (const p of bodyParagraphs) {
      lines.push(paragraph(p));
      lines.push("");
    }
  }

  if (sobre.bottomCtaHeading) {
    lines.push(`## ${sobre.bottomCtaHeading}`);
    lines.push("");
    if (sobre.bottomCtaBody) {
      lines.push(paragraph(sobre.bottomCtaBody));
      lines.push("");
    }
    lines.push(`- **Formulário de contato:** ${baseUrl}/#contato`);
    if (siteInfo.whatsappNumber) lines.push(`- **WhatsApp:** ${siteInfo.whatsappNumber}`);
    if (siteInfo.email) lines.push(`- **E-mail:** ${siteInfo.email}`);
    lines.push("");
  }

  lines.push(`Página inicial: ${baseUrl}/ (Markdown: ${baseUrl}/index.md)`);
  lines.push("");

  return `${lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}
