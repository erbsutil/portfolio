import type { UiMessages } from "./en";

/**
 * Brazilian Portuguese UI copy.
 * Natural pt-BR; no invented facts; no em dashes.
 */

export const ptBR: UiMessages = {
  skipToContent: "Ir para o conteúdo principal",
  navAria: "Navegação principal",
  menu: "Menu",
  close: "Fechar",
  navHome: "Início",
  language: "Idioma",
  preferences: "Preferências",
  themeLabel: "Tema",
  switchToEn: "English",
  switchToPt: "Português",

  nav: {
    cases: "Cases",
    products: "Produtos",
    community: "Comunidade",
    contact: "Contato",
  },

  site: {
    title: "Erick Sutil, Desenvolvedor Frontend Sênior",
    description:
      "Desenvolvedor Frontend Sênior na Reclame AQUI. 9 anos de experiência com React, Next.js, TypeScript e Astro. Foco em arquitetura frontend, microfrontends e performance web.",
    authorTitle: "Desenvolvedor Frontend Sênior",
    authorBio:
      "Desenvolvedor Frontend Sênior com 9 anos de experiência em aplicações web de alto tráfego, produtos B2B e plataformas digitais. Trabalho principalmente com React, Next.js, TypeScript e Astro.",
  },

  pages: {
    projects: {
      title: "Cases",
      description:
        "Decisões de arquitetura em produção: problema, restrições, alternativas e impacto.",
      heading: "Cases",
      intro:
        "Registros de decisões em produção: o problema, as restrições, o que ficou de fora e o resultado.",
      empty: "Nenhum case ainda.",
      breadcrumbHome: "Início",
      breadcrumbCases: "Cases",
    },
    community: {
      title: "Comunidade",
      description:
        "Palestras, workshops e mentoria de Erick Sutil: DevParaná, UNIPAR, Inovathon Sudovalley, TechWeek UTFPR e mais.",
      heading: "Comunidade",
      intro:
        "Palestras no DevParaná, workshops na UNIPAR e mentoria em hackathons.",
      empty: "Nenhuma entrada de comunidade ainda.",
      breadcrumbHome: "Início",
      breadcrumbCommunity: "Comunidade",
      itemListName: "Palestras, workshops e mentoria na comunidade",
    },
    products: {
      title: "Produtos",
      description:
        "StackBrief e Dieta e Treino: produtos disponíveis com link para cada aplicação.",
      heading: "Produtos",
      intro:
        "Dois produtos disponíveis: StackBrief e Dieta e Treino (teste gratuito, depois Pro).",
      featured: "Destaque",
      empty: "Nenhum produto ainda.",
      footnoteTitle: "Como foram construídos",
      footnoteBeforeLink:
        "Arquitetura, restrições e decisões estão nos",
      footnoteLink: "cases",
      footnoteAfterLink:
        ". Nesta página estão os links para experimentar cada produto.",
      breadcrumbHome: "Início",
      breadcrumbProducts: "Produtos",
      itemListName: "Produtos",
    },
    contact: {
      title: "Contato",
      description:
        "Fale com Erick Sutil sobre microfrontends, performance, colaborações, palestras ou comunidade.",
      heading: "Fale comigo",
      intro:
        "Para colaborações, palestras ou conversas sobre arquitetura e performance, o e-mail é o melhor caminho.",
      resumeElsewhere: "Currículo e redes",
      resume: "Currículo",
      mailSubject: "Contato pelo portfólio",
      breadcrumbHome: "Início",
      breadcrumbContact: "Contato",
      agentsHeading: "Para agentes e ferramentas",
      agentsIntro:
        "Perfil legível por máquinas para crawlers de IA e clientes MCP. Os mesmos fatos do site e do currículo.",
      agentsLlms: "llms.txt",
      agentsLlmsFull: "llms-full.txt",
      agentsResumeJson: "resume.json",
      agentsMcpPath: "/api/mcp",
      agentsMcpTitle: "Não é página no navegador. Selecione e cole no cliente MCP.",
      agentsMcpHint:
        "MCP é Streamable HTTP para clientes, não uma página no navegador. Cole o path acima, ou rode o servidor stdio local em mcp/.",
    },
  },

  home: {
    roleAt: "Desenvolvedor Frontend Sênior na Reclame AQUI",
    heroTitle:
      "Arquitetura frontend para aplicações web de alto tráfego",
    heroSub:
      "Nove anos desenvolvendo para a web. Minha atuação combina desenvolvimento frontend, decisões de arquitetura e evolução contínua de produtos digitais.",
    viewCases: "Ver cases",
    resume: "Currículo",
    selectedWork: "Trabalhos selecionados",
    allCases: "Todos os cases",
    products: "Produtos",
    tryFree: "Experimentar grátis",
    seeProducts: "Ver produtos",
    communityHeading: "Comunidade",
    communityBody:
      "Palestras no DevParaná, workshops na UNIPAR, mentoria no Inovathon e na TechWeek.",
    communityCta: "Palestras, workshops, mentoria",
    blurbs: {
      stackbrief: "Resumos diários de dependências com base no lockfile",
      "dieta-e-treino": "Alimentação e treino pelo Telegram",
    },
  },

  caseStudy: {
    titleSuffix: "Case",
    featured: "Destaque",
    allCases: "Todos os cases",
    jumpAria: "Ir para a seção",
    overview: "Visão geral",
    decisions: "Decisões",
    impact: "Impacto",
    problem: "Problema",
    constraints: "Restrições",
    architecture: "Arquitetura",
    keyDecisions: "Decisões principais",
    reasoning: "Motivo",
    alternatives: "Alternativas consideradas",
    techStack: "Stack",
    learnings: "Aprendizados",
    rejected: "Caminho rejeitado",
    statusCompleted: "Concluído",
    statusOngoing: "Em andamento",
    statusArchived: "Arquivado",
    person: "pessoa",
    people: "pessoas",
    sectionCases: "Cases",
  },

  communityDetail: {
    back: "Voltar para Comunidade",
    sectionCommunity: "Comunidade",
    viewSlides: "Ver slides",
    watchVideo: "Assistir vídeo",
    types: {
      conference: "Conferência",
      meetup: "Meetup",
      podcast: "Podcast",
      workshop: "Workshop",
      webinar: "Webinar",
      mentoring: "Mentoria",
      talk: "Palestra",
    },
  },

  cards: {
    viewCase: "Ver case",
    readMore: "Ler mais",
    readAbout: "Ler sobre {title}",
    comingSoon: "Em breve",
    tryFree: "Experimentar grátis",
    openApp: "Abrir",
    moreTechnologies: "{n} tecnologias a mais",
    statusLive: "Disponível",
    statusBeta: "Beta",
    statusComingSoon: "Em breve",
    statusArchived: "Arquivado",
  },

  footer: {
    contact: "Contato",
    resume: "Currículo",
    llmsTxt: "llms.txt",
    llmsFull: "llms-full.txt",
    resumeJson: "resume.json",
    mcp: "/api/mcp",
    mcpTitle: "Configuração MCP na página de contato",
    navLabel: "Rodapé",
    agentsLabel: "Arquivos para agentes",
  },

  theme: {
    light: "Claro",
    dark: "Escuro",
    toLight: "Mudar para tema claro",
    toDark: "Mudar para tema escuro",
  },

  related: {
    heading: "Relacionados",
    caseStudies: "Cases",
  },

  reader: {
    backCases: "Todos os cases",
    backTalks: "Todas as palestras",
    continueCase: "Role para o próximo case",
    continueTalk: "Role para a próxima palestra",
    nextCase: "Próximo case",
    nextTalk: "Próxima palestra",
    position: "{n} de {total}",
  },

  metrics: {
    verification: "Verificação",
    auditDate: "Data da auditoria",
    ratingGood: "bom",
    ratingNeedsImprovement: "precisa melhorar",
    ratingPoor: "ruim",
    scoreOutOf: "{score} de {total}, {rating}",
  },

  scrollTop: "Voltar ao topo",
  opensNewTab: "(abre em uma nova aba)",

  notFound: {
    title: "404 - Página não encontrada",
    description:
      "Esta página não foi encontrada. Vá para o início, veja os cases ou fale com Erick Sutil.",
    heading: "Página não encontrada",
    body: "Esse endereço não existe neste site.",
    home: "Início",
    cases: "Cases",
    contact: "Contato",
  },

  localeRoot: {
    title: "Erick Sutil",
    description: "Escolha um idioma para continuar.",
    choose: "Escolha o idioma",
    en: "Continue in English",
    pt: "Continuar em português",
  },
};
