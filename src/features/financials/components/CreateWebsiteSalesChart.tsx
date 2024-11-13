import { eachDayOfInterval, formatDate, parseISO } from 'date-fns';

import { ViewRow } from '@/types/supabase/table';

export type WebsiteSalesChartData = {
  date: string; // Fixed from 'data' to 'date'
  this_week: number;
  last_week: number;
};

export function CreateWebsiteSalesChart(
  thisWeekSales: ViewRow<'website_only_branch_analytics'>[],
  lastWeekSales: ViewRow<'website_only_branch_analytics'>[],
  startDate: string,
  endDate: string
): WebsiteSalesChartData[] {
  // Added return type
  // Create an array of all days in the week
  const days = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  // Create a map for quick lookup of sales by date
  const thisWeekMap = new Map(thisWeekSales.map(sale => [sale.order_date, sale.revenue]));

  const lastWeekMap = new Map(lastWeekSales.map(sale => [sale.order_date, sale.revenue]));

  // Create the chart data array
  return days.map(day => {
    const dateStr = formatDate(day, 'yyyy-MM-dd');
    return {
      date: dateStr,
      this_week: thisWeekMap.get(dateStr) || 0,
      last_week: lastWeekMap.get(dateStr) || 0,
    } satisfies WebsiteSalesChartData; // Added type check
  });
}
