// lib/interfaces.ts
import { z } from "zod";
import {
  formOrderSchema,
  orderSchema,
  serviceSchema,
  workerSchema,
} from "../schemas/orderSchema";
import { userSchema, formUserSchema } from "../schemas/userSchema";

export type IWorker = z.infer<typeof workerSchema>;
export type IService = z.infer<typeof serviceSchema>;
export type IOrder = z.infer<typeof orderSchema>;
export type IFormOrder = z.infer<typeof formOrderSchema>;
export type IUser = z.infer<typeof userSchema>;
export type IFormUser = z.infer<typeof formUserSchema>;
