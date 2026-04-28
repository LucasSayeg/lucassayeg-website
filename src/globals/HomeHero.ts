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
    { name: "heading", type: "textarea", required: true },
    { name: "sub", type: "textarea", required: true },
    { name: "modalityOnline", type: "text", required: true },
    { name: "modalityPresencial", type: "text", required: true },
    {
      name: "ctaWhatsapp",
      type: "text",
      required: true,
      admin: { description: "Botão primário do hero (default: 'Conversar pelo WhatsApp')." },
    },
    {
      name: "cta",
      type: "text",
      required: true,
      admin: {
        description:
          "Botão secundário do hero (default: 'Agendar uma conversa'). Aponta para o formulário.",
      },
    },
  ],
};
