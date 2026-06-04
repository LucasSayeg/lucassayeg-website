import type { HomeContent, SiteInfoContent } from "@/lib/home-content-types";

type Options = {
  siteInfo: SiteInfoContent;
  content: HomeContent;
  baseUrl: string;
};

/** A flat Markdown index of the site for AI agents (the llms.txt convention). */
export function buildLlmsTxt({ siteInfo, content, baseUrl }: Options): string {
  const lines: string[] = [];

  lines.push(`# ${siteInfo.name}`);
  lines.push("");
  lines.push(`> ${siteInfo.slogan}. ${content.hero.sub}`);
  lines.push("");
  lines.push(`Atendimento ${content.hero.modalityOnline} e ${content.hero.modalityPresencial}.`);
  lines.push("");

  lines.push("## Serviços");
  for (const s of content.servicos.items) {
    lines.push(`- **${s.label} — ${s.sublabel}**: ${s.framing} (${s.areas.join(", ")})`);
  }
  lines.push("");

  lines.push("## Perguntas frequentes");
  for (const f of content.faq.items) {
    lines.push(`- **${f.question}** ${f.answer[0] ?? ""}`);
  }
  lines.push("");

  lines.push("## Contato");
  lines.push(`- Site: ${baseUrl}/`);
  lines.push(`- Sobre Lucas: ${baseUrl}/sobre`);
  if (siteInfo.whatsappNumber) lines.push("- WhatsApp e formulário de contato no site.");
  lines.push("");

  return lines.join("\n");
}
