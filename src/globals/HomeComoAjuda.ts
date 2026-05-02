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
    { name: "intro", type: "textarea", required: true, label: "Introdução" },
    { name: "closing", type: "textarea", required: true, label: "Encerramento" },
    {
      name: "groups",
      type: "array",
      minRows: 1,
      label: "Grupos",
      labels: { singular: "grupo", plural: "grupos" },
      admin: { description: "Arraste para reordenar." },
      fields: [
        { name: "label", type: "text", required: true, label: "Rótulo" },
        {
          name: "words",
          type: "array",
          minRows: 1,
          label: "Palavras",
          labels: { singular: "palavra", plural: "palavras" },
          fields: [{ name: "value", type: "text", required: true, label: "Palavra" }],
        },
      ],
    },
  ],
};
