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
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        {
          name: "answer",
          type: "array",
          minRows: 1,
          labels: { singular: "parágrafo", plural: "parágrafos" },
          admin: { description: "Cada item é um parágrafo da resposta." },
          fields: [{ name: "body", type: "textarea", required: true }],
        },
      ],
    },
  ],
};
