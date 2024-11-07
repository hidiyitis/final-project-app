"use client"

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

const chartData = [
  { month: "January", packet: 186, general: 80 },
  { month: "February", packet: 305, general: 200 },
  { month: "March", packet: 237, general: 120 },
  { month: "April", packet: 73, general: 190 },
  { month: "May", packet: 209, general: 130 },
  { month: "June", packet: 214, general: 140 },
]

const chartConfig = {
  packet: {
    label: "packet",
    color: "hsl(var(--chart-1))",
    icon: TrendingDown,
  },
  general: {
    label: "general",
    color: "hsl(var(--chart-2))",
    icon: TrendingUp,
  },
} satisfies ChartConfig

export function Chart() {
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
              dataKey="general"
              type="natural"
              fill="var(--color-general)"
              fillOpacity={0.4}
              stroke="var(--color-general)"
              stackId="a"
            />
            <Area
              dataKey="packet"
              type="natural"
              fill="var(--color-packet)"
              fillOpacity={0.4}
              stroke="var(--color-packet)"
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
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}