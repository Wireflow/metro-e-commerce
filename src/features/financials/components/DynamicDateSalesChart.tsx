import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export type DynamicDateSalesData = {
  date: string;
  sales: number;
};

interface DynamicDateSalesChartProps {
  startDate: string | Date;
  endDate: string | Date;
  title: string;
  data: DynamicDateSalesData[];
}

const parseDate = (date: string | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return new Date();
  }
  return parsedDate;
};

const getTimeInterval = (startDate: Date, endDate: Date) => {
  const daysDiff = differenceInDays(endDate, startDate);
  const monthsDiff = differenceInMonths(endDate, startDate);
  const yearsDiff = differenceInYears(endDate, startDate);

  if (yearsDiff >= 1) {
    return 'year';
  } else if (monthsDiff >= 3) {
    return 'month';
  } else if (daysDiff > 14) {
    return 'week';
  }
  return 'day';
};

const formatDateByInterval = (date: Date, interval: string): string => {
  switch (interval) {
    case 'year':
      return format(date, 'yyyy');
    case 'month':
      return format(date, 'MMM yyyy');
    case 'week':
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`;
    case 'day':
      return format(date, 'MMM d');

    default:
      return format(date, 'MMM d, yyyy');
  }
};

const aggregateDataByInterval = (
  data: DynamicDateSalesData[],
  startDate: Date,
  endDate: Date,
  interval: string
) => {
  const aggregated: Record<string, number> = {};
  let intervalDates;

  switch (interval) {
    case 'year':
      intervalDates = eachYearOfInterval({ start: startDate, end: endDate });
      break;
    case 'month':
      intervalDates = eachMonthOfInterval({ start: startDate, end: endDate });
      break;
    case 'week':
      intervalDates = eachWeekOfInterval({ start: startDate, end: endDate });
      break;
    case 'day':
      intervalDates = eachDayOfInterval({ start: startDate, end: endDate });
      break;
  }

  // Initialize all intervals with 0
  intervalDates?.forEach(date => {
    aggregated[formatDateByInterval(date, interval)] = 0;
  });

  // Aggregate sales data
  data.forEach(item => {
    const itemDate = parseDate(item.date);
    let key;

    switch (interval) {
      case 'year':
        key = format(itemDate, 'yyyy');
        break;
      case 'month':
        key = format(itemDate, 'MMM yyyy');
        break;
      case 'week':
        const weekStart = startOfWeek(itemDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(itemDate, { weekStartsOn: 1 });
        key = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`;
        break;
      case 'day':
        key = format(itemDate, 'MMM d');
        break;
    }

    if (key && aggregated[key] !== undefined) {
      aggregated[key] += item.sales;
    }
  });

  return Object.entries(aggregated).map(([date, sales]) => ({
    date,
    sales,
  }));
};

const DynamicDateSalesChart = ({ data, startDate, endDate, title }: DynamicDateSalesChartProps) => {
  const [chartDimensions, setChartDimensions] = useState({ width: 800, height: 400 });
  const cardRef = useRef<HTMLDivElement>(null);
  const parsedStartDate = parseDate(startDate);
  const parsedEndDate = parseDate(endDate);
  const interval = getTimeInterval(parsedStartDate, parsedEndDate);

  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setChartDimensions({
          width: width - 40,
          height: height - 40,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const chartData = aggregateDataByInterval(data, parsedStartDate, parsedEndDate, interval);

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex-none">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          {format(parsedStartDate, 'MMM d, yyyy')} - {format(parsedEndDate, 'MMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent ref={cardRef} className="flex-1">
        <div className="h-full w-full">
          <BarChart
            width={chartDimensions.width}
            height={chartDimensions.height}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              className="text-xs"
              axisLine={false}
              angle={['week', 'day'].includes(interval) ? -45 : 0}
              textAnchor={['week', 'day'].includes(interval) ? 'end' : 'middle'}
              height={['week', 'day'].includes(interval) ? 60 : 30}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
                      <p className="text-sm font-medium">{payload[0].payload.date}</p>
                      <p className="text-sm text-gray-500">Sales: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="sales" fill="#1a202c" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicDateSalesChart;
