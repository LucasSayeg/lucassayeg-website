import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const HomeComoAjuda: GlobalConfig = {
  slug: "home-como-ajuda",
  label: "Home — Como ajuda",
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
    { name: "closing", type: "textarea", required: true },
    {
      name: "groups",
      type: "array",
      minRows: 1,
      admin: { description: "Arraste para reordenar." },
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "words",
          type: "array",
          minRows: 1,
          labels: { singular: "palavra", plural: "palavras" },
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
  ],
};
