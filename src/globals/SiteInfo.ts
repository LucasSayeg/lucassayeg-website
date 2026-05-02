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
    { name: "name", type: "text", required: true, label: "Nome" },
    {
      name: "shortMark",
      type: "text",
      required: true,
      label: "Marca curta",
      admin: { description: "Marca curta exibida abaixo do nome no header (ex: 'Lucas S.')." },
    },
    { name: "slogan", type: "text", required: true, label: "Slogan" },
    {
      name: "region",
      type: "text",
      required: true,
      label: "Região",
      admin: { description: "Bairro · Cidade · UF (uso interno em copy)." },
    },
    {
      name: "address",
      type: "text",
      required: true,
      label: "Endereço",
      admin: { description: "Endereço completo exibido no rodapé." },
    },
    {
      name: "crp",
      type: "text",
      required: true,
      label: "CRP",
      admin: { description: "Registro CFP — formato 'CRP NN/NNNNN' (Resolução 010/2005)." },
    },
    {
      name: "crisis",
      type: "textarea",
      required: true,
      label: "Linha de crise",
      admin: {
        description:
          "Linha de crise (CVV/SAMU) exibida no rodapé. Compromisso ético — não remover.",
      },
    },
    { name: "email", type: "email", required: true, label: "E-mail" },
    {
      name: "whatsappNumber",
      type: "text",
      required: true,
      label: "Número do WhatsApp",
      admin: { description: "Apenas dígitos com código do país, ex: 5511999999999." },
    },
    {
      name: "whatsappPrefill",
      type: "textarea",
      required: true,
      label: "Mensagem inicial do WhatsApp",
      admin: { description: "Mensagem inicial pré-preenchida ao abrir o WhatsApp." },
    },
    {
      name: "portrait",
      type: "upload",
      relationTo: "media",
      label: "Retrato",
      admin: {
        description: "Foto editorial usada no /sobre e (quando disponível) na home — Hero e Sobre.",
      },
    },
    {
      name: "portraitAlt",
      type: "text",
      label: "Retrato — texto alternativo",
      admin: {
        description: "Cai de volta para o nome do site se vazio.",
      },
    },
  ],
};
