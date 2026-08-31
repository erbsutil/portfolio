/** Portuguese overlays for speaking entries (id → fields + optional body). */

export const speakingPtBR: Record<
  string,
  { fields: Record<string, unknown>; body?: string }
> = {
  "startup-weekend-fb-mvp-2026": {
    fields: {
      title: "MVP até domingo",
      event: "Startup Weekend Francisco Beltrão 2026",
      description:
        "Palestra no Startup Weekend Francisco Beltrão 2026 sobre o que MVP é de verdade: testes simples antes de construir demais, e mínimo que ainda seja amável.",
      location: "Francisco Beltrão, Paraná, Brasil",
      topics: [
        "MVP",
        "Validação de produto",
        "Startup Weekend",
        "Trustvox",
        "Mínimo amável",
      ],
    },
    body: `Levei para o pessoal a experiência na Trustvox, onde entrei em 2017. Lá ficou claro na prática: os maiores aprendizados não vieram de features complexas, e sim de testes simples que ainda eram MVP.

No case público do Chinelo Eu Amo Meu Cavalo, por exemplo: é um case de MVP da Trustvox. Duas lojas, o mesmo produto; uma com widget de avaliações e outra sem. Esse A/B mostrou cerca de 20% a mais em vendas com avaliações. O aprendizado veio antes de qualquer grande desenvolvimento, e bastou para abrir portas com donos de e-commerce.

A principal armadilha de quem começa um produto, e que fica muito clara na correria de um Startup Weekend, é achar que a entrega precisa ser um sistema completo até o domingo.

O MVP não é um produto mal feito ou pela metade. Tem que ser mínimo e amável.

O teste serve para validar a tese. Se a hipótese cair, o MVP funcionou do mesmo jeito: você aprendeu rápido antes de gastar meses construindo algo que não gera valor.`,
  },

  "inovathon-sudovalley-2026": {
    fields: {
      title: "Mentor de hackathon",
      event: "Inovathon Sudovalley: Mundo Tech / ACEFB / Expobel 2026",
      description:
        "Mentorei times no Inovathon Sudovalley (Mundo Tech / Expobel 2026) em escopo, prototipagem com IA e estrutura de pitch.",
      location: "Francisco Beltrão, Paraná, Brasil",
      topics: [
        "Prototipagem assistida por IA",
        "Mentoria",
        "Pitch",
        "MVP",
        "Sudovalley",
      ],
    },
    body: `Mentorei times nos dois dias do Inovathon Sudovalley na ACEFB em Francisco Beltrão, parte do Mundo Tech na Expobel 2026. Nove times chegaram a propostas finais para desafios ligados à feira.

Meu foco foi prático: ajudar a usar ferramentas de IA para prototipar mais rápido, apertar o pitch e cortar escopo quando a ideia estava ampla demais. Menos discurso motivacional, mais o que entra em produção.

Os três melhores projetos foram premiados pelo impacto em relação ao enunciado do desafio do evento.`,
  },

  "devparana-astro-ai-responsibility": {
    fields: {
      title: "Astro, IA e responsabilidade do desenvolvedor",
      event: "DevParaná: Dois Vizinhos",
      description:
        "Palestra sobre Astro com IA no fluxo: intenção no prompt, acessibilidade e performance em vez de stacks mais pesadas por padrão.",
      location: "Dois Vizinhos, Paraná, Brasil",
      topics: [
        "Astro",
        "IA",
        "Comunidade",
        "Performance web",
        "Acessibilidade",
      ],
    },
    body: `Um ano depois da minha primeira palestra sobre Astro em Francisco Beltrão e de entrar na organização do DevParaná, eu já tinha falado em Pato Branco e Dois Vizinhos (três palestras e um minicurso).

No dia 24 de maio de 2026, em Dois Vizinhos (a convite do Gustavo Slomski), a palestra manteve o Astro como tema, mas saiu do tom de documentação e foi para a responsabilidade do desenvolvedor quando a IA entra no fluxo: deixar a intenção explícita no prompt e manter a posse do que entra em produção. Usei acessibilidade e performance como exemplos. Sem esse filtro, é fácil empurrar stacks mais pesadas para problemas que o Astro já resolve com menos JS.

No dia 25, em Francisco Beltrão, atuei como organizador; meu irmão deu a primeira palestra dele, sobre segurança.

Agradecimentos ao Geovane Norbert, ao Gabriel Prando e ao Gustavo Slomski.`,
  },

  "devparana-astro-performance": {
    fields: {
      title: "Astro e performance web: Islands na prática",
      event: "DevParaná: Pato Branco",
      description:
        "Palestra sobre Astro Islands: hidratação seletiva, tamanho de bundle Next.js vs Astro e a armadilha do Mega Island.",
      location: "Pato Branco, Paraná, Brasil",
      topics: [
        "Astro",
        "Performance web",
        "Arquitetura Islands",
        "React",
        "Next.js",
      ],
    },
    body: `Apresentei no DevParaná em Pato Branco. Foco: custo de bundle do React vs Islands do Astro, como a hidratação seletiva funciona e o erro do Mega Island: envolver a página inteira em \`client:load\` e anular o ganho. Incluiu comparações de build entre Next.js e Astro e a diferença de tamanho com islands vs uma island de página inteira.`,
  },

  "devparana-francisco-beltrao-first-talk": {
    fields: {
      title: "Começando com Astro: olhar de quem vem do React",
      event: "UNIPAR: Semana Acadêmica de Sistemas de Informação",
      description:
        "Convite do coordenador do curso de Sistemas de Informação da UNIPAR para compartilhar experiência prática com Astro em produção: o que muda na visão de quem vem do React e quando faz sentido usá-lo.",
      location: "Francisco Beltrão, Paraná, Brasil",
      topics: ["Astro", "React", "Frontend"],
    },
    body: `Convite do coordenador do curso de Sistemas de Informação da UNIPAR para falar de Astro em produção na visão de quem vem do React: hidratação seletiva, arquitetura Islands e quando o Astro encaixa melhor do que um framework React completo.`,
  },

  "techweek-utfpr-mentor": {
    fields: {
      title: "Mentor de hackathon",
      event: "1ª TechWeek: UTFPR / CESUL / TypeX / NUBETEC",
      description:
        "Mentorei times de estudantes no 1º hackathon da TechWeek em Francisco Beltrão em briefs da prefeitura: escopo, validação com usuários, MVP e pitch final.",
      location: "Francisco Beltrão, Paraná, Brasil",
      topics: ["Desenvolvimento de MVP", "Mentoria", "Pitch", "Validação"],
    },
    body: `Representei o DevParaná como mentor, junto com Gabriel Prando, no 1º hackathon da TechWeek em Francisco Beltrão, organizado por UTFPR, CESUL, CASIS, TypeX Sistemas e NUBETEC. Os times tiveram um dia para resolver problemas reais de Saúde, Administração e Meio Ambiente propostos pela prefeitura.

Na manhã, ajudei a clarear ideias e a entender para quem de fato estavam construindo. À tarde, pedi que reformulassem o problema com as próprias palavras antes de tocar em código. Alguns já tinham saído do escopo original. Nas horas finais, fizemos uma rodada de pré-pitch: cada time treinou a narrativa e eu ajudei a estruturar a história em torno de uma persona, não de uma lista de features.

Soluções vencedoras: (1) app de monitoramento de pacientes com fibromialgia, (2) app de gestão e compartilhamento de frota, (3) app de gestão do centro de zoonoses.`,
  },

  "unipar-workshop-frontend": {
    fields: {
      title: "Montando um portfólio simplificado com Astro",
      event: "Semana Acadêmica TADS: UNIPAR",
      description:
        "Minicurso na Semana Acadêmica de TADS da UNIPAR: do escopo e protótipo à arquitetura Astro, islands React, API do GitHub no build (SSG), deploy na Netlify e uma passada rápida de SEO/PageSpeed.",
      location: "Francisco Beltrão, Paraná, Brasil",
      topics: ["Astro", "React", "GitHub API", "Netlify", "SEO", "SSG"],
    },
    body: `Convite para conduzir um minicurso na Semana Acadêmica de Análise e Desenvolvimento de Sistemas (TADS) da UNIPAR. A sessão simulou uma demanda real: partir do escopo e de um protótipo, decidir a arquitetura e começar a codar. Começamos com componentes Astro e integramos React onde havia interatividade, para o JS no cliente ficar só nessas islands. Puxamos dados da API do GitHub no frontmatter do Astro no build (SSG), fizemos deploy na Netlify e olhamos fundamentos de SEO e PageSpeed Insights.`,
  },
};
