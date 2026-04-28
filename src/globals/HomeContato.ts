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
    { name: "heading", type: "text", required: true },
    { name: "invite", type: "textarea", required: true },
    {
      name: "whatsappPrompt",
      type: "text",
      required: true,
      admin: {
        description:
          "Frase ao lado do link de WhatsApp (default: 'Prefere conversar pelo WhatsApp?').",
      },
    },
    {
      name: "whatsappLabel",
      type: "text",
      required: true,
      admin: {
        description: "Texto do link de WhatsApp (default: 'Iniciar conversa no WhatsApp').",
      },
    },
    {
      name: "crisis",
      type: "textarea",
      required: true,
      admin: { description: "Linha de crise (CVV/SAMU). Compromisso ético — não remover." },
    },
  ],
};
