/*
  Canonical fallback values for site-wide identity, home content, and nav.
  Lives in `lib/` so both `ui/` (component defaults) and the resolver in
  `lib/home-content.ts` can import without crossing layer boundaries.

  These values are now fallbacks: in production the CMS supplies the
  authoritative copy and these strings render only when Payload is disabled
  (`PAYLOAD_ENABLED=false`) or the fetch fails. `/sobre` still consumes
  `SITE_META` and `SOBRE` from here as its only source.
*/

import { buildWhatsappHref } from "@/lib/whatsapp";

export const SITE_META = {
  name: "Lucas Sayeg",
  shortMark: "Lucas S.",
  slogan: "Psicólogo clínico e orientador profissional",
  region: "Vila Leopoldina, São Paulo",
  address: "Vila Leopoldina · São Paulo · SP",
  email: "",
  whatsappNumber: "",
  whatsappPrefill: "Olá, Lucas. Vim pelo seu site e gostaria de conversar.",
  crp: "",
  crisis:
    "Em caso de emergência ou risco imediato, ligue 188 (CVV) ou 192 (SAMU). Esses serviços oferecem escuta e atendimento 24 horas.",
} as const;

export const WHATSAPP_HREF = buildWhatsappHref(SITE_META.whatsappNumber, SITE_META.whatsappPrefill);

export const NAV_LINKS = [
  { href: "#como-ajuda", label: "Como ajuda" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
] as const;

export const HERO = {
  heading: "Sentindo-se com um vazio, perdido ou sobrecarregado?",
  sub: "A psicoterapia pode te ajudar a entender o que você está vivendo com mais clareza e profundidade.",
  ctaWhatsapp: "Conversar pelo WhatsApp",
  cta: "Agendar uma conversa",
  modality: {
    online: "Online",
    presencial: "Presencial em Vila Leopoldina, São Paulo",
  },
  quickPickIntro: "O que está pesando hoje?",
  quickPickTopics: [
    "Ansiedade",
    "Luto",
    "Burnout",
    "Relacionamentos",
    "Crise existencial",
    "Dúvida de carreira",
  ],
} as const;

export const COMO_AJUDA = {
  intro: "A psicoterapia atravessa muito do que talvez você esteja vivendo.",
  groups: [
    {
      label: "estados emocionais",
      words: [
        "ansiedade",
        "tristeza",
        "sensação de vazio",
        "culpa",
        "irritação",
        "desesperança",
        "angústia",
      ],
    },
    {
      label: "momentos de vida",
      words: ["luto", "término", "burnout", "crise existencial", "mudanças de vida", "traumas"],
    },
    {
      label: "padrões que se repetem",
      words: [
        "autossabotagem",
        "procrastinação",
        "medo excessivo",
        "explosões emocionais",
        "dependência emocional",
        "relacionamentos que machucam",
      ],
    },
    {
      label: "sensação de perda",
      words: ["perda de energia", "perda de identidade", "falta de sentido", "desconexão consigo"],
    },
  ],
  closing:
    "Um espaço para nomear o que sente, entender as causas, atravessar crises e reconstruir um senso próprio do que importa — antes que a vida se reduza ao que dói.",
} as const;

export const SOBRE = {
  intro:
    "Meu trabalho é te acompanhar nesse processo, para que você possa construir uma relação mais consciente com seus sentimentos, suas escolhas e sua própria vida.",
  paragraphs: [
    "Sou **psicólogo formado** pela Universidade de São Paulo (USP), com atuação clínica desde a graduação. Tenho experiência em plantão psicológico, incluindo atuação como supervisor clínico, acompanhando pessoas em momentos de crise, angústia intensa e situações de luto.",
    "Minha prática é voltada para um trabalho cuidadoso e aprofundado, respeitando o tempo de cada pessoa e buscando compreender o sentido das experiências vividas.",
    "Além da Psicologia, **também sou formado** em Administração pela Universidade de São Paulo, o que contribui para o trabalho com orientação profissional e processos de decisão de carreira.",
  ],
  cta: "Saiba mais sobre meu percurso",
} as const;

export const SOBRE_BOTTOM_CTA = {
  heading: "Vamos conversar.",
  body: "Me chame pelo WhatsApp ou pelo formulário do início.",
  whatsappLabel: "Conversar pelo WhatsApp",
  formLabel: "Voltar ao formulário",
} as const;

export const SERVICOS_SUBTITLE =
  "Dois trabalhos próximos, com escutas distintas. O primeiro contato ajuda a decidir qual faz mais sentido para você.";

export const SERVICOS = [
  {
    id: "clinica",
    label: "Psicoterapia",
    sublabel: "Clínica",
    framing:
      "Acompanhamento psicoterapêutico individual, aprofundado e contínuo, voltado para adultos.",
    items: [
      "ansiedade",
      "depressão",
      "luto (morte ou término)",
      "estresse",
      "sensação de vazio e falta de sentido",
      "medo, insegurança, baixa autoestima",
    ],
    illustration: {
      concept:
        "A sala — uma cadeira, uma janela, o tempo que passa entre as palavras. Interior lento.",
    },
  },
  {
    id: "orientacao",
    label: "Orientação",
    sublabel: "Profissional",
    framing:
      "Acompanhamento estruturado para quem enfrenta uma decisão de carreira ou repensa o lugar do trabalho em sua vida.",
    items: [
      "dúvida de carreira",
      "escolha de profissão",
      "transição profissional",
      "insatisfação com o trabalho atual",
      "falta de sentido naquilo que faz",
    ],
    illustration: {
      concept: "A bússola sobre a mesa, virada na direção certa — instrumento, não jornada.",
    },
  },
] as const;

export const FAQ_SUBTITLE = "O que costumam querer saber antes da primeira conversa.";

export const FAQ_ITEMS: ReadonlyArray<{ q: string; a: string[] }> = [
  {
    q: "Como funciona o agendamento?",
    a: [
      "O primeiro contato pode ser feito pelo formulário acima ou pelo WhatsApp. Costumo responder pessoalmente em até um dia útil para combinarmos uma conversa inicial.",
      "Depois desse primeiro encontro, definimos juntos a frequência e o horário fixo das sessões.",
    ],
  },
  {
    q: "Qual o valor da consulta?",
    a: [
      "O valor é combinado no primeiro contato e leva em conta a frequência e a modalidade. Se preferir saber antes de marcar, é só me chamar pelo formulário ou pelo WhatsApp.",
    ],
  },
  {
    q: "Atende online e presencial?",
    a: [
      "Sim, atendo nas duas modalidades. Online em todo o Brasil; presencial em Vila Leopoldina, São Paulo. O endereço completo é enviado após o primeiro contato.",
    ],
  },
  {
    q: "Qual público você atende?",
    a: [
      "Atendo principalmente adultos — seja em demanda clínica, seja em orientação profissional. Se você não tem certeza se sua questão se encaixa no meu trabalho, me escreva: conversamos antes de combinar qualquer coisa.",
    ],
  },
  {
    q: "Você atende por plano de saúde?",
    a: [
      "No momento, atendo apenas como prestador particular. Posso emitir recibo para reembolso junto ao seu plano, conforme as regras do seu convênio.",
    ],
  },
  {
    q: "Com que frequência ocorrem as sessões?",
    a: [
      "Em geral, atendo em frequência semanal — esse ritmo costuma ser o mais produtivo para um trabalho consistente. Em casos específicos, podemos combinar uma frequência diferente.",
    ],
  },
] as const;

export const CONTATO = {
  heading: "Vamos conversar.",
  invite:
    "Conte um pouco sobre o que está te trazendo aqui. Não é preciso explicar tudo — algumas linhas já bastam para combinarmos uma conversa. Mensagens são respondidas pessoalmente e tratadas com sigilo.",
  responseTimeLabel: "Tempo de resposta",
  responseTimeBody: "Respondo pessoalmente, em geral em até um dia útil.",
  whatsappBlockLabel: "WhatsApp",
  whatsappPrompt: "Prefere conversar pelo WhatsApp?",
  whatsappLabel: "Iniciar conversa no WhatsApp",
  sigiloLabel: "Sigilo",
  sigiloBody: "Apenas eu recebo. Tratadas com sigilo.",
} as const;

export const CONTACT_FORM = {
  ariaLabel: "Formulário de contato",
  nameLabel: "Nome",
  namePlaceholder: "Como você gostaria de ser chamado(a)",
  nameValidHint: "Bom te conhecer.",
  emailLabel: "E-mail",
  emailPlaceholder: "seuemail@exemplo.com",
  emailValidHint: "Anotado.",
  messageLabel: "Mensagem",
  messagePlaceholder:
    "Conte um pouco sobre o que está te trazendo aqui — algumas linhas já bastam.",
  messageValidHint: "Grato pela mensagem.",
  disclaimer: "Mensagens chegam apenas para mim. Nenhum cadastro, nenhum disparo.",
  requiredHint: "campos obrigatórios",
  submitLabel: "Enviar mensagem",
  submitLoadingLabel: "Enviando…",
  successHeading: "Obrigado pela sua mensagem.",
  successBody:
    "Lucas responderá pessoalmente em até um dia útil. Em geral, é uma proposta de horário ou algumas perguntas para entender melhor o que está te trazendo aqui — você pode responder no seu tempo.",
  successWhatsappPrompt: "Se preferir uma conversa mais imediata, você pode me chamar pelo",
  successWhatsappLabel: "WhatsApp",
  successResetLabel: "Enviar outra mensagem",
} as const;

export const FOOTER = {
  rights: `© ${new Date().getFullYear()} ${SITE_META.name}. Todos os direitos reservados.`,
} as const;
