import { z } from 'zod';

export const formOrderSchema = z.object({
    title: z.string(),
    price: z.number(),
    desc: z.string()
  });

export const serviceSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    desc: z.string(),
    status: z.string()
  })