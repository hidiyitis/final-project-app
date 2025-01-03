import { z } from "zod";

export const workerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  alamat: z.string(),
});

export const serviceSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  desc: z.string(),
  status: z.string(),
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
  totalPrice: z.number(),
});

export const formOrderSchema = z.object({
  customerName: z.string(),
  address: z.string(),
  serviceId: z.number(),
  date: z.string(),
  status: z.string().optional(),
  totalPrice: z.number(),
  picId: z.number(),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  status: z.string(),
  accessRole: z.string(),
  refreshToken: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const formUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  status: z.string(),
  accessRole: z.string(),
});
