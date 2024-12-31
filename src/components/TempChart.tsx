"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartData = [
  { time: "00:00", moisture: 45 },
  { time: "00:10", moisture: 47 },
  { time: "00:20", moisture: 46 },
  { time: "00:30", moisture: 48 },
  { time: "00:40", moisture: 50 },
  { time: "00:50", moisture: 49 },
  { time: "01:00", moisture: 51 },
  { time: "01:10", moisture: 52 },
  { time: "01:20", moisture: 50 },
  { time: "01:30", moisture: 49 },
  { time: "01:40", moisture: 48 },
  { time: "01:50", moisture: 47 },
];

const chartConfig = {
  moisture: {
    label: "Moisture",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MoistureChart() {
  return (
    <Card className="dark">
      <CardHeader>
        <CardTitle>Moisture Levels - Mock Data</CardTitle>
        <CardDescription>This is mock data</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                height={50}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={["dataMin - 5", "dataMax + 5"]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="moisture"
                type="natural"
                stroke="green"
                strokeWidth={2}
                dot={{
                  fill: "green",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average moisture level: 48.5% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing moisture levels for the last 2 hours
        </div>
      </CardFooter>
    </Card>
  );
}
