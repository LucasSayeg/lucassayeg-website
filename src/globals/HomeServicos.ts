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
    { name: "subtitle", type: "textarea", required: true, label: "Subtítulo" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      label: "Itens",
      labels: { singular: "item", plural: "itens" },
      fields: [
        {
          name: "id",
          type: "text",
          required: true,
          label: "Identificador",
          admin: {
            description: "Identificador estável (slug). Não exibido. Ex: 'clinica'.",
          },
        },
        { name: "label", type: "text", required: true, label: "Rótulo" },
        { name: "sublabel", type: "text", required: true, label: "Subrótulo" },
        { name: "framing", type: "textarea", required: true, label: "Enquadramento" },
        {
          name: "areas",
          type: "array",
          minRows: 1,
          label: "Áreas",
          labels: { singular: "área", plural: "áreas" },
          fields: [{ name: "value", type: "text", required: true, label: "Área" }],
        },
        {
          name: "illustration",
          type: "upload",
          relationTo: "media",
          label: "Ilustração",
          admin: {
            description:
              "Ilustração marginal ao lado do bloco do serviço. Quando vazio, renderiza o placeholder de esboço.",
          },
        },
        {
          name: "illustrationAlt",
          type: "text",
          label: "Ilustração — texto alternativo",
          admin: { description: "Deixe em branco se a ilustração for puramente decorativa." },
        },
      ],
    },
  ],
};
