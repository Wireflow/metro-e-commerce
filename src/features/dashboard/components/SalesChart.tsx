'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/utils/utils';

import { SalesChartData } from '../utils/createChartData';

export const description = 'A stacked bar chart with a legend';

const chartConfig = {
  running: {
    label: 'This Week',
    color: 'hsl(var(--chart-1))',
  },
  swimming: {
    label: 'Last Week',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function SalesChart({ data }: { data: SalesChartData[] }) {
  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="md:text-2xl">Sales Chart</CardTitle>
        <CardDescription>
          This shows this week&apos;s sales compared to last week&apos;s sales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => {
                return new Date(value).toLocaleDateString('en-US', {
                  weekday: 'short',
                });
              }}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatCurrency}
              width={60}
            />
            <Bar
              dataKey="this_week"
              stackId="a"
              fill="black"
              radius={[0, 0, 4, 4]}
              maxBarSize={10}
            />
            <Bar
              dataKey="last_week"
              stackId="a"
              fill="#3276E8"
              radius={[4, 4, 0, 0]}
              maxBarSize={10}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={v => formatCurrency(v as number)} hideIndicator />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
