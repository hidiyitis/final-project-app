"use client"
import React from "react"
import { useEffect, useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with icons"

interface ChartProps {
  data: any; 
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
  const [chartData, setChartData] = useState([]) // State untuk data chart
  const [loading, setLoading] = useState(true) // State untuk loading

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/v1/dashboard/chart") 
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data")
  //       }
  //       const result = await response.json()

  //       // Normalisasi data dari backend
  //       const normalizedData = result.data.monthlyOrders.map((order: any, index: number) => ({
  //         month: order.month,
  //         monthlyOrders: order.total,
  //         inProgressOrders: result.data.inProgressOrders[index]?.total || 0,
  //         completedOrder: result.data.completedOrder[index]?.total || 0,
  //       }))

  //       setChartData(normalizedData)
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  useEffect(() => {
    if (data) {
      // Normalisasi data dari backend jika data sudah ada
      const normalizedData = data.monthlyOrders.map((order: any, index: number) => ({
        month: order.month,
        monthlyOrders: order.total,
        inProgressOrders: data.inProgressOrders[index]?.total || 0,
        completedOrder: data.completedOrder[index]?.total || 0,
      }));

      setChartData(normalizedData);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <p>Loading data...</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Pemesanan</CardTitle>
        <CardDescription>
          Data pemesanan dalam kurun waktu 6 bulan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
  )
}
