/**
 * Page Metadata Configuration
 *
 * @module pages.config
 */

interface PageMeta {
  title: string;
  description: string;
  heading?: string;
  intro?: string;
}

export const pagesConfig = {
  home: {
    title: 'Home',
    description:
      'Senior Frontend Engineer at Reclame AQUI. Cases on architecture and performance, products like StackBrief, talks on Astro.',
  },

  projects: {
    title: 'Cases',
    description:
      'Architecture decision records from production: problem, constraints, alternatives rejected, and impact.',
    heading: 'Cases',
    intro:
      'Production work with the decision trail: what we faced, what we refused, and what shipped.',
  },

  speaking: {
    title: 'Community',
    description:
      'Talks, workshops, and mentoring by Erick Sutil: DevParaná, UNIPAR, Inovathon Sudovalley, TechWeek UTFPR, and more.',
    heading: 'Community',
    intro:
      'Talks at DevParaná, workshops at UNIPAR, mentoring at hackathons.',
  },

  products: {
    title: 'Products',
    description:
      'Try StackBrief and Dieta e Treino: live products with links out to each app.',
    heading: 'Products',
    intro:
      'Two live products. StackBrief and Dieta e Treino with free trial, then Pro.',
  },

  contact: {
    title: 'Contact',
    description:
      'Contact Erick Sutil about microfrontends, performance, collaborations, talks, or community work.',
    heading: 'Get in touch',
    intro:
      'For collaborations, talks, or conversations about architecture and performance, email is best.',
  },
} as const;

export type PagesConfig = typeof pagesConfig;
export type PageConfig = PageMeta;
