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
    {
      name: "items",
      type: "array",
      minRows: 1,
      label: "Itens",
      labels: { singular: "item", plural: "itens" },
      admin: { description: "Arraste para reordenar. Cada item recebe um numeral (01–06)." },
      fields: [
        { name: "title", type: "text", required: true, label: "Título" },
        {
          name: "body",
          type: "textarea",
          required: true,
          label: "Descritor",
          admin: { description: "Uma linha curta — entre 8 e 14 palavras." },
        },
      ],
    },
  ],
};
