/** Portuguese overlays for apps. Portfolio/CV tone; natural Brazilian Portuguese. */

export const appsPtBR: Record<string, Record<string, unknown>> = {
  stackbrief: {
    tagline: "Resumos diários de dependências com base no seu lockfile",
    description:
      "Todos os dias, o StackBrief analisa releases e changelogs das bibliotecas da sua stack e envia um resumo curto do que pode afetar o projeto. Não é um feed de CVE. Teste gratuito, depois plano Pro. Disponível em inglês, espanhol e português.",
    pricing: "Teste gratuito · Pro",
    category: "Infraestrutura",
    howItWorks: [
      "Lê o package.json e o lockfile da stack conectada",
      "Cruza releases upstream com as versões que você realmente usa",
      "Entrega um resumo curto no dia, no painel e no Telegram",
    ],
  },
  "dieta-e-treino": {
    tagline: "Alimentação e treino pelo Telegram, com painel quando precisar",
    description:
      "Registre refeições e treinos em segundos no Telegram, por texto, voz ou foto, e abra o painel quando quiser ver o panorama. Interface e conteúdo em português. Teste gratuito, depois plano Pro.",
    pricing: "Teste gratuito · Pro",
    category: "Hábitos",
    howItWorks: [
      "Webhook do Telegram recebe refeições e treinos (texto, foto, áudio)",
      "Windmill e Gemini extraem e gravam os dados estruturados",
      "Painel com token abre macros, consistência e assinatura Stripe sob demanda",
    ],
  },
};
