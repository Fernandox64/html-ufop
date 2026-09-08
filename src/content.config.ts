import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    tipo: z.enum(['noticia', 'edital']),
    date: z.coerce.date(),
    image: z.string(),
    resumo: z.string(),
  }),
});

const docentes = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/docentes' }),
  schema: z.object({
    nome: z.string(),
    foto: z.string(),
    designacao: z.string(),
  }),
});

const funcionarios = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/funcionarios' }),
  schema: z.object({
    nome: z.string(),
    foto: z.string(),
    cargo: z.string(),
  }),
});

export const collections = { noticias, docentes, funcionarios };
