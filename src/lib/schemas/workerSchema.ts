import { z } from 'zod';

export const workerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  alamat: z.string(),
});