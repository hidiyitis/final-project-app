import { z } from 'zod';
import { workerSchema } from './workerSchema';
import { serviceSchema } from './serviceSchema';

export const formOrderSchema = z.object({
  customerName: z.string(),
  address: z.string(),
  serviceId: z.number(),
  date: z.string(),
  status: z.string().optional(),
  totalPrice: z.number(),
  picId: z.number()
});

export const orderSchema = z.object({
  id: z.number(),
  customerName: z.string(),
  date: z.string(),
  address: z.string(),
  serviceId: z.number(),
  service: serviceSchema,
  status: z.string(),
  picId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  pic: workerSchema,
  totalPrice: z.number()
});