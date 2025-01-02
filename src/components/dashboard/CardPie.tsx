"use client";

import React, { useEffect, useState } from "react";
import { Pie, PieChart, Sector, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartConfigItem {
  label: string;
  color: string;
}

const chartConfig: Record<string, ChartConfigItem> = {
  january: { label: "January", color: "hsl(var(--chart-1))" },
  february: { label: "February", color: "hsl(var(--chart-2))" },
  march: { label: "March", color: "hsl(var(--chart-3))" },
  april: { label: "April", color: "hsl(var(--chart-4))" },
  may: { label: "May", color: "hsl(var(--chart-5))" },
  june: { label: "June", color: "hsl(var(--chart-6))" },
};

export default function ChartPie() {
  const id = "pie-interactive";
  const [data, setData] = useState<{ month: string; total: number; fill: string }[]>([]);
  const [activeMonth, setActiveMonth] = useState<string>("january");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/dashboard/chart");
        const result = await response.json();

        if (response.ok && result?.data?.monthlyOrders) {
          // Process the monthlyOrders data from the backend
          const formattedData = result.data.monthlyOrders.map((item: any) => ({
            month: item.month.toLowerCase(),
            total: item.total,
            fill: chartConfig[item.month.toLowerCase()]?.color || "hsl(0, 0%, 80%)",
          }));

          setData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.month === activeMonth),
    [data, activeMonth]
  );
  const months = React.useMemo(() => data.map((item) => item.month), [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start text-primary space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pemesanan Berhasil</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="total"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={(props: any) => (
                <g>
                  <Sector {...props} outerRadius={props.outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={props.outerRadius + 25}
                    innerRadius={props.outerRadius + 12}
                  />
                </g>
              )}
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
                          {data[activeIndex]?.total.toLocaleString() || 0}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pesanan
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Menampilkan Total Pesanan Berhasil Dalam 6 Bulan Terakhir
        </div>
      </CardFooter>
    </Card>
  );
}
