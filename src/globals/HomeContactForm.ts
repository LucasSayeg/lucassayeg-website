import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

/*
  Editorial copy for the contact form. Trivial UI strings (field labels,
  submit button text, success-state link/reset labels, ARIA label, the
  required-fields hint) live as constants in `lib/home-data.ts` —
  structural rather than editorial, so not surfaced to the CMS.
*/
export const HomeContactForm: GlobalConfig = {
  slug: "home-contact-form",
  label: "Home — Formulário de contato",
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
      name: "namePlaceholder",
      type: "text",
      required: true,
      label: "Placeholder do nome",
      admin: {
        description: "Placeholder do campo nome (default: 'Como você gostaria de ser chamado(a)').",
      },
    },
    {
      name: "nameValidHint",
      type: "text",
      required: true,
      label: "Aviso após preencher o nome",
      admin: {
        description:
          "Aviso editorial discreto exibido após preencher o campo nome (default: 'Bom te conhecer.').",
      },
    },
    {
      name: "emailPlaceholder",
      type: "text",
      required: true,
      label: "Placeholder do e-mail",
      admin: {
        description: "Placeholder do campo e-mail (default: 'seuemail@exemplo.com').",
      },
    },
    {
      name: "emailValidHint",
      type: "text",
      required: true,
      label: "Aviso após preencher o e-mail",
      admin: {
        description: "Aviso após preencher o e-mail (default: 'Anotado.').",
      },
    },
    {
      name: "messagePlaceholder",
      type: "textarea",
      required: true,
      label: "Placeholder da mensagem",
      admin: {
        description:
          "Placeholder do campo mensagem (default: 'Conte um pouco sobre o que está te trazendo aqui — algumas linhas já bastam.').",
      },
    },
    {
      name: "messageValidHint",
      type: "text",
      required: true,
      label: "Aviso após preencher a mensagem",
      admin: {
        description: "Aviso após preencher a mensagem (default: 'Grato pela mensagem.').",
      },
    },
    {
      name: "disclaimer",
      type: "textarea",
      required: true,
      label: "Aviso de privacidade",
      admin: {
        description:
          "Linha discreta acima do botão (default: 'Mensagens chegam apenas para mim. Nenhum cadastro, nenhum disparo.').",
      },
    },
    {
      name: "successHeading",
      type: "text",
      required: true,
      label: "Título da tela de sucesso",
      admin: {
        description: "Título da mensagem de sucesso (default: 'Obrigado pela sua mensagem.').",
      },
    },
    {
      name: "successBody",
      type: "textarea",
      required: true,
      label: "Corpo da tela de sucesso",
      admin: {
        description:
          "Corpo da mensagem de sucesso (default: 'Lucas responderá pessoalmente em até um dia útil. Em geral, é uma proposta de horário ou algumas perguntas para entender melhor o que está te trazendo aqui — você pode responder no seu tempo.').",
      },
    },
    {
      name: "successWhatsappPrompt",
      type: "textarea",
      required: true,
      label: "Frase do WhatsApp na tela de sucesso",
      admin: {
        description:
          "Texto introdutório ao link de WhatsApp na tela de sucesso (default: 'Se preferir uma conversa mais imediata, você pode me chamar pelo').",
      },
    },
  ],
};
