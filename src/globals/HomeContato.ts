import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const HomeContato: GlobalConfig = {
  slug: "home-contato",
  label: "Home — Contato",
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
    { name: "heading", type: "text", required: true, label: "Título" },
    { name: "invite", type: "textarea", required: true, label: "Convite" },
    {
      name: "responseTimeLabel",
      type: "text",
      required: true,
      label: "Rótulo do tempo de resposta",
      admin: {
        description: "Rótulo do bloco lateral (default: 'Tempo de resposta').",
      },
    },
    {
      name: "responseTimeBody",
      type: "textarea",
      required: true,
      label: "Texto do tempo de resposta",
      admin: {
        description:
          "Texto do bloco de tempo de resposta (default: 'Respondo pessoalmente, em geral em até um dia útil.').",
      },
    },
    {
      name: "whatsappBlockLabel",
      type: "text",
      required: true,
      label: "Rótulo do bloco WhatsApp",
      admin: {
        description: "Rótulo do bloco lateral de WhatsApp (default: 'WhatsApp').",
      },
    },
    {
      name: "whatsappPrompt",
      type: "text",
      required: true,
      label: "Frase do WhatsApp",
      admin: {
        description:
          "Frase ao lado do link de WhatsApp (default: 'Prefere conversar pelo WhatsApp?').",
      },
    },
    {
      name: "whatsappLabel",
      type: "text",
      required: true,
      label: "Texto do link WhatsApp",
      admin: {
        description: "Texto do link de WhatsApp (default: 'Iniciar conversa no WhatsApp').",
      },
    },
    {
      name: "sigiloLabel",
      type: "text",
      required: true,
      label: "Rótulo do sigilo",
      admin: {
        description: "Rótulo do bloco lateral de sigilo (default: 'Sigilo').",
      },
    },
    {
      name: "sigiloBody",
      type: "textarea",
      required: true,
      label: "Texto do sigilo",
      admin: {
        description:
          "Texto do bloco de sigilo (default: 'Apenas eu recebo. Tratadas com sigilo.').",
      },
    },
  ],
};
