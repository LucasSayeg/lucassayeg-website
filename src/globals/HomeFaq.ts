import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const HomeFaq: GlobalConfig = {
  slug: "home-faq",
  label: "Home — FAQ",
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
    { name: "subtitle", type: "textarea", required: true, label: "Subtítulo" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      label: "Perguntas",
      labels: { singular: "pergunta", plural: "perguntas" },
      fields: [
        { name: "question", type: "text", required: true, label: "Pergunta" },
        {
          name: "answer",
          type: "array",
          minRows: 1,
          label: "Resposta",
          labels: { singular: "parágrafo", plural: "parágrafos" },
          admin: { description: "Cada item é um parágrafo da resposta." },
          fields: [{ name: "body", type: "textarea", required: true, label: "Parágrafo" }],
        },
      ],
    },
  ],
};
