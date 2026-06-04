import type { Locale } from "./config";

export interface Dictionary {
  nav: { about: string; home: string };
  hero: { overline: string; headline: string; tagline: string; portraitAlt: string };
  bio: { heading: string; paragraphs: string[]; highlights: string[] };
  timeline: {
    heading: string;
    expand: string;
    collapse: string;
    entries: Record<string, { title: string; desc: string }>;
  };
  stack: { heading: string; items: string[]; caption: string };
  contact: { heading: string; lead: string; cta: string };
  footer: { tagline: string; credit: string };
  visitor: {
    title: string;
    leaveMark: string;
    locating: string;
    saving: string;
    denied: string;
    retry: string;
    onMap: string;
  };
  emoji: {
    search: string;
    noResults: string;
    results: string;
    pickLabel: string;
    categories: Record<string, string>;
  };
  controls: {
    theme: string;
    soundEnable: string;
    soundMute: string;
    switchLanguage: string;
    expandPhoto: string;
  };
  meta: { aboutTitle: string; aboutDescription: string; siteDescription: string };
}

const en: Dictionary = {
  nav: { about: "About", home: "home" },
  hero: {
    overline: "Software Engineer · Brazil",
    headline: "I build high-trust interfaces and memorable experiences.",
    tagline:
      "Frontend engineer focused on React and TypeScript. Real-time fintech is where I sharpened the craft, and I bring that same care to every product I build.",
    portraitAlt: "Marcos Lott presenting at Avenue",
  },
  bio: {
    heading: "Who I am",
    paragraphs: [
      "I'm a frontend engineer focused on the space between product and systems. At Avenue I work on investment and trading flows across equities, ETFs, funds, fixed income, and UCITS, supporting $620M+ in monthly volume and 200k+ orders a month.",
      "My core is React and TypeScript, but the interesting problems are rarely just UI. Real-time data, resilient streaming, typed state, and design systems that survive change. I architected and shipped UCITS Web, a European funds trading experience that generated $161k in commissions in its first four months.",
      "I treat AI as engineering leverage, not a shortcut. I've used Cursor and Claude to accelerate a real design system migration while keeping standards, review, and architecture in human hands.",
      "And I care about the details that never show up in a diff. The easing on a transition, the contrast ratio in dark mode, the latency a person actually feels.",
    ],
    highlights: ["UCITS Web", "engineering leverage"],
  },
  timeline: {
    heading: "Timeline",
    expand: "See the full timeline",
    collapse: "Show less",
    entries: {
      ufmg: {
        title: "Started at UFMG",
        desc: "Began Information Systems at the Federal University of Minas Gerais, the largest CS university in Latin America.",
      },
      formulaTesla: {
        title: "Joined Fórmula Tesla",
        desc: "Built software as a full stack developer on the electric racing team.",
      },
      dito: {
        title: "Joined Dito CRM",
        desc: "Started as a frontend developer on a CRM and marketing platform.",
      },
      tdc2023: {
        title: "TDC 2023",
        desc: "Attended The Developers Conference for the first time.",
      },
      avenue: {
        title: "Joined Avenue",
        desc: "Started as a frontend engineer on investment and trading products.",
      },
      braziljs: {
        title: "BrazilJS",
        desc: "Attending BrazilJS was a milestone for me.",
      },
      tdcBts: {
        title: "TDC, backstage",
        desc: "Helped build one of the conference talks behind the scenes.",
      },
      graduation: {
        title: "Graduated",
        desc: "Finished my degree in Information Systems.",
      },
      building: {
        title: "Yet building 🔧",
        desc: "The story continues.",
      },
    },
  },
  stack: {
    heading: "Working with",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Redux Toolkit",
      "Real-time data",
      "Design systems",
      "Node.js",
      "AI-assisted workflows",
    ],
    caption: "A pragmatic toolkit, chosen per problem, not per trend.",
  },
  contact: {
    heading: "Have a problem worth solving?",
    lead: "I'm open to international teams that care about craft, from frontend to real-time systems and product engineering.",
    cta: "Get in touch",
  },
  footer: {
    tagline: "Built with clarity. Open to a good conversation.",
    credit: "Built with Next.js and a lot of coffee ☕",
  },
  visitor: {
    title: "Visitors around the world",
    leaveMark: "Leave your mark",
    locating: "Locating…",
    saving: "Saving…",
    denied: "I need your location to put you on the map 📍",
    retry: "Try again",
    onMap: "You're on the map. Thanks for stopping by.",
  },
  emoji: {
    search: "Search emoji",
    noResults: "No emoji found.",
    results: "Results",
    pickLabel: "Choose an emoji",
    categories: {
      smileys: "Smileys",
      gestures: "People",
      nature: "Animals & Nature",
      food: "Food & Drink",
      travel: "Travel & Places",
      activities: "Activities",
      objects: "Objects",
      symbols: "Symbols",
    },
  },
  controls: {
    theme: "Toggle color theme",
    soundEnable: "Enable interface sounds",
    soundMute: "Mute interface sounds",
    switchLanguage: "Mudar para português",
    expandPhoto: "Expand photo",
  },
  meta: {
    aboutTitle: "About",
    aboutDescription:
      "Frontend engineer building high-trust interfaces and memorable experiences with React and TypeScript.",
    siteDescription:
      "Software Engineer. High-trust interfaces, memorable experiences, and AI-assisted engineering.",
  },
};

const pt: Dictionary = {
  nav: { about: "Sobre", home: "início" },
  hero: {
    overline: "Engenheiro de Software · Brasil",
    headline: "Construo interfaces de alta confiança e experiências marcantes.",
    tagline:
      "Engenheiro frontend focado em React e TypeScript. A fintech em tempo real foi onde afiei o ofício, e levo o mesmo cuidado para todo produto que construo.",
    portraitAlt: "Marcos Lott apresentando na Avenue",
  },
  bio: {
    heading: "Quem sou",
    paragraphs: [
      "Sou engenheiro frontend focado no espaço entre produto e sistemas. Na Avenue trabalho em fluxos de investimento e trading entre ações, ETFs, fundos, renda fixa e UCITS, sustentando mais de US$ 620M em volume mensal e 200 mil ordens por mês.",
      "Meu núcleo é React e TypeScript, mas os problemas interessantes raramente são só de interface. Dados em tempo real, streaming resiliente, estado tipado e design systems que sobrevivem a mudanças. Arquitetei e entreguei o UCITS Web, uma experiência de negociação de fundos europeus que gerou US$ 161 mil em comissões nos primeiros quatro meses.",
      "Trato IA como alavanca de engenharia, não como atalho. Usei Cursor e Claude para acelerar uma migração real de design system mantendo padrões, revisão e arquitetura sob controle humano.",
      "E cuido dos detalhes que nunca aparecem num diff. A curva de uma transição, o contraste no modo escuro, a latência que a pessoa realmente sente.",
    ],
    highlights: ["UCITS Web", "alavanca de engenharia"],
  },
  timeline: {
    heading: "Trajetória",
    expand: "Ver trajetória completa",
    collapse: "Mostrar menos",
    entries: {
      ufmg: {
        title: "Entrei na UFMG",
        desc: "Comecei Sistemas de Informação na Universidade Federal de Minas Gerais, a maior universidade de CS da América Latina.",
      },
      formulaTesla: {
        title: "Entrei na Fórmula Tesla",
        desc: "Desenvolvi software como full stack na equipe de corrida elétrica.",
      },
      dito: {
        title: "Entrei na Dito CRM",
        desc: "Comecei como desenvolvedor frontend numa plataforma de CRM e marketing.",
      },
      tdc2023: {
        title: "TDC 2023",
        desc: "Assisti ao The Developers Conference pela primeira vez.",
      },
      avenue: {
        title: "Entrei na Avenue",
        desc: "Comecei como engenheiro frontend em produtos de investimento e trading.",
      },
      braziljs: {
        title: "BrazilJS",
        desc: "Participar do BrazilJS foi um marco na minha vida.",
      },
      tdcBts: {
        title: "TDC, nos bastidores",
        desc: "Ajudei a construir uma das apresentações da conferência.",
      },
      graduation: {
        title: "Me formei",
        desc: "Concluí a graduação em Sistemas de Informação.",
      },
      building: {
        title: "Ainda construindo 🔧",
        desc: "A história continua.",
      },
    },
  },
  stack: {
    heading: "Stack",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Redux Toolkit",
      "Dados em tempo real",
      "Design systems",
      "Node.js",
      "Fluxos com IA",
    ],
    caption: "Um conjunto pragmático, escolhido por problema, não por tendência.",
  },
  contact: {
    heading: "Tem um problema que vale a pena resolver?",
    lead: "Estou aberto a times internacionais que valorizam qualidade, do frontend a sistemas em tempo real e engenharia de produto.",
    cta: "Vamos conversar",
  },
  footer: {
    tagline: "Feito com clareza. Aberto a uma boa conversa.",
    credit: "Feito com Next.js e muito café ☕",
  },
  visitor: {
    title: "Visitantes pelo mundo",
    leaveMark: "Deixe sua marca",
    locating: "Localizando…",
    saving: "Salvando…",
    denied: "Preciso da sua localização para te colocar no mapa 📍",
    retry: "Tentar de novo",
    onMap: "Você está no mapa. Valeu pela visita.",
  },
  emoji: {
    search: "Buscar emoji",
    noResults: "Nenhum emoji encontrado.",
    results: "Resultados",
    pickLabel: "Escolher um emoji",
    categories: {
      smileys: "Smileys",
      gestures: "Pessoas",
      nature: "Animais & Natureza",
      food: "Comida & Bebida",
      travel: "Viagem & Lugares",
      activities: "Atividades",
      objects: "Objetos",
      symbols: "Símbolos",
    },
  },
  controls: {
    theme: "Alternar tema de cor",
    soundEnable: "Ativar sons da interface",
    soundMute: "Silenciar sons da interface",
    switchLanguage: "Switch to English",
    expandPhoto: "Ampliar foto",
  },
  meta: {
    aboutTitle: "Sobre",
    aboutDescription:
      "Engenheiro frontend construindo interfaces de alta confiança e experiências marcantes com React e TypeScript.",
    siteDescription:
      "Engenheiro de Software. Interfaces de alta confiança, experiências marcantes e engenharia assistida por IA.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
