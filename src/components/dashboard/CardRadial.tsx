"use client"

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Chart Pesanan Dalam Pengerjaan"

// Konfigurasi chart
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig

export default function ChartRadial() {
  const [chartData, setChartData] = React.useState<{ browser: string; visitors: number; fill: string }[]>([]);
  const [totalVisitors, setTotalVisitors] = React.useState(0);

  useEffect(() => {
    // Fetch data dari backend
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/dashboard/chart"); 
        const data = await response.json();
        if (data.success) {
          const { inProgressOrders } = data.data;

          // Data untuk chart
          const chartValues = [
            { browser: "Sedang Dikerjakan", visitors: inProgressOrders, fill: "var(--color-progress)" },
            { browser: "Lainnya", visitors: 0, fill: "var(--color-other)" },
          ];

          setChartData(chartValues);
          setTotalVisitors(inProgressOrders);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center text-primary pb-0">
        <CardTitle>Pemesanan Dalam Pengerjaan</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pesanan
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan Total Pesanan Dalam Pengerjaan
        </div>
      </CardFooter>
    </Card>
  );
}
