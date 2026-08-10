import type { HomeContent, SiteInfoContent, SobrePageContent } from "@/lib/home-content-types";
import { lexicalToParagraphs, stripEmphasisMarkers } from "@/lib/lexical-text";

type Options = {
  siteInfo: SiteInfoContent;
  content: HomeContent;
  sobre: SobrePageContent;
  baseUrl: string;
};

/** A flat Markdown index of the site for AI agents (the llms.txt convention). */
export function buildLlmsTxt({ siteInfo, content, sobre, baseUrl }: Options): string {
  const lines: string[] = [];

  lines.push(`# ${siteInfo.name}`);
  lines.push("");
  lines.push(`> ${siteInfo.slogan}. ${content.hero.sub}`);
  lines.push("");
  if (siteInfo.crp) lines.push(`- Psicólogo — ${siteInfo.crp}`);
  lines.push(`- Atendimento: Online em todo o Brasil; Presencial em ${siteInfo.region}`);
  lines.push(`- Endereço: ${siteInfo.address}`);
  lines.push("");

  if (content.comoAjuda.items.length > 0) {
    lines.push("## Como ajudo");
    for (const item of content.comoAjuda.items) {
      lines.push(`- **${item.title}** — ${item.body}`);
    }
    lines.push("");
  }

  lines.push("## Serviços");
  for (const s of content.servicos.items) {
    lines.push(`- **${s.label} — ${s.sublabel}**: ${s.framing} (${s.areas.join(", ")})`);
  }
  lines.push("");

  const sobreBody =
    sobre.body !== null
      ? lexicalToParagraphs(sobre.body)
      : sobre.bodyParagraphs.map(stripEmphasisMarkers);
  lines.push("## Sobre / Formação");
  lines.push(sobre.lede);
  for (const paragraph of sobreBody) {
    lines.push("");
    lines.push(paragraph);
  }
  lines.push("");

  lines.push("## Perguntas frequentes");
  for (const f of content.faq.items) {
    lines.push(`- **${f.question}** ${f.answer.join(" ")}`);
  }
  lines.push("");

  lines.push("## Contato");
  lines.push(`- Site: ${baseUrl}/`);
  lines.push(`- Sobre Lucas: ${baseUrl}/sobre`);
  if (siteInfo.email) lines.push(`- E-mail: ${siteInfo.email}`);
  if (siteInfo.whatsappNumber) lines.push("- WhatsApp e formulário de contato no site.");
  lines.push("");

  /*
    The agent-facing surfaces, listed last so the substance above is read
    first. Both pages are also served as plain Markdown — an agent that needs
    a page's full text should fetch the .md rather than strip the HTML.
  */
  lines.push("## Recursos para agentes");
  lines.push(
    `- [Página inicial em Markdown](${baseUrl}/index.md): todo o conteúdo da home (como ajudo, serviços, FAQ, contato) sem HTML.`,
  );
  lines.push(
    `- [Sobre em Markdown](${baseUrl}/sobre.md): formação e trajetória de Lucas, sem HTML.`,
  );
  lines.push(
    `- [agent-permissions.json](${baseUrl}/agent-permissions.json): regras de acesso, atribuição e limites para clientes automatizados.`,
  );
  lines.push(`- [Sitemap](${baseUrl}/sitemap.xml): URLs canônicas e datas de atualização.`);
  lines.push("");

  return lines.join("\n");
}
