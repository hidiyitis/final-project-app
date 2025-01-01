// lib/interfaces.ts
import { z } from 'zod';
import { formOrderSchema, orderSchema, serviceSchema, workerSchema } from '../schemas/orderSchema';

export type IWorker = z.infer<typeof workerSchema>;
export type IService = z.infer<typeof serviceSchema>;
export type IOrder = z.infer<typeof orderSchema>;
export type IFormOrder = z.infer<typeof formOrderSchema>