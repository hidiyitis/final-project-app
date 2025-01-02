import { z } from 'zod';
import { serviceSchema } from '../schemas/orderSchema';

export type IService = z.infer<typeof serviceSchema>;