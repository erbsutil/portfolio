/**
 * Content Collections Configuration
 *
 * Collections:
 * - projects: Case studies
 * - speaking: Talks and presentations
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
    type: z.enum(['conference', 'meetup', 'podcast', 'workshop', 'webinar', 'mentoring']),
    slides: z.string().url().optional(),
    video: z.string().url().optional(),
    duration: z.string().optional(),
    topics: z.array(z.string()).optional(),
    image: image().optional(),
    featured: z.boolean().default(false),
  }),
});





export const collections = {
  projects: projectsCollection,
  speaking: speakingCollection,
};
