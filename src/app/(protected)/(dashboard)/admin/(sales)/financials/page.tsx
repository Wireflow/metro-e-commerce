import { getDailyAnalytics } from '@/features/dashboard/server/getDailyAnalytics';
import FinancialsPage from '@/features/financials/components/FinancialsPage';
import { getIndependantSales } from '@/features/financials/server/getIndependantSales';
import { getOrdersCount } from '@/features/financials/server/getOrderCount';
import { getSalesPersonOrders } from '@/features/financials/server/getSalesPersonOrders';
import { getSalespersons } from '@/features/financials/server/getSalespersons';
import { getSalespersonSales } from '@/features/financials/server/getSalesPersonSales';
import { getWebsiteSales } from '@/features/financials/server/getWebsiteSales';
import { formatSalesData, getDateRange } from '@/features/financials/utils/chartUtils';

type PageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const { fromDate, toDate, startDate, endDate } = getDateRange(params?.from, params?.to);

  const [
    analytics,
    salesTeam,
    ordersCount,
    salesPersonOrders,
    websiteSales,
    salesPersonSales,
    independantSales,
  ] = await Promise.all([
    getDailyAnalytics({ startDate: fromDate, endDate: toDate }),
    getSalespersons(),
    getOrdersCount({ startDate, endDate }),
    getSalesPersonOrders(),
    getWebsiteSales({ startDate: fromDate, endDate: toDate }),
    getSalespersonSales({ startDate: fromDate, endDate: toDate }),
    getIndependantSales({ startDate: fromDate, endDate: toDate }),
  ]);

  const chartData = {
    website: formatSalesData(websiteSales),
    salesperson: formatSalesData(salesPersonSales),
    independent: formatSalesData(independantSales),
  };

  return (
    <FinancialsPage
      salesTeam={salesTeam}
      analytics={analytics}
      chartData={chartData}
      ordersCount={ordersCount}
      salesPersonOrders={salesPersonOrders}
    />
  );
};

export default Page;
