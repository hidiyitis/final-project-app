import { z } from 'zod';

export const dashboardChartSchema = z.object({
  labels: z.array(z.string()),
  datasets: z.array(
    z.object({
      label: z.string(),
      data: z.array(z.number()),
      backgroundColor: z.array(z.string()),
    })
  ),
});

export const dashboardCardSchema = z.object({
  orders: z.number(),
  inProgressOrders: z.number(),
  successfulOrders: z.number(),
  revenue: z.number(),
});
