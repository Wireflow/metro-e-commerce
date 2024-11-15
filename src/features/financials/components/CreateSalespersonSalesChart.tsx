import { eachDayOfInterval, formatDate, parseISO } from 'date-fns';

export type SalesPersonSalesChartData = {
  date: string; // Fixed from 'data' to 'date'
};

export function CreateSalespersonSalesChart(
  startDate: string,
  endDate: string
): SalesPersonSalesChartData[] {
  // Added return type
  // Create an array of all days in the week
  const days = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  // Create the chart data array
  return days.map(day => {
    const dateStr = formatDate(day, 'yyyy-MM-dd');
    return {
      date: dateStr,
    } satisfies SalesPersonSalesChartData; // Added type check
  });
}
