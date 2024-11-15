import { eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval, format } from 'date-fns';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  current: {
    label: 'Current Period',
    color: 'hsl(var(--chart-1))',
  },
  previous: {
    label: 'Previous Period',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface SalesData {
  date: string;
  this_week: number;
  last_week: number;
}

interface IndependentSalesChartProps {
  data: SalesData[];
  startDate: string | Date;
  endDate: string | Date;
}

const parseDate = (date: string | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    // If invalid date, return current date
    return new Date();
  }
  return parsedDate;
};

// Helper to aggregate data by period
const aggregateDataByPeriod = (
  data: SalesData[],
  startDateInput: string | Date,
  endDateInput: string | Date
) => {
  const startDate = parseDate(startDateInput);
  const endDate = parseDate(endDateInput);

  try {
    const diffYears = endDate.getFullYear() - startDate.getFullYear();
    const diffMonths = endDate.getMonth() - startDate.getMonth() + diffYears * 12;

    // Determine the grouping period
    let periods: Date[];
    let dateFormat: string;

    if (diffMonths <= 1) {
      // Daily view for one month or less
      periods = eachDayOfInterval({ start: startDate, end: endDate });
      dateFormat = 'MMM d';
    } else if (diffMonths <= 12) {
      // Monthly view for up to a year
      periods = eachMonthOfInterval({ start: startDate, end: endDate });
      dateFormat = 'MMM yyyy';
    } else {
      // Yearly view for more than a year
      periods = eachYearOfInterval({ start: startDate, end: endDate });
      dateFormat = 'yyyy';
    }

    return periods.map(period => {
      const periodStart = format(period, 'yyyy-MM-dd');
      const matchingData = data.find(d => d.date === periodStart) || {
        this_week: 0,
        last_week: 0,
      };

      return {
        date: format(period, dateFormat),
        current_period: matchingData.this_week,
        previous_period: matchingData.last_week,
      };
    });
  } catch (error) {
    console.error('Error processing dates:', error);
    return [];
  }
};

export default function IndependentSalesChart({
  data,
  startDate,
  endDate,
}: IndependentSalesChartProps) {
  // Parse dates early
  const parsedStartDate = parseDate(startDate);
  const parsedEndDate = parseDate(endDate);

  const aggregatedData = aggregateDataByPeriod(data, parsedStartDate, parsedEndDate);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="flex h-full w-full flex-col shadow-none">
      <CardHeader className="flex-none">
        <CardTitle className="md:text-2xl">Independent Salesperson Sales Chart</CardTitle>
        <CardDescription>
          {format(parsedStartDate, 'MMM d, yyyy')} - {format(parsedEndDate, 'MMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 w-full flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full [&>div]:!aspect-auto">
          <div className="relative h-full w-full">
            <div className="absolute right-0 top-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-black"></div>
                <span className="text-sm text-gray-600">Current Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
                <span className="text-sm text-gray-600">Previous Period</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregatedData} margin={{ top: 20, right: 80, bottom: 20, left: 0 }}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={formatCurrency}
                  width={80}
                />
                <Bar dataKey="current_period" fill="black" radius={[0, 0, 4, 4]} maxBarSize={10} />
                <Bar
                  dataKey="previous_period"
                  fill="#3276E8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={10}
                />
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
