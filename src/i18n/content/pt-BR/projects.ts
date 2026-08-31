/** Portuguese overlays for projects collection. */

export const projectsPtBR: Record<string, Record<string, unknown>> = {
  "b2b-brand-customization": {
    title: "Personalização de marca B2B",
    role: "Desenvolvedor Frontend",
    outcomeSummary:
      "Ferramentas de marca em autosserviço para administradores de empresa nas páginas públicas de perfil, para que atualizar identidade visual não dependesse de chamado de suporte.",
    overview:
      "Em uma plataforma voltada ao consumidor, com páginas públicas de perfil em que performance importava, trabalhei nas ferramentas de personalização de marca para que administradores de empresa gerenciassem a identidade sem abrir chamado de suporte.",
    problem:
      "As opções de personalização do perfil eram poucas, então os administradores tinham pouco controle sobre a aparência pública além dos campos básicos. Precisávamos de ferramentas simples o bastante para administradores sem perfil técnico, sem depender de suporte.",
    constraints: [
      "Páginas públicas de perfil: performance importava.",
      "Frontend monolítico existente.",
      "A experiência precisava funcionar para administradores de empresa sem perfil técnico.",
    ],
    approach:
      "Refatorei o editor de perfil com recorte de capa customizado, Unsplash e vídeo. Saí de passar props em cascata e centralizei o estado do editor na Context API.",
    keyDecisions: [
      {
        decision: "Context API para o estado do editor",
        reasoning:
          "Passar props em cascata tinha ficado difícil de manter. Context era suficiente para aquele editor na época.",
      },
      {
        decision: "Unsplash mais recorte",
        reasoning:
          "Deu aos administradores uma biblioteca de imagens utilizável e capa com enquadramento consistente.",
      },
      {
        decision: "Styled Components a partir do Figma",
        reasoning:
          "Seguiu as especificações do DevMode sem inventar uma linguagem de design paralela.",
      },
    ],
    impact: {
      qualitative:
        "Os administradores passaram a definir recorte de capa, imagens do Unsplash e vídeo no perfil público pelo editor.",
    },
    learnings: [
      "O estado do editor deve ficar perto da superfície que decide recorte e mídia; Context venceu a cascata de props aqui sem precisar de um store mais pesado.",
    ],
  },

  "b2b-company-registration": {
    title: "Cadastro B2B: Signup de empresa em microfrontend, cutover depois do A/B",
    role: "Desenvolvedor Frontend Sênior",
    outcomeSummary:
      "Funil isolado, Unleash contra o fluxo vivo, promoção quando a queda no funil melhorou.",
    overview:
      "Com produto e backend, reconstruí um fluxo de cadastro de empresa com muita fricção como microfrontend no design system Storybook existente. Rodamos contra o fluxo em produção com Unleash antes de promover. Objetivo: menos passos, mesmos dados, sem quebrar o funil.",
    problem:
      "O fluxo legado de cadastro tinha passos extras que faziam as empresas desistir antes de concluir o perfil. O monolito também era difícil de manter e estava desalinhado dos padrões de componentes dos produtos B2B mais novos.",
    constraints: [
      "Tinha que rodar em paralelo ao fluxo em produção durante o teste A/B, sem uma troca abrupta.",
      "O fluxo novo tinha que superar o antigo em conversão antes de promovermos.",
      "O design system Storybook compartilhado era a fonte de verdade da UI. Sem biblioteca de componentes paralela.",
    ],
    approach:
      "Reconstruí o cadastro como microfrontend independente e removi passos desnecessários. A UI veio do sistema Storybook compartilhado. Unleash dividiu o tráfego entre antigo e novo. Quando a conversão favoreceu a versão nova, ela virou o padrão.",
    keyDecisions: [
      {
        decision: "Teste A/B via Unleash em vez de troca direta",
        reasoning:
          "Cadastro é caminho crítico de conversão. Tráfego real decidiu qual design venceu.",
        alternatives: [
          "Trocar todo mundo de uma vez com feature flag, sem dividir tráfego (rejeitado: sem prova de conversão)",
          "Só redesenhar o CSS do formulário no monolito, aos poucos (rejeitado: não reduziu passos nem desacoplou o deploy)",
        ],
      },
      {
        decision: "Microfrontend mais design system compartilhado",
        reasoning:
          "Independente do monolito para iterar mais rápido. Reutilizar componentes Storybook manteve o foco no fluxo e na lógica, não em reconstruir UI.",
        alternatives: [
          "Reconstruir dentro do monolito (rejeitado: iteração mais lenta, mais risco se quebrar)",
          "Biblioteca de UI nova só para este fluxo (rejeitado: tokens duplicados e divergência)",
        ],
      },
      {
        decision: "Tailwind para velocidade de estilo dentro do sistema existente",
        reasoning:
          "Tailwind já era o padrão do design system. A iteração de layout ficou dentro desse sistema, sem inventar abordagem CSS paralela.",
        alternatives: [
          "CSS modules escritos à mão (mais lento contra um sistema Tailwind existente)",
        ],
      },
    ],
    impact: {
      metrics: [
        {
          label: "Como promovemos",
          value: "A/B com Unleash → promover vencedor",
        },
        {
          label: "Mudança no funil",
          value: "Menos passos, mesmos dados obrigatórios",
        },
        {
          label: "Limite de deploy",
          value: "Microfrontend independente (não monolito)",
        },
        {
          label: "Critério de promoção",
          value: "Conversão em produção superou o legado antes de virar padrão",
        },
      ],
      qualitative:
        "O teste A/B favoreceu o funil mais curto; promovemos depois que a conversão superou o legado. Testes unitários cobriram os passos do funil porque este caminho fica no cadastro inicial.",
    },
    learnings: [
      "Teste A/B em funil de várias etapas é confuso porque a conversão atrasa. Por isso tráfego real importa mais do que achismo.",
      "Um design system documentado tira a UI como gargalo e libera tempo para o fluxo em si, não para reinventar UI.",
      "Remover passos que considerávamos obrigatórios foi o maior ganho de experiência.",
    ],
  },

  "b2b-user-management": {
    title: "Identidade B2B: Um e-mail, várias empresas: papéis multi-tenant em Astro + React",
    role: "Desenvolvedor Frontend Sênior",
    outcomeSummary:
      "Saiu o nick por empresa; Keycloak com papéis para o plano depender de acesso, não de um login por tenant.",
    overview:
      "Fui responsável pelo microfrontend de identidade Astro/React e pelo pacote de autenticação compartilhado numa mudança de identidade B2B, com backend e segurança: de contas por nick isoladas (um nick, uma empresa, todos admin) para acesso multi-tenant por e-mail, em que uma identidade acumula papéis entre empresas.",
    problem:
      "Usuários entravam com nick, e um nick significava uma empresa. Todos eram admin porque não havia papéis restritos. Com o crescimento da plataforma, empresas precisavam de controle de acesso mais fino e uma pessoa gerenciando mais de uma empresa.",
    constraints: [
      "A mudança tocava todo microfrontend que mostrava login ou nome de usuário.",
      "O backend cuidava da aplicação das regras no Keycloak; o frontend precisava de uma biblioteca compartilhada para ler os novos estados de sessão.",
      "Sem lançamento único. Rollout gradual, sem quebrar sessões legadas ativas.",
    ],
    approach:
      "Com backend e segurança, construímos cadastro, login e atribuição de papéis como microfrontend central Astro/React, mais biblioteca JS interna para validação de autenticação e Keycloak. Essa biblioteca exportava componentes compartilhados de User Profile e Login injetados nos demais microfrontends.",
    keyDecisions: [
      {
        decision: "Autenticação em pacote interno",
        reasoning:
          "Um lugar para validação, chamadas Keycloak e UI de autenticação supera copiar lógica de login entre microfrontends.",
        alternatives: [
          "Copiar helpers de login e sessão em cada microfrontend (rejeitado: código diverge e sobe o risco de segurança)",
          "Um único shell SPA responsável por toda a interface de autenticação (rejeitado: acoplado demais à migração da plataforma)",
        ],
      },
      {
        decision: "Atoms para estado React local, Astro no resto",
        reasoning:
          "Cadastro em várias etapas precisava de estado compartilhado dentro de um app React. Atoms encaixaram sem inventar persistência entre ilhas.",
        alternatives: [
          "Redux ou store global entre microfrontends (rejeitado: exagero e vazamento de fronteira)",
        ],
      },
      {
        decision: "Rollout em fases",
        reasoning:
          "Peças de identidade foram para produção em etapas para sessões legadas continuarem funcionando.",
        alternatives: [
          "Troca única e abrupta (rejeitado: risco de sessão alto demais)",
        ],
      },
    ],
    impact: {
      metrics: [
        {
          label: "Modelo de identidade",
          value: "1 e-mail → várias empresas + papéis",
        },
        {
          label: "Modelo anterior",
          value: "1 nick → 1 empresa (todos administradores)",
        },
        {
          label: "Distribuição de autenticação",
          value: "Pacote compartilhado entre microfrontends",
        },
        {
          label: "Suporte a planos",
          value: "Níveis de assinatura por papel/empresa",
        },
      ],
      qualitative:
        "Identidade passou de 1 nick = 1 empresa para 1 e-mail = várias empresas com papéis. Esse modelo habilitou planos que dependem de papéis e empresas gerenciadas.",
    },
    learnings: [
      "Microfrontends funcionam quando as fronteiras são claras. Autenticação cruza elas, então biblioteca compartilhada foi o ajuste certo.",
      "Rollout de identidade em fases reduz o risco de migrar autenticação legada.",
      "Keycloak é a fonte da verdade; como o frontend lê as claims do token ainda decide se login e perfil ficam coerentes entre microfrontends.",
    ],
  },

  "diario-fit": {
    title: "Dieta e Treino: O app é o Telegram; o painel é um link de curta duração",
    role: "Desenvolvedor full-stack",
    duration: "Lançado em 2026",
    outcomeSummary:
      "Bot Bun/Windmill + agentes Gemini; painel Next.js com RLS; trial no Stripe sem colocar a web no centro.",
    overview:
      "Dieta e Treino parte de uma ideia simples: manter alimentação e treino no chat que as pessoas já usam e abrir um painel só quando for preciso ver o panorama. O mesmo bot funciona em conversa privada ou em grupos do Telegram. Refeições passam pela Ana (texto, foto ou voz); treinos pelo Renan. Quando alguém quer totais do dia, consistência de cerca de 70 dias ou uma comparação leve com o grupo, pede o painel e abre o link. O registro do dia a dia fica no chat; o aplicativo web cobre as visões agregadas, a página institucional e a cobrança.",
    problem:
      "A memória puxa para os extremos. Sem registro constante, fica difícil ver o que de fato se come ao longo dos dias, ou como volume e frequência de treino evoluem. Aplicativos de dieta pedem instalação e login que quebram o hábito antes mesmo de começar.",
    constraints: [
      "Runner de workflows hospedado por mim para o bot (sem conta cloud gerenciada). Produção sobe como um worker empacotado, enquanto o repositório segue modular.",
      "A entrega do webhook do Telegram tem limite de tempo; o handler precisa terminar a tempo e ser idempotente para uma nova tentativa não gravar duas vezes. Em grupos o ruído sobe: heurísticas pegam comida e treino sem exigir comando em cada mensagem.",
      "Acesso ao painel é um link de curta duração vindo do bot. Acesso privilegiado ao banco fica no servidor. Ranking em grupo é adesão explícita no bot, nunca automático; pares veem agregados, não o texto das refeições.",
      "Bot e painel precisam concordar no dia calendário local de cada usuário. UI sensível a relógio renderiza no cliente para evitar descompasso entre SSR e hidratação.",
      "Caminho comercial espelha o StackBrief (Checkout / Portal / webhooks, teste de 14 dias sem cartão, bloqueio suave de escritas do bot depois do teste) mantendo uma identidade Telegram = uma assinatura e as regras de privacidade intactas.",
    ],
    approach:
      "Telegram dispara um webhook no Windmill hospedado por mim; um job Bun empacotado roda o bot. Gemini interpreta e transcreve; Postgres (Supabase) guarda o estado. O webhook responde com segurança depois de persistir, para novas tentativas não sujarem o banco. O painel é Next.js na Vercel, com landing em português (Ana/Renan, preços, FAQ) e acesso por token: macros, mapas de consistência, volume de treino, grupos e assinatura. Eventos estruturados alimentam um resumo de qualidade agendado; Sentry opcional cobre erros de produção. Alertas leves de operação ficam fora do caminho do usuário.",
    keyDecisions: [
      {
        decision: "Telegram em vez de WhatsApp como superfície de chat",
        reasoning:
          "As pessoas já vivem em apps de mensagem; a ideia era menos atrito, não um app novo. A Bot API do Telegram encaixa produto pequeno e iterativo: webhooks diretos, bots em chats privados e grupos, e espaço para evoluir o comportamento sem fluxo pesado de console Business. O caminho do WhatsApp para automação parecida é mais pesado (Business API, regras de mensagem mais rígidas e sinais de custo que não combinaram com este produto).",
        alternatives: [
          "Construir no WhatsApp Business API / Cloud API (mais custo operacional nesta escala e caso de uso)",
          "App mobile próprio (rejeitado: instalação extra e login separado)",
        ],
      },
      {
        decision: "Windmill hospedado por mim em vez de cloud ou serviço Node custom",
        reasoning:
          "Fluxos, novas tentativas e agendas num lugar só; o custo é a máquina que eu já tenho. O preço é operar essa máquina.",
        alternatives: [
          "Windmill Cloud ou Railway/Fly com workers manuais (custo extra ou cola para o mesmo resultado)",
        ],
      },
      {
        decision: "Agentes nomeados (Ana / Renan) em vez de voz genérica única",
        reasoning:
          "Alimentação e treino são intenções diferentes no chat. Agentes nomeados deixam essa divisão clara no bot e na página inicial.",
        alternatives: [
          "Um assistente sem nome para tudo (copy mais barata, modelo mental mais fraco)",
        ],
      },
      {
        decision: "Gemini para texto, imagem e voz; heurísticas para o ruído em grupo",
        reasoning:
          "Uma API key e uma quota. Palavras-chave e padrões filtram o grupo para não chamar modelo em toda linha irrelevante.",
        alternatives: [
          "Só comandos com barra ou classificador em toda mensagem (fricção ou custo)",
        ],
      },
      {
        decision: "Lançar com período de teste no Stripe e assinatura pelo Telegram",
        reasoning:
          "Os primeiros usuários validaram o fluxo; o site público e o plano pago precisam das mesmas regras de acesso do StackBrief, sem quebrar o hábito de começar pelo bot. O período de teste começa na autorização; depois dele, as escritas são bloqueadas de forma suave, enquanto o painel ainda oferece a tela de assinatura.",
        alternatives: [
          "Manter produto só por convite, sem cobrança",
          "Forçar cadastro web antes de qualquer uso no Telegram (rejeitado: quebra a promessa central)",
        ],
      },
    ],
    impact: {
      metrics: [
        {
          label: "Resultado do produto",
          value: "Bot, painel e cobrança em produção em dietaetreino.erbsu.com",
        },
        {
          label: "Fricção removida",
          value: "Registro no Telegram; painel abre por link do bot",
        },
        {
          label: "Privacidade",
          value: "Grupos com adesão explícita; pares veem agregados, não refeições",
        },
        {
          label: "Modelo comercial",
          value: "Teste de 14 dias → bloqueio suave de escritas · R$29/mês",
        },
      ],
      qualitative:
        "O registro fica no Telegram, sem segunda instalação ou login. Macros do dia, consistência de cerca de 70 dias e volume de treino abrem atrás de um link de curta duração; a comparação com o grupo só depois de adesão explícita. A cobrança segue teste → Checkout → bloqueio suave, enquanto o bot permanece a superfície principal.",
    },
    learnings: [
      "Afinar quem fica em silêncio num grupo de chat pediu mais iterações do que trocar de modelo.",
      "Lógica de data duplicada, com um teste, foi mais confiável do que um pacote compartilhado que não manteríamos.",
      "Server Components e tipos estreitos fazem a maior parte do trabalho de privacidade antes do navegador rodar.",
      "Nesta escala, eventos estruturados e um resumo semanal superam vasculhar logs brutos para erros e latência.",
      "Quando o fluxo funciona, nome e texto da página inicial ainda precisam soar como produto, sem prometer precisão clínica.",
      "Em um produto com foco no Telegram, a cobrança é sobretudo regras de acesso; o Checkout não deveria entrar antes do comportamento de teste e do bloqueio suave.",
    ],
  },

  portfolio: {
    title: "Portfólio pessoal e cases",
    role: "Desenvolvedor Frontend Sênior",
    outcomeSummary:
      "Portfólio Astro estático: cases bilíngues tipados, UI editorial paper-first, quase zero JS por padrão, mais superfícies agent-readable (llms.txt, JSON Resume, MCP). O www em produção mantém analytics adiados e Bot Fight da Cloudflare.",
    overview:
      "Precisava de um lugar para mostrar como trabalho, não uma galeria de miniaturas. Este site é Astro estático com cases em MDX (EN como fonte, overlays pt-BR), rail tipográfico de trabalhos selecionados na home, prateleira de produtos, folios anuais de Comunidade, Playwright nos fluxos críticos e endpoints máquina para agentes e ferramentas consultarem os mesmos fatos sem scrapar HTML.",
    problem:
      "A maioria dos portfólios parece intercambiável: tema escuro, cargo no hero, grades de cards e pouca prova de julgamento. Também deixam crawlers de IA e tooling de agentes adivinharem a partir de HTML bagunçado.",
    constraints: [
      "Zero JavaScript por padrão em páginas de conteúdo; React só se uma interação justificar.",
      "Lighthouse Accessibility e SEO fortes na home ao vivo; documentar trocas de Perf com honestidade.",
      "Coleções de conteúdo tipadas para cases, palestras e apps.",
      "Interface clara com tipografia de jornal e contraste legível; o tema escuro permanece opcional.",
      "Medir tráfego real (gtag adiado + Vercel Analytics); não apagar analytics para perseguir nota de fachada.",
      "Manter proteções de edge da Cloudflare utilizáveis; não bloquear o challenge no CSP só para subir Best Practices.",
      "Um perfil canônico para humanos e agentes (PDF + JSON Resume + MCP).",
      "Ferramentas de IA permitidas para velocidade, não para arquitetura sem supervisão.",
    ],
    approach:
      "Astro para o shell e a lista de trabalhos selecionados na homepage. MDX + overlays i18n para cases e produtos. Tokens CSS vanilla (IBM Plex) para um sistema editorial discreto. Folios por ano e grades de duas colunas em vez de dashboards de cards. Playwright contra o site buildado. Camada de agentes: profile.ts alimenta llms.txt, resume.json, Person JSON-LD e um servidor MCP (stdio + Streamable HTTP na Vercel). Em produção, analytics sobe após idle e o CSP permanece compatível com scripts de challenge da Cloudflare.",
    keyDecisions: [
      {
        decision: "Astro em vez de Next.js",
        reasoning: "Site de conteúdo não precisa de runtime React em toda página.",
        alternatives: [
          "Usar Next.js App Router em todas as páginas (rejeitado: custo de JS sem benefício)",
        ],
      },
      {
        decision: "Lista tipográfica estática de trabalhos selecionados em vez de carrossel hero React",
        reasoning:
          "O carrossel precisava de ilha para fade e paginação. Uma lista tipográfica prova o mesmo trabalho com zero client JS na homepage.",
        alternatives: [
          "Manter HeroCarousel como ilha React (rejeitado: interatividade sem valor suficiente)",
        ],
      },
      {
        decision: "Analytics adiados em vez de nenhum analytics",
        reasoning:
          "Portfólio que afirma julgamento técnico ainda deve medir visitas. Analytics sobe após idle com IP anonimizado. Aceitar custo modesto no Lighthouse em vez de site mudo.",
        alternatives: [
          "Omitir todo analytics por Performance 100 limpo (rejeitado: produto imensurável, nota de fachada)",
          "Analytics síncrono no <head> (rejeitado: bloqueia LCP/TBT sem necessidade)",
        ],
      },
      {
        decision: "CSP compatível com Cloudflare em vez de scripts travados por hash",
        reasoning:
          "script-src só com hash bloqueou bootstrap de challenge Cloudflare e forçou desligar Bot Fight por paridade de score. O CSP de produção permite o caminho de challenge para a proteção de edge permanecer ligada.",
        alternatives: [
          "CSP com hash que bloqueia challenge CF para forçar Best Practices 100 (rejeitado: recurso de segurança desligado por nota de fachada)",
        ],
      },
      {
        decision: "Tema claro com tipografia de jornal como padrão, em vez de dark-first",
        reasoning:
          "Portfólios tech escuros estão saturados. Papel claro com tipografia de contraste mais forte lê melhor na primeira passagem.",
        alternatives: [
          "Manter dark como padrão (rejeitado: parece todo portfólio de tech)",
        ],
      },
      {
        decision: "Uma prateleira Produtos para toda ferramenta entregue",
        reasoning:
          "StackBrief e Dieta e Treino são produtos disponíveis que as pessoas podem abrir. Separar em Lab fazia o segundo parecer inacabado.",
        alternatives: [
          "Separar Produtos e Lab (rejeitado: diluiu Dieta e Treino)",
        ],
      },
      {
        decision: "Perfil agent-readable (llms.txt + resume.json + MCP) a partir de uma fonte",
        reasoning:
          "Recrutadores e agentes de IDE já buscam llms.txt e MCP. Um profile.ts alinha Person schema, JSON Resume e tools sem duplicar o corpo dos MDX.",
        alternatives: [
          "Só HTML e esperar scrapers acertarem (rejeitado)",
          "JSON Resume paralelo à mão (rejeitado: drift)",
        ],
      },
      {
        decision: "Playwright em vez de testes unitários de componente",
        reasoning: "Testes de browser pegam os fluxos que importam num build estático.",
      },
      {
        decision: "CSS vanilla em vez de Tailwind",
        reasoning: "Estilos escopados e variáveis bastaram aqui.",
      },
    ],
    impact: {
      metrics: [
        {
          label: "Lighthouse (www desktop)",
          value: "99 Perf · 98 A11y · 100 BP · 100 SEO",
        },
        {
          label: "Lighthouse (www mobile)",
          value: "89 Perf · 98 A11y · 100 BP · 100 SEO",
        },
        {
          label: "JS no cliente na homepage",
          value: "Sem ilha React (lista estática)",
        },
        {
          label: "E2E",
          value: "Playwright 8/8 aprovados",
        },
        {
          label: "Superfícies para agentes",
          value: "llms.txt · resume.json · /api/mcp",
        },
      ],
      qualitative:
        "Auditado em 9 ago 2026 com Lighthouse 12.8.2 em https://www.erbsu.com/en/ (Cloudflare + analytics adiados). Desktop fica quase perfeito; Perf mobile é o principal custo do www. Suite Playwright a11y/nav: 8/8. Endpoints agent-readable saem da mesma fonte do PDF.",
      auditSource:
        "Lighthouse 12.8.2 CLI em www.erbsu.com/en/: desktop 99/98/100/100, mobile 89/98/100/100. Playwright 8/8. 9 ago 2026.",
      auditDate: "2026-08-09",
    },
    learnings: [
      "Tratar JavaScript como custo significa remover ilhas quando uma lista estática basta, não apagar analytics ou segurança de edge para imprimir um placar perfeito.",
      "Um 100 conquistado tirando medição e Bot Fight soa como nota de fachada; documente a troca.",
      "A primeira impressão falha em copy defensiva e enfeite de template antes de falhar em escolha de stack.",
      "Acessibilidade e contraste desde o início superam passada de polimento tardio.",
      "Arquivos agent-readable não substituem descoberta orgânica. Tornam citações precisas quando alguém (ou um agente) já chega no domínio.",
    ],
  },

  stackbrief: {
    title: "StackBrief: Brief de dependências no lockfile, não mais um feed de CVE",
    role: "Desenvolvedor de produto e full-stack",
    duration: "Lançamento de fim de semana, jul 2026",
    outcomeSummary:
      "Jobs no Windmill leem o lockfile real; Next.js + Gemini montam o brief; Stripe na cobrança. Não é digest de notícia.",
    overview:
      "Queria notas de release alinhadas às versões que eu rodo, sem viver em feeds. A primeira ideia era um compilado de novidades filtrado por nomes de tecnologias. Isso parecia fraco diante de newsletters grátis, então mantive o pipeline e mudei a pergunta do produto: este release afeta o lockfile? Construí um app Next.js na Vercel e um pipeline noturno no Windmill em um VPS; Stripe, Telegram, idiomas e critérios de continuar ou parar vieram depois do lançamento de fim de semana. Mesmo pipeline, trabalho de infraestrutura, não mais um resumo de notícias.",
    problem:
      "Ferramentas de CVE respondem “isso é vulnerável?”. Resumos de notícias respondem “o que está em alta?”. Nenhuma responde “este release afeta as versões que eu rodo?”. O Dependabot gera muito ruído. Quem mantém um produto pequeno ainda é surpreendido por breaking changes.",
    constraints: [
      "O GitHub App pode pedir permissão de leitura de conteúdo; o produto só busca package.json e lockfile na raiz.",
      "Uma stack por conta na v1.",
      "Custo de LLM tem que caber em R$29/mês ou US$9/mês: filtrar e compartilhar cache antes do Gemini.",
      "Secrets ficam fora do git; a automação roda em workspace isolado.",
      "Sem scanner CVE, WhatsApp ou plano Team na v1.",
      "Locale e moeda do Stripe precisam combinar (BRL para pt-BR, USD para en/es).",
    ],
    approach:
      "Next.js 16 na Vercel para autenticação, primeiro acesso, interface de resumo e cobrança. Supabase com RLS. Pipeline Bun no Windmill à noite: ingestão, filtro, correspondência de versão, geração e entrega. O primeiro acesso pode disparar um resumo sob demanda para o primeiro resumo não depender só do cron noturno. O checkout escolhe os preços do Stripe de acordo com o idioma/moeda.",
    keyDecisions: [
      {
        decision: "Transformar o compilado de novidades em resumos alinhados às versões, em vez de recomeçar",
        reasoning:
          "Mais um resumo de notícias parecia difícil de defender contra newsletters grátis. O caminho de ingestão, filtro e entrega já existia; só o trabalho mudou.",
        alternatives: [
          "Lançar mais um resumo de notícias e competir com newsletters grátis",
          "Descartar o build de fim de semana e recomeçar do zero",
        ],
      },
      {
        decision: "Cruzar versões do lockfile, não só nomes de tech",
        reasoning:
          "Cruzar só por nome inventa ferramentas parecidas e quebra confiança. Um dia sem novidades só vale se as versões forem reais.",
        alternatives: [
          "Tags manuais só (mantido como fallback)",
          "Varrer o repositório inteiro (rejeitado)",
        ],
      },
      {
        decision: "Cachear saída do Gemini por tech@version",
        reasoning:
          "Sem cache compartilhado, o custo escala com usuários. Com ele, o mesmo texto de release é reutilizado.",
        alternatives: ["Gerar por usuário toda noite"],
      },
      {
        decision: "Manter preço de lista R$29; deixar desconto de lançamento de fora",
        reasoning:
          "Sem tráfego, desconto permanente é sobretudo aparência. O preço ficou como hipótese até haver uso real.",
      },
      {
        decision: "Adicionar EN/ES e USD no dia depois do lançamento",
        reasoning:
          "Cobrar só em reais limita o alcance cedo demais para uma ferramenta feita para desenvolvedores. Mesmo trabalho do produto, segunda moeda.",
      },
      {
        decision: "Escrever critérios de continuar ou parar antes de existirem usuários pagos",
        reasoning:
          "Mantém o escopo honesto. Força um olhar curto em ativação e conversão do período de teste, em vez de lançar funcionalidades indefinidamente.",
      },
      {
        decision: "Corrigir redirects de sessão e autenticação depois da auditoria de produção",
        reasoning:
          "Login e primeiro resumo falham mais por cookies, OAuth e WAF do que pelo texto da página inicial.",
      },
    ],
    impact: {
      metrics: [
        {
          label: "Resultado do produto",
          value: "Fluxo pago em produção em stackbrief.erbsu.com",
        },
        {
          label: "O que falta no mercado",
          value: "Correspondência de lockfile, entre scan de CVE e resumo de notícias",
        },
        {
          label: "Custo de LLM",
          value: "Cache Gemini compartilhado por tech@version",
        },
        {
          label: "Lançamento comercial",
          value: "PT-BR/EN/ES · checkout BRL/$ · teste de 14 dias",
        },
        {
          label: "Corte de escopo v1",
          value: "Sem CVE / WhatsApp / planos Team",
        },
      ],
      qualitative:
        "O enquadramento de resumo de notícias caiu antes do lançamento. O mesmo pipeline de ingestão agora responde a uma pergunta de infraestrutura: este release afeta as versões que você roda? O fluxo completo (primeiro acesso → primeiro resumo → período de teste no Stripe) está em produção, sem CVE, WhatsApp ou planos de agência. Critérios de continuar ou parar decidem o próximo corte com base em ativação, não em vontade de adicionar funcionalidade.",
    },
    learnings: [
      "Pesquisa deve desafiar a ideia, não ditar preço de fachada. Prefira um teto claro em USD a um desconto permanente sem tráfego.",
      "O primeiro resumo alinhado ao lockfile importa mais do que polimento ou idiomas extras.",
      "WAF, configuração do Stripe e redirects OAuth ficam no caminho até a primeira tela útil.",
      "Critérios de continuar ou parar escritos cedo são mais fáceis de manter do que os inventados depois de se apaixonar pelo build.",
      "Deixe claro o que a permissão do GitHub App permite e o que o produto de fato consulta.",
      "Internacionalização sem moeda correspondente fica incompleta.",
    ],
  },

  "web-components-remote-poc": {
    title: "Compartilhando componentes React via CDN",
    role: "Desenvolvedor Frontend Sênior",
    outcomeSummary:
      "Validei UI React via CDN para consumidores atualizarem componentes compartilhados sem subir versão no npm entre microfrontends.",
    overview:
      "Na plataforma de microfrontends, toda mudança de UI compartilhada significava novo publish npm, bump de versão em todo consumidor e redeploy. Este PoC verificou se era possível servir componentes ao vivo de uma CDN para apps React e, quando necessário, para stacks legadas.",
    problem:
      "Atualizar um botão ou um token compartilhado significava bumps de versão coordenados e redeploys entre times. Isso atrasava correção rotineira de UI.",
    constraints: [
      "Tinha que funcionar com microfrontends React existentes sem rewrite completo.",
      "Entregável como URL de script compilado na CDN, não npm.",
      "Preferir abordagem runtime simples em vez de tooling de federation.",
      "Precisar de caminho para apps legados não-React.",
    ],
    approach:
      "Primeira tentativa: embrulhar React remoto como Web Components. Props complexas pelo DOM eram dolorosas e conflitavam com bibliotecas internas. Abordagem final: carregar componentes React simples da CDN em apps React, mais um wrapper Web Component mais fino só para o legado.",
    keyDecisions: [
      {
        decision: "Componentes React via CDN",
        reasoning:
          "Empacotar, hospedar e consumir via script. Evita o ciclo de atualização npm sem adicionar complexidade de federation.",
        alternatives: [
          "Usar Module Federation / remotes do webpack (rejeitado no PoC: operação mais pesada)",
          "Manter publish npm + bumps coordenados (como está hoje: lento demais para correções de token/UI)",
        ],
      },
      {
        decision: "Pular Web Components nos apps React",
        reasoning:
          "Props ricas via Custom Elements eram incômodas e conflitavam com bibliotecas React internas. Manter React como React.",
        alternatives: [
          "Forçar todos os consumidores via Custom Elements (rejeitado depois da fricção prop/DOM)",
        ],
      },
      {
        decision: "Wrapper Web Component só para o legado",
        reasoning:
          "Apps antigos precisavam da UI sem adotar React. Custom Element simplificado foi a válvula de escape.",
        alternatives: [
          "Deixar o legado em cópias npm congeladas (rejeitado: manutenção dupla para sempre)",
        ],
      },
    ],
    impact: {
      metrics: [
        {
          label: "Caminho de update do consumidor",
          value: "Script CDN vs bump npm + redeploy",
        },
        {
          label: "Consumidores React",
          value: "React direto da CDN (sem wrapper de Web Components)",
        },
        {
          label: "Caminho legado",
          value: "Wrapper Custom Element fino só",
        },
        {
          label: "Tooling de federation",
          value: "Evitado no escopo do PoC",
        },
      ],
      qualitative:
        "Mostrou um caminho em que a UI compartilhada podia ir para a CDN e os consumidores React pegarem sem redeploy do consumidor. Também deixou claro quando o wrapper Web Component vale (legado) e quando não vale.",
    },
    learnings: [
      "Um script na CDN muitas vezes basta quando o objetivo é menos processo, não plataforma nova.",
      "Web Components parecem universais, mas forçá-los numa stack muito React costuma custar mais do que economizam.",
      "Uma válvula de escape para o legado pode proteger sistemas antigos sem prejudicar o caminho moderno.",
    ],
  },
};
