import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const HomeSobre: GlobalConfig = {
  slug: "home-sobre",
  label: "Home — Sobre",
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
    { name: "intro", type: "textarea", required: true },
    {
      name: "body",
      type: "richText",
      required: true,
      admin: {
        description: "Conteúdo principal. Use o editor para parágrafos, negrito e ênfase.",
      },
    },
    {
      name: "ctaLabel",
      type: "text",
      required: true,
      admin: {
        description:
          "Texto do link que leva para /sobre (default: 'Saiba mais sobre meu percurso').",
      },
    },
  ],
};
