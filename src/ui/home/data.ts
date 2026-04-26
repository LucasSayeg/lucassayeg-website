/*
  Hardcoded home content. Lucas-confirmed copy lives here until extraction
  to Payload. Keep all user-facing strings in pt-BR.
*/

export const SITE_META = {
  name: "Lucas Sayeg",
  shortMark: "Lucas S.",
  slogan: "Psicólogo clínico e orientador profissional",
  region: "Vila Leopoldina, São Paulo",
  // Placeholder — Lucas to confirm full street address.
  address: "Vila Leopoldina · São Paulo · SP",
  email: "contato@example.com",
  whatsappNumber: "55XXXXXXXXXXX",
  whatsappPrefill: "Olá, Lucas. Vim pelo seu site e gostaria de conversar.",
  // Placeholder — required by CFP Resolução 010/2005.
  crp: "CRP 00/00000",
} as const;

export const NAV_LINKS = [
  { href: "#como-ajuda", label: "Como ajuda" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
] as const;

export const HERO = {
  heading: "Sentindo-se com um vazio, perdido ou sobrecarregado?",
  sub: "A psicoterapia pode te ajudar a entender o que você está vivendo com mais clareza e profundidade.",
  cta: "Agendar uma conversa",
  modality: {
    primary: "Atendimento online",
    secondary: "também presencial em Vila Leopoldina, São Paulo",
  },
} as const;

export const COMO_AJUDA: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Compreender o que você está sentindo",
    body: "Há momentos em que as emoções ficam confusas, contraditórias ou difíceis de nomear. A psicoterapia oferece um espaço para olhar com calma para o que se passa por dentro — e dar contorno ao que parecia fora de controle.",
  },
  {
    title: "Atravessar momentos de crise e luto",
    body: "Perdas, rupturas e transições difíceis raramente seguem uma linha reta. Tenho experiência em plantão psicológico e acompanho pessoas em situações de crise, angústia intensa e luto — sempre respeitando o tempo que cada processo exige.",
  },
  {
    title: "Diminuir a ansiedade e a sensação de sobrecarga",
    body: "Quando a vida cotidiana começa a pesar mais do que deveria, a terapia ajuda a desacelerar — não para fugir, mas para escutar o que esse cansaço está dizendo. Trabalhamos juntos para reconhecer padrões que esgotam e encontrar formas mais sustentáveis de viver.",
  },
  {
    title: "Reencontrar sentido naquilo que faz",
    body: "A sensação de vazio ou de estar em piloto automático costuma indicar uma desconexão entre o que você faz e o que importa para você. Em terapia, é possível investigar essa distância — e voltar a habitar suas próprias escolhas.",
  },
  {
    title: "Construir uma relação mais consciente consigo",
    body: "Conhecer-se não é introspecção solitária; é um trabalho cuidadoso, feito com outra pessoa. Aos poucos, aquilo que se repetia sem ser percebido começa a ter palavra, lugar, história — e perde o caráter compulsivo.",
  },
  {
    title: "Tomar decisões importantes com mais clareza",
    body: "Mudanças de carreira, escolhas profissionais, transições pessoais. A orientação profissional combinada à clínica permite olhar para a decisão dentro do contexto maior de sua vida — não como um cálculo isolado, mas como uma escolha que diz quem você é.",
  },
] as const;

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
  },
  {
    id: "orientacao",
    label: "Orientação",
    sublabel: "Profissional",
    framing:
      "Acompanhamento estruturado para quem está diante de uma decisão de carreira ou repensa o lugar que o trabalho ocupa em sua vida.",
    items: [
      "dúvida de carreira",
      "escolha de profissão",
      "transição profissional",
      "insatisfação com o trabalho atual",
      "falta de sentido naquilo que faz",
    ],
  },
] as const;

export const FAQ_ITEMS: ReadonlyArray<{ q: string; a: string[] }> = [
  {
    q: "Quanto tempo dura cada sessão?",
    a: [
      "Cada sessão tem duração de cerca de 50 minutos. Esse tempo é pensado para permitir um trabalho aprofundado sem que a conversa se torne dispersa.",
      "Em situações específicas — como avaliações iniciais ou processos de orientação profissional — podemos combinar uma duração diferente. Conversamos sobre isso no primeiro contato.",
    ],
  },
  {
    q: "Como funciona o agendamento?",
    a: [
      "O primeiro contato pode ser feito pelo formulário acima ou pelo WhatsApp. Costumo responder pessoalmente em até um dia útil para combinarmos uma conversa inicial.",
      "Depois desse primeiro encontro, definimos juntos a frequência e o horário fixo das sessões.",
    ],
  },
  {
    q: "Com que frequência ocorrem as sessões?",
    a: [
      "Em geral, atendo em frequência semanal — esse ritmo costuma ser o mais produtivo para um trabalho psicoterapêutico consistente.",
      "Em alguns casos, podemos combinar uma frequência diferente; isso é discutido a partir do que faz sentido para o seu processo.",
    ],
  },
  {
    q: "Quanto tempo leva para ver resultados?",
    a: [
      "A psicoterapia não é um processo linear nem padronizado: cada pessoa tem seu próprio tempo. Algumas mudanças aparecem cedo, outras só com mais escuta e travessia.",
      "O que posso garantir é que o trabalho não tem como objetivo entregar respostas rápidas, e sim ajudar você a se relacionar melhor com aquilo que está vivendo.",
    ],
  },
  {
    q: "Qual o valor da consulta?",
    a: [
      "O valor é combinado no primeiro contato e leva em conta a frequência e a modalidade do atendimento.",
      "Se preferir saber antes de marcar a primeira conversa, é só me chamar pelo formulário ou pelo WhatsApp.",
    ],
  },
  {
    q: "Você atende por plano de saúde?",
    a: [
      "No momento, atendo apenas como prestador particular. Posso emitir recibo para reembolso junto ao seu plano, conforme as regras do seu convênio.",
    ],
  },
  {
    q: "Qual público você atende?",
    a: [
      "Atendo principalmente adultos — seja em demanda clínica, seja em orientação profissional. Se você não tem certeza se sua questão se encaixa no meu trabalho, me escreva: conversamos antes de combinar qualquer coisa.",
    ],
  },
  {
    q: "Você atende presencial?",
    a: [
      "Sim. Os atendimentos presenciais acontecem em Vila Leopoldina, São Paulo. O endereço completo é enviado após o primeiro contato.",
      "A maior parte dos atendimentos hoje é online, mas a modalidade presencial segue disponível para quem prefere.",
    ],
  },
] as const;

export const CONTATO = {
  heading: "Vamos conversar",
  lede: "Mensagens são confidenciais e respondidas pessoalmente por Lucas.",
  whatsappPrompt: "Prefere conversar pelo WhatsApp?",
  whatsappLabel: "Iniciar conversa no WhatsApp",
  // Placeholder — Lucas writes the final crisis line.
  crisis:
    "Em caso de emergência ou risco imediato, ligue 188 (CVV) ou 192 (SAMU). Esses serviços oferecem escuta e atendimento 24 horas.",
} as const;

export const FOOTER = {
  rights: `© ${new Date().getFullYear()} ${SITE_META.name}. Todos os direitos reservados.`,
} as const;
