import { eachDayOfInterval, formatDate, parseISO } from 'date-fns';

export type WebsiteSalesChartData = {
  date: string;
};

export function CreateWebsiteSalesChart(
  startDate: string,
  endDate: string
): WebsiteSalesChartData[] {
  const days = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  // Create the chart data array
  return days.map(day => {
    const dateStr = formatDate(day, 'yyyy-MM-dd');
    return {
      date: dateStr,
    } satisfies WebsiteSalesChartData; // Added type check
  });
}
