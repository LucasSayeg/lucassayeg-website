import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

export const SiteInfo: GlobalConfig = {
  slug: "site-info",
  label: "Identidade do site",
  admin: { group: "Site" },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === "admin",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/");
          revalidatePath("/sobre");
        } catch {
          // No-op outside a Next.js request context (e.g. during seeding).
        }
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "shortMark",
      type: "text",
      required: true,
      admin: { description: "Marca curta exibida abaixo do nome no header (ex: 'Lucas S.')." },
    },
    { name: "slogan", type: "text", required: true },
    {
      name: "region",
      type: "text",
      required: true,
      admin: { description: "Bairro · Cidade · UF (uso interno em copy)." },
    },
    {
      name: "address",
      type: "text",
      required: true,
      admin: { description: "Endereço completo exibido no rodapé." },
    },
    {
      name: "crp",
      type: "text",
      required: true,
      admin: { description: "Registro CFP — formato 'CRP NN/NNNNN' (Resolução 010/2005)." },
    },
    { name: "email", type: "email", required: true },
    {
      name: "whatsappNumber",
      type: "text",
      required: true,
      admin: { description: "Apenas dígitos com código do país, ex: 5511999999999." },
    },
    {
      name: "whatsappPrefill",
      type: "textarea",
      required: true,
      admin: { description: "Mensagem inicial pré-preenchida ao abrir o WhatsApp." },
    },
  ],
};
