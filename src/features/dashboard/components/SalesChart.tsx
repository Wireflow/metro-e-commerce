import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/utils/utils';

import { SalesChartData } from '../utils/createChartData';

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
    <Card className="flex h-full w-full flex-col shadow-none">
      <CardHeader className="flex-none">
        <CardTitle className="md:text-2xl">Sales Chart</CardTitle>
        <CardDescription>
          This shows this week&apos;s sales compared to last week&apos;s sales.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 w-full flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full [&>div]:!aspect-auto">
          <div className="relative h-full w-full">
            <div className="absolute right-0 top-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-black"></div>
                <span className="text-sm text-gray-600">This Week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-[#3276E8]"></div>
                <span className="text-sm text-gray-600">Last Week</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 80, bottom: 20, left: 20 }}
                barGap={0}
                barCategoryGap="35%"
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
                <Bar dataKey="this_week" fill="black" radius={[4, 4, 4, 4]} maxBarSize={10} />
                <Bar dataKey="last_week" fill="#3276E8" radius={[4, 4, 4, 4]} maxBarSize={10} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={v => formatCurrency(v as number)}
                      hideIndicator
                    />
                  }
                  cursor={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
