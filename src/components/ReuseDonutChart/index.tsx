"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
  [key: string]: number;
};

interface ReuseDonutChartProps {
  data: ChartData;
  title: string;
  description?: string;
  trendPercentage?: number;
  footerText?: string;
}

const chartColors = [
  "hsl(221.2, 83.2%, 53.3%)",
  "hsl(212, 95%, 68%)",
  "hsl(216, 92%, 60%)",
  "hsl(210, 98%, 78%)",
  "hsl(212, 97%, 87%)",
];

const ReuseDonutChart = ({
  data,
  title,
  description,
  trendPercentage,
  footerText,
}: ReuseDonutChartProps) => {
  // map data
  const chartData = React.useMemo(
    () =>
      Object.entries(data).map(([name, value]) => ({
        name,
        value,
      })),
    [data]
  );

  // get largest value
  const largestValue = React.useMemo(() => {
    const maxEntry = chartData.reduce(
      (max, current) => (current.value > max.value ? current : max),
      chartData[0]
    );
    return { value: maxEntry.value, name: maxEntry.name };
  }, [chartData]);

  // map color
  const chartConfig = React.useMemo(
    () =>
      Object.fromEntries(
        Object.keys(data).map((key, index) => [
          key.toLowerCase(),
          {
            label: key,
            color: chartColors[index % chartColors.length],
          },
        ])
      ),
    [data]
  ) as ChartConfig;

  return (
    <Card className="flex flex-col shadow-sm h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px] aspect-square"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={5}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
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
                            className="fill-foreground font-bold text-3xl"
                          >
                            {largestValue.value.toFixed(1)}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            {largestValue.name}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {(trendPercentage !== undefined || footerText) && (
        <CardFooter className="flex-col gap-2 text-sm">
          {trendPercentage !== undefined && (
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending {trendPercentage > 0 ? "up" : "down"} by{" "}
              {Math.abs(trendPercentage)}% this month
              {trendPercentage > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
            </div>
          )}
          {footerText && (
            <div className="text-muted-foreground leading-none">
              {footerText}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ReuseDonutChart;
