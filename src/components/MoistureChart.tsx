"use client";

import { useEffect, useState } from "react";
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
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartConfig = {
  moisture: {
    label: "Moisture",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface MoistureChartProps {
  chartData: { timestamp: string; moistureLevel: number }[] | null;
}

export function MoistureChart(props: MoistureChartProps) {
  const [chartData, setChartData] = useState<
    { time: string; moisture: number }[]
  >([]);

  const hasValidData = chartData.some((data) => !isNaN(data.moisture));

  useEffect(() => {
    if (!props.chartData) return;
    setChartData(
      props.chartData.map((data) => {
        return {
          time: data.timestamp,
          moisture: data.moistureLevel,
        };
      }),
    );
  }, [props.chartData]);

  return (
    <div className="relative h-64 w-full">
      {hasValidData ? (
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                right: 40,
                left: 40,
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
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="mt-4 text-center text-gray-600">
            No data available. Please check your sensor.
          </p>
        </div>
      )}
    </div>
  );
}
