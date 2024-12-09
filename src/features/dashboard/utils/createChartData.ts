import { eachDayOfInterval, formatDate, parseISO, subWeeks } from 'date-fns';

import { ViewRow } from '@/types/supabase/table';

export type SalesChartData = {
  date: string;
  this_week: number;
  last_week: number;
};

export function createChartData(
  thisWeekSales: ViewRow<'daily_branch_analytics'>[],
  lastWeekSales: ViewRow<'daily_branch_analytics'>[],
  startDate: string,
  endDate: string
): SalesChartData[] {
  // Create arrays of dates for this week
  const thisWeekDays = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  // Create maps to sum up daily revenues
  const thisWeekMap = new Map<string, number>();
  const lastWeekMap = new Map<string, number>();

  // Sum up this week's revenues by date
  thisWeekSales.forEach(sale => {
    const date = sale.order_date ?? '';
    const currentTotal = thisWeekMap.get(date) || 0;
    thisWeekMap.set(date, currentTotal + (sale.revenue ?? 0));
  });

  // Sum up last week's revenues by date
  lastWeekSales.forEach(sale => {
    const date = sale?.order_date ?? '';
    const currentTotal = lastWeekMap.get(date) || 0;
    lastWeekMap.set(date, currentTotal + (sale?.revenue ?? 0));
  });

  // Create the chart data array
  return thisWeekDays.map(day => {
    const thisWeekDate = formatDate(day, 'yyyy-MM-dd');
    const lastWeekDate = formatDate(subWeeks(day, 1), 'yyyy-MM-dd');

    return {
      date: thisWeekDate,
      this_week: thisWeekMap.get(thisWeekDate) || 0,
      last_week: lastWeekMap.get(lastWeekDate) || 0,
    } satisfies SalesChartData;
  });
}
