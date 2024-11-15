import { eachDayOfInterval, formatDate, parseISO } from 'date-fns';

export type IndependantSalesChartData = {
  date: string; // Fixed from 'data' to 'date'
};

export function CreateIndependantSalesChart(
  startDate: string,
  endDate: string
): IndependantSalesChartData[] {
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
    } satisfies IndependantSalesChartData; // Added type check
  });
}
