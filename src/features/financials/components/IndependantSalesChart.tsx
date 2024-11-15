import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface IndependantSalesData {
  date: string;
  sales: number;
}

interface IndependantSalesChartProps {
  startDate: string | Date;
  endDate: string | Date;
  IndependantSalesData: IndependantSalesData[];
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

const getMonth = (dateString: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (months.includes(dateString)) {
    return dateString;
  }

  const date = new Date(dateString);
  return months[date.getMonth()];
};

const IndependantSalesChart = ({
  IndependantSalesData,
  startDate,
  endDate,
}: IndependantSalesChartProps) => {
  const [chartDimensions, setChartDimensions] = useState({ width: 800, height: 400 });
  const cardRef = useRef<HTMLDivElement>(null);
  const parsedStartDate = parseDate(startDate);
  const parsedEndDate = parseDate(endDate);

  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setChartDimensions({
          width: width - 40, // Account for padding
          height: height - 40,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const formatData = IndependantSalesData.map(item => ({
    date: getMonth(item.date),
    sales: item.sales,
  }));

  const aggregatedData = formatData.reduce(
    (acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = 0;
      }
      acc[curr.date] += curr.sales;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.entries(aggregatedData).map(([month, sales]) => ({
    month,
    sales,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex-none">
        <CardTitle className="text-2xl">Independant Sales Chart</CardTitle>
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
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.substring(0, 3)}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
                      <p className="text-sm font-medium">{payload[0].payload.month}</p>
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

export default IndependantSalesChart;
