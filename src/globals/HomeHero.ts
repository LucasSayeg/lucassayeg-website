import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const HomeHero: GlobalConfig = {
  slug: "home-hero",
  label: "Home — Hero",
  admin: { group: "Página inicial" },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === "admin",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/");
        } catch {
          // No-op outside a Next.js request context (e.g. during seeding).
        }
      },
    ],
  },
  fields: [
    { name: "heading", type: "textarea", required: true, label: "Título" },
    { name: "sub", type: "textarea", required: true, label: "Subtítulo" },
    { name: "modalityOnline", type: "text", required: true, label: "Modalidade online" },
    { name: "modalityPresencial", type: "text", required: true, label: "Modalidade presencial" },
    {
      name: "ctaWhatsapp",
      type: "text",
      required: true,
      label: "Botão WhatsApp (primário)",
      admin: { description: "Botão primário do hero (default: 'Conversar pelo WhatsApp')." },
    },
    {
      name: "cta",
      type: "text",
      required: true,
      label: "Botão de agendamento (secundário)",
      admin: {
        description:
          "Botão secundário do hero (default: 'Agendar uma conversa'). Aponta para o formulário.",
      },
    },
    {
      name: "quickPickIntro",
      type: "text",
      label: "Introdução dos chips",
      admin: {
        description:
          "Linha em itálico acima dos chips de tópicos no hero (ex: 'O que está pesando hoje?'). Vazio = não exibe.",
      },
    },
    {
      name: "quickPickTopics",
      type: "array",
      maxRows: 6,
      label: "Tópicos (chips)",
      labels: { singular: "tópico", plural: "tópicos" },
      admin: {
        description:
          "Até 6 palavras-tópico exibidas como chips no hero (ex: Ansiedade, Luto, Burnout). Cada chip abre o WhatsApp com a mensagem de prefill incluindo o tópico.",
      },
      fields: [{ name: "value", type: "text", required: true, label: "Tópico" }],
    },
  ],
};
