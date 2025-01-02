import { z } from 'zod';
import { formOrderSchema, orderSchema } from '../schemas/orderSchema';

export type IOrder = z.infer<typeof orderSchema>;
export type IFormOrder = z.infer<typeof formOrderSchema>