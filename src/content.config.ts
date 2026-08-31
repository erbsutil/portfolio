/**
 * Content Collections Configuration
 *
 * Collections:
 * - projects: Case studies
 * - speaking: Talks and presentations
 * - apps: Shippable products on the Products page
 *
 * @module content.config
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects (Case Studies) Collection
 */
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    year: z.number(),
    duration: z.string().optional(),
    teamSize: z.number().optional(),
    outcomeSummary: z.string(),
    overview: z.string(),
    problem: z.string(),
    constraints: z.array(z.string()),
    approach: z.string(),
    keyDecisions: z.array(z.object({
      decision: z.string(),
      reasoning: z.string(),
      alternatives: z.array(z.string()).optional(),
    })),
    techStack: z.array(z.string()),
    impact: z.object({
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      qualitative: z.string(),
      auditSource: z.string().optional(),
      auditDate: z.string().optional(),
    }),
    learnings: z.array(z.string()),
    featured: z.boolean().default(false),
    isMeta: z.boolean().optional(),
    status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),
    order: z.number().optional(),
    relatedProjects: z.array(z.string()).optional(),
    relatedDecisions: z.array(z.string()).optional(),
  }),
});

/**
 * Speaking/Talks Collection
 */
const speakingCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/speaking' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    event: z.string(),
    eventUrl: z.string().url().optional(),
    date: z.coerce.date(),
    location: z.string(),
    type: z.enum(['conference', 'meetup', 'podcast', 'workshop', 'webinar', 'mentoring', 'talk']),
    slides: z.string().url().optional(),
    video: z.string().url().optional(),
    duration: z.string().optional(),
    topics: z.array(z.string()).optional(),
    image: image().optional(),
    /** Extra photos on the talk detail page (after the cover). */
    gallery: z.array(image()).optional(),
    featured: z.boolean().default(false),
  }),
});

/**
 * Apps (Products) Collection
 *
 * Shippable products people can open and use. Distinct from case studies.
 */
const appsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/apps' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    icon: z.string(),
    category: z.string(),
    status: z.enum(['live', 'beta', 'coming-soon', 'archived']).default('live'),
    pricing: z.string().optional(),
    /** Product UI language(s), e.g. EN or [EN, ES, PT-BR]. */
    locale: z.union([z.string(), z.array(z.string())]).optional(),
    accent: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    howItWorks: z.array(z.string()).optional(),
    /** Prefer product. Lab kept for older content compatibility. */
    kind: z.enum(['product', 'lab']).default('product'),
    year: z.number(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  speaking: speakingCollection,
  apps: appsCollection,
};
