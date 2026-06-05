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
    sendEmoji: string;
    changeEmoji: string;
    locating: string;
    saving: string;
    denied: string;
    retry: string;
    onMap: string;
    rateLimited: string;
    rateLimitedRetry: string;
    saveFailed: string;
    saveFailedConfig: string;
    saveFailedDb: string;
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
  meta: {
    aboutTitle: string;
    aboutDescription: string;
    siteDescription: string;
    ogImageAlt: string;
  };
}

const en: Dictionary = {
  nav: { about: "About", home: "home" },
  hero: {
    overline: "Software Engineer · Brazil",
    headline: "I build high-trust experiences for complex products.",
    tagline:
      "Frontend engineer focused on React, TypeScript, architecture, and real-time financial experiences. I care about the point where product clarity, performance, and technical decisions become user trust.",
    portraitAlt: "Marcos Lott presenting at Avenue",
  },
  bio: {
    heading: "Who I am",
    paragraphs: [
      "I’m a frontend engineer working at the intersection of product, architecture, and user experience. Today I build investment and trading flows used by thousands of people, supporting more than $620M in monthly transaction volume and more than 200k orders a month.",
      "Over time, working on financial products taught me that frontend is not just a visual layer. It is where business rules, state, real-time data, performance, and trust come together in the user experience.",
      "That context changed the way I think about engineering. I started looking less at isolated components and more at systems: how a state decision affects an entire flow, how an interface communicates risk, how architecture reduces ambiguity, and how technical quality sustains speed over time.",
      "This mindset has shaped my work on trading experiences, real-time data, state modernization, design systems, and AI tools applied to software development. I use AI as engineering leverage, not as a shortcut, keeping standards, review, and architecture in human hands.",
      "Beyond building software, I share what I learn about frontend, architecture, AI, and career. I want to help other developers grow with more clarity, not by pretending there is a perfect path, but by making the thinking behind good engineering easier to see.",
    ],
    highlights: ["high-trust experiences", "systems thinking", "engineering clarity"],
  },
  timeline: {
    heading: "Timeline",
    expand: "See the full timeline",
    collapse: "Show less",
    entries: {
      ufmg: {
        title: "Started at UFMG",
        desc: "Began Information Systems at the Federal University of Minas Gerais, where I built the foundation for how I think about software, systems, and product.",
      },
      formulaTesla: {
        title: "Joined Fórmula Tesla",
        desc: "Built full stack software for an electric racing team, connecting engineering requirements with tools people could actually use.",
      },
      dito: {
        title: "Joined Dito CRM",
        desc: "Worked on CRM and marketing products, building experiences for data, segmentation, permissions, and customer behavior analysis.",
      },
      tdc2023: {
        title: "TDC 2023",
        desc: "Attended The Developers Conference for the first time and got closer to the engineering community beyond daily work.",
      },
      avenue: {
        title: "Joined Avenue",
        desc: "Started building investment and trading experiences in a fintech environment where clarity, reliability, and trust matter every day.",
      },
      braziljs: {
        title: "BrazilJS",
        desc: "A milestone that strengthened my interest in frontend, community, and the craft behind building better experiences.",
      },
      tdcBts: {
        title: "TDC, backstage",
        desc: "Helped shape one of the conference talks behind the scenes, learning how strong technical ideas become clear narratives.",
      },
      graduation: {
        title: "Graduated",
        desc: "Finished my degree in Information Systems and kept building toward an international engineering career.",
      },
      building: {
        title: "Still building 🔧",
        desc: "The work continues: better systems, clearer writing, stronger products, and more useful things to share with other developers.",
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
    caption: "A practical toolkit for building clear, reliable, and scalable experiences.",
  },
  contact: {
    heading: "Want to talk about tech?",
    lead: "I'm interested in talking about complex products, architecture, technical quality, AI applied to development, and tech career.",
    cta: "Get in touch",
  },
  footer: {
    tagline: "Building high-trust experiences, learning in public, and sharing the path with other developers.",
    credit: "Built with Next.js, coffee, and a few healthy technical obsessions ☕",
  },
  visitor: {
    title: "Visitors around the world",
    leaveMark: "Leave your mark",
    sendEmoji: "Send emoji",
    changeEmoji: "Change emoji",
    locating: "Locating…",
    saving: "Saving…",
    denied: "I need your location to put you on the map 📍",
    retry: "Try again",
    onMap: "You’re on the map. Thanks for stopping by.",
    rateLimited: "Slow down a little. Try again in a moment.",
    rateLimitedRetry: "Try again in {seconds}s.",
    saveFailed: "Couldn’t save your mark right now. Try again.",
    saveFailedConfig: "Saving isn’t available right now.",
    saveFailedDb: "Couldn’t save your mark right now. Please try again.",
  },
  emoji: {
    search: "Search emoji",
    noResults: "No emoji found.",
    results: "Results",
    pickLabel: "Choose an emoji",
    categories: {
      smileys: "Smileys",
      gestures: "People",
      nature: "Animals and Nature",
      food: "Food and Drink",
      travel: "Travel and Places",
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
      "Frontend engineer building high-trust experiences for complex products with React, TypeScript, architecture, and real-time data.",
    siteDescription:
      "Marcos Lott, Software Engineer from Brazil. I build high-trust experiences for complex products with React, TypeScript, architecture, and real-time financial experiences.",
    ogImageAlt: "Marcos Lott monogram, software engineering",
  },
};

const pt: Dictionary = {
  nav: { about: "Sobre", home: "início" },
  hero: {
    overline: "Engenheiro de Software · Brasil",
    headline: "Construo experiências de alta confiança para produtos complexos.",
    tagline:
      "Engenheiro frontend focado em React, TypeScript, arquitetura e experiências financeiras em tempo real. Me interesso pelo ponto em que clareza de produto, performance e decisões técnicas viram confiança para quem usa.",
    portraitAlt: "Marcos Lott apresentando na Avenue",
  },
  bio: {
    heading: "Quem sou",
    paragraphs: [
      "Sou engenheiro frontend e trabalho na interseção entre produto, arquitetura e experiência do usuário. Hoje construo fluxos de investimento e trading usados por milhares de pessoas, sustentando mais de US$ 620M em volume mensal e mais de 200 mil ordens por mês.",
      "Com o tempo, trabalhar em produtos financeiros me ensinou que frontend não é só uma camada visual. É onde regras de negócio, estados, dados em tempo real, performance e confiança se encontram na experiência do usuário.",
      "Esse contexto mudou a forma como eu penso engenharia. Passei a olhar menos para componentes isolados e mais para sistemas: como uma decisão de estado afeta o fluxo inteiro, como uma interface comunica risco, como arquitetura reduz ambiguidade e como qualidade técnica sustenta velocidade no longo prazo.",
      "Essa mentalidade moldou meu trabalho em experiências de trading, dados em tempo real, modernização de estado, design systems e ferramentas de IA aplicadas ao desenvolvimento. Uso IA como alavanca de engenharia, não como atalho, mantendo padrões, revisão e arquitetura sob controle humano.",
      "Além de construir software, eu compartilho o que aprendo sobre frontend, arquitetura, IA e carreira. Quero ajudar outros devs a crescerem com mais clareza, não fingindo que existe um caminho perfeito, mas tornando mais visível o raciocínio por trás de uma boa engenharia.",
    ],
    highlights: ["experiências de alta confiança", "pensamento sistêmico", "clareza técnica"],
  },
  timeline: {
    heading: "Trajetória",
    expand: "Ver trajetória completa",
    collapse: "Mostrar menos",
    entries: {
      ufmg: {
        title: "Entrei na UFMG",
        desc: "Comecei Sistemas de Informação na Universidade Federal de Minas Gerais, onde construí a base da forma como penso software, sistemas e produto.",
      },
      formulaTesla: {
        title: "Entrei na Fórmula Tesla",
        desc: "Desenvolvi software full stack para uma equipe de corrida elétrica, conectando requisitos de engenharia com ferramentas úteis para o time.",
      },
      dito: {
        title: "Entrei na Dito CRM",
        desc: "Trabalhei em produtos de CRM e marketing, construindo experiências para dados, segmentação, permissões e análise de comportamento de clientes.",
      },
      tdc2023: {
        title: "TDC 2023",
        desc: "Participei do The Developers Conference pela primeira vez e me aproximei mais da comunidade de engenharia para além do trabalho diário.",
      },
      avenue: {
        title: "Entrei na Avenue",
        desc: "Comecei a construir experiências de investimento e trading em uma fintech onde clareza, confiabilidade e confiança importam todos os dias.",
      },
      braziljs: {
        title: "BrazilJS",
        desc: "Um marco que fortaleceu meu interesse por frontend, comunidade e pelo ofício de construir experiências melhores.",
      },
      tdcBts: {
        title: "TDC, nos bastidores",
        desc: "Ajudei a estruturar uma das apresentações da conferência, aprendendo como boas ideias técnicas se transformam em narrativas claras.",
      },
      graduation: {
        title: "Me formei",
        desc: "Concluí a graduação em Sistemas de Informação e continuei construindo caminho para uma carreira internacional em engenharia.",
      },
      building: {
        title: "Ainda construindo 🔧",
        desc: "O trabalho continua: sistemas melhores, escrita mais clara, produtos mais fortes e coisas mais úteis para compartilhar com outros devs.",
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
    caption: "Um conjunto prático para construir experiências claras, confiáveis e escaláveis.",
  },
  contact: {
    heading: "Quer trocar uma ideia sobre tecnologia?",
    lead: "Gosto de conversar sobre produtos complexos, arquitetura, qualidade técnica, IA aplicada ao desenvolvimento e carreira tech.",
    cta: "Vamos conversar",
  },
  footer: {
    tagline: "Construindo experiências de alta confiança, aprendendo em público e compartilhando o caminho com outros devs.",
    credit: "Feito com Next.js, café e algumas boas obsessões técnicas ☕",
  },
  visitor: {
    title: "Visitantes pelo mundo",
    leaveMark: "Deixe sua marca",
    sendEmoji: "Mandar emoji",
    changeEmoji: "Trocar emoji",
    locating: "Localizando…",
    saving: "Salvando…",
    denied: "Preciso da sua localização para te colocar no mapa 📍",
    retry: "Tentar de novo",
    onMap: "Você está no mapa. Valeu pela visita.",
    rateLimited: "Calma aí. Tenta de novo em instantes.",
    rateLimitedRetry: "Tenta de novo em {seconds}s.",
    saveFailed: "Não deu para salvar agora. Tenta de novo.",
    saveFailedConfig: "O registro está indisponível no momento.",
    saveFailedDb: "Não deu para salvar agora. Tente de novo em instantes.",
  },
  emoji: {
    search: "Buscar emoji",
    noResults: "Nenhum emoji encontrado.",
    results: "Resultados",
    pickLabel: "Escolher um emoji",
    categories: {
      smileys: "Smileys",
      gestures: "Pessoas",
      nature: "Animais e Natureza",
      food: "Comida e Bebida",
      travel: "Viagem e Lugares",
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
      "Engenheiro frontend construindo experiências de alta confiança para produtos complexos com React, TypeScript, arquitetura e dados em tempo real.",
    siteDescription:
      "Marcos Lott, Engenheiro de Software do Brasil. Construo experiências de alta confiança para produtos complexos com React, TypeScript, arquitetura e experiências financeiras em tempo real.",
    ogImageAlt: "Monograma Marcos Lott, engenharia de software",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
