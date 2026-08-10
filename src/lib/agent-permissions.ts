/*
  agent-permissions.json — declarative access rules for automated clients.

  Caveat worth keeping in the file: this is an *emerging* convention, not a
  ratified standard, and no major agent is known to enforce it today. It is
  cheap to serve and self-describing, so it costs nothing if adoption stalls;
  robots.txt (src/app/robots.ts) remains the authoritative access control and
  the two must not disagree. If this ever contradicts robots.txt, robots.txt
  wins — so PRIVATE_PATHS there and `disallow` here are kept in sync by hand.

  The `notes` field is included on purpose: an unknown consumer that can't
  parse the schema can still read a plain-language statement of intent.
*/

type Options = {
  baseUrl: string;
  contactEmail: string;
};

export function buildAgentPermissions({ baseUrl, contactEmail }: Options): unknown {
  return {
    version: "0.1",
    site: baseUrl,
    ...(contactEmail ? { contact: contactEmail } : {}),
    notes:
      "Site institucional de um psicólogo/psicanalista brasileiro. O conteúdo é " +
      "público e pode ser lido, citado e usado para responder perguntas, desde que " +
      "a fonte seja atribuída e o texto não seja apresentado como aconselhamento " +
      "clínico. Não há API pública. /admin e /api são privados.",
    access: {
      allow: ["/"],
      // Mirrors PRIVATE_PATHS in src/app/robots.ts.
      disallow: ["/admin", "/api"],
    },
    permissions: {
      read: true,
      quote: true,
      index: true,
      train: true,
      // There is nothing to act on: no accounts, no bookings, no public API.
      // Human contact runs through the form, WhatsApp or e-mail.
      transact: false,
      automated_form_submission: false,
    },
    attribution: {
      required: true,
      name: "Lucas Sayeg",
      url: baseUrl,
    },
    rate_limit: {
      requests_per_minute: 60,
      notes: "Site estático de duas páginas; não é necessário rastrear com frequência.",
    },
    // Where an agent should look instead of scraping rendered HTML.
    preferred_resources: [
      {
        url: `${baseUrl}/llms.txt`,
        type: "text/markdown",
        description: "Índice do site em Markdown: serviços, formação, FAQ e contato.",
      },
      {
        url: `${baseUrl}/index.md`,
        type: "text/markdown",
        description: "Página inicial completa em Markdown, sem HTML.",
      },
      {
        url: `${baseUrl}/sobre.md`,
        type: "text/markdown",
        description: "Página 'Sobre' (formação e trajetória) em Markdown, sem HTML.",
      },
      {
        url: `${baseUrl}/sitemap.xml`,
        type: "application/xml",
        description: "Sitemap com as URLs canônicas e datas de atualização.",
      },
    ],
  };
}
