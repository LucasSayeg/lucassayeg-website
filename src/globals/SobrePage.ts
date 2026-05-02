import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const SobrePage: GlobalConfig = {
  slug: "sobre-page",
  label: "Sobre — Página",
  admin: { group: "Página /sobre" },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === "admin",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/sobre");
        } catch {
          // No-op outside a Next.js request context (e.g. during seeding).
        }
      },
    ],
  },
  fields: [
    {
      name: "lede",
      type: "textarea",
      required: true,
      label: "Lede",
      admin: {
        description: "Parágrafo curto ao lado do nome — primeira impressão da abordagem.",
      },
    },
    {
      name: "body",
      type: "richText",
      required: true,
      label: "Corpo — Formação",
      admin: {
        description:
          "Conteúdo principal da seção 'Formação'. Use o editor para parágrafos, negrito e ênfase.",
      },
    },
    { name: "bottomCtaHeading", type: "text", required: true, label: "CTA — Título" },
    { name: "bottomCtaBody", type: "textarea", required: true, label: "CTA — Convite" },
    {
      name: "bottomCtaWhatsappLabel",
      type: "text",
      required: true,
      label: "CTA — Botão WhatsApp",
    },
    {
      name: "bottomCtaFormLabel",
      type: "text",
      required: true,
      label: "CTA — Link Formulário",
    },
  ],
};
