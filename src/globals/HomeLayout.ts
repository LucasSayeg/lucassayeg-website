import type { ArrayField, GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

const SECTION_KEYS = ["hero", "comoAjuda", "sobre", "servicos", "faq", "contato"] as const;

const sectionsField: ArrayField = {
  name: "sections",
  type: "array",
  minRows: 6,
  maxRows: 6,
  required: true,
  admin: {
    description:
      "Arraste para reordenar as seções da home. Desmarque 'Exibir' para esconder uma seção. 'Rótulo no menu de navegação' vazio = não aparece no menu de navegação.",
  },
  validate: (rows) => {
    const list = (rows ?? []) as Array<{ key?: string }>;
    const keys = list.map((r) => r?.key).filter((k): k is string => !!k);
    if (new Set(keys).size !== keys.length) return "Cada seção pode aparecer apenas uma vez.";
    if (!SECTION_KEYS.every((k) => keys.includes(k)))
      return "Todas as 6 seções devem estar listadas.";
    return true;
  },
  defaultValue: [
    { key: "hero", enabled: true, navLabel: "" },
    { key: "comoAjuda", enabled: true, navLabel: "Como ajuda" },
    { key: "sobre", enabled: true, navLabel: "Sobre" },
    { key: "servicos", enabled: true, navLabel: "Serviços" },
    { key: "faq", enabled: true, navLabel: "FAQ" },
    { key: "contato", enabled: true, navLabel: "Contato" },
  ],
  fields: [
    {
      name: "key",
      type: "select",
      required: true,
      options: [
        { label: "Hero", value: "hero" },
        { label: "Como ajuda", value: "comoAjuda" },
        { label: "Sobre", value: "sobre" },
        { label: "Serviços", value: "servicos" },
        { label: "FAQ", value: "faq" },
        { label: "Contato", value: "contato" },
      ],
    },
    { name: "enabled", type: "checkbox", defaultValue: true, label: "Exibir" },
    {
      name: "navLabel",
      type: "text",
      label: "Rótulo no menu de navegação",
      admin: {
        description: "Vazio = seção não aparece no menu de navegação (mas continua na página).",
      },
    },
  ],
};

export const HomeLayout: GlobalConfig = {
  slug: "home-layout",
  label: "Home — Ordem das seções",
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
  fields: [sectionsField],
};
