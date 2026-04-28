import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const HomeServicos: GlobalConfig = {
  slug: "home-servicos",
  label: "Home — Serviços",
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
        {
          name: "id",
          type: "text",
          required: true,
          admin: {
            description: "Identificador estável (slug). Não exibido. Ex: 'clinica'.",
          },
        },
        { name: "label", type: "text", required: true },
        { name: "sublabel", type: "text", required: true },
        { name: "framing", type: "textarea", required: true },
        {
          name: "areas",
          type: "array",
          minRows: 1,
          labels: { singular: "área", plural: "áreas" },
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
  ],
};
