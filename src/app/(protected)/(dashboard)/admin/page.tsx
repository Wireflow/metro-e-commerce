import { endOfWeek, formatDate, startOfWeek, subWeeks } from 'date-fns';

import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import { getDailyAnalytics } from '@/features/dashboard/server/getDailyAnalytics';
import { getLatestOrders } from '@/features/dashboard/server/getLatestOrders';
import { getSales } from '@/features/dashboard/server/getSales';
import { getTopSellingProducts } from '@/features/dashboard/server/getTopSellingProducts';
import { createChartData } from '@/features/dashboard/utils/createChartData';

export default async function Admin() {
  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const thisWeekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });

  const lastWeekStart = subWeeks(thisWeekStart, 1);
  const lastWeekEnd = subWeeks(thisWeekEnd, 1);

  const analytics = await getDailyAnalytics({
    startDate: formatDate(new Date(), 'yyyy-MM-dd'),
    endDate: formatDate(new Date(), 'yyyy-MM-dd'),
  });

  const topSellingProducts = await getTopSellingProducts();

  const thisWeeksSales = await getSales({
    startDate: formatDate(thisWeekStart, 'yyyy-MM-dd'),
    endDate: formatDate(thisWeekEnd, 'yyyy-MM-dd'),
  });

  const lastWeekSales = await getSales({
    startDate: formatDate(lastWeekStart, 'yyyy-MM-dd'),
    endDate: formatDate(lastWeekEnd, 'yyyy-MM-dd'),
  });

  const formattedSales = createChartData(
    thisWeeksSales,
    lastWeekSales,
    formatDate(thisWeekStart, 'yyyy-MM-dd'),
    formatDate(thisWeekEnd, 'yyyy-MM-dd')
  );

  const latestOrders = await getLatestOrders();

  return (
    <DashboardPage
      analytics={analytics}
      topSellingProducts={topSellingProducts}
      salesChartData={formattedSales}
      latestOrders={latestOrders}
    />
  );
}
