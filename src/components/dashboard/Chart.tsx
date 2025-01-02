"use client";
import React, { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An area chart with icons";

interface ChartData {
  monthlyOrders: { month: string; total: number }[];
  inProgressOrders: { total: number }[];
  completedOrder: { total: number }[];
}

interface ChartProps {
  data: ChartData;
}

// Konfigurasi chart
const chartConfig = {
  monthlyOrders: {
    label: "Monthly Orders",
    color: "hsl(var(--chart-1))",
    icon: TrendingUp,
  },
  inProgressOrders: {
    label: "In-Progress Orders",
    color: "hsl(var(--chart-2))",
    icon: TrendingDown,
  },
  completedOrder: {
    label: "Completed Orders",
    color: "hsl(var(--chart-3))",
    icon: TrendingUp,
  },
} satisfies ChartConfig;

export function Chart({ data }: ChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Normalisasi data dari props
    if (data && data.monthlyOrders.length > 0) {
      const normalizedData = data.monthlyOrders.map((order, index) => ({
        month: order.month || `Month ${index + 1}`,
        monthlyOrders: order.total || 0,
        inProgressOrders: data.inProgressOrders[index]?.total || 0,
        completedOrder: data.completedOrder[index]?.total || 0,
      }));
      setChartData(normalizedData);
    }
  }, [data]);

  // Tampilkan pesan jika data kosong
  if (!chartData.length) {
    return <p className="text-center text-muted">No data available</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Pemesanan</CardTitle>
        <CardDescription>Data pemesanan dalam kurun waktu 6 bulan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Ambil 3 huruf pertama nama bulan
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="monthlyOrders"
              type="natural"
              fill="var(--color-monthlyOrders)"
              fillOpacity={0.4}
              stroke="var(--color-monthlyOrders)"
              stackId="a"
            />
            <Area
              dataKey="inProgressOrders"
              type="natural"
              fill="var(--color-inProgressOrders)"
              fillOpacity={0.4}
              stroke="var(--color-inProgressOrders)"
              stackId="a"
            />
            <Area
              dataKey="completedOrder"
              type="natural"
              fill="var(--color-completedOrder)"
              fillOpacity={0.4}
              stroke="var(--color-completedOrder)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Data pemesanan berdasarkan status pesanan{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Data tahun {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
