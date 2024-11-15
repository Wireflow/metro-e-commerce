import { endOfMonth, startOfMonth } from 'date-fns';

import { getDailyAnalytics } from '@/features/dashboard/server/getDailyAnalytics';
import { CreateIndependantSalesChart } from '@/features/financials/components/CreateIndependantSalesChart';
import { CreateSalespersonSalesChart } from '@/features/financials/components/CreateSalespersonSalesChart';
import { CreateWebsiteSalesChart } from '@/features/financials/components/CreateWebsiteSalesChart';
import FinancialsPage from '@/features/financials/components/FinancialsPage';
import { getOrdersCount } from '@/features/financials/server/getOrderCount';
import { getSalesPersonOrders } from '@/features/financials/server/getSalesPersonOrders';
import { getSalespersons } from '@/features/financials/server/getSalespersons';
import { getSalespersonSales } from '@/features/financials/server/getSalesPersonSales';
import { getWebsiteSales } from '@/features/financials/server/getWebsiteSales';

type props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const page = async ({ searchParams }: props) => {
  const searchP = await searchParams;
  const { from, to } = searchP;

  const fromDate = from ? (from as string) : startOfMonth(new Date()).toLocaleDateString();
  const toDate = to ? (to as string) : endOfMonth(new Date()).toLocaleDateString();

  const analytics = await getDailyAnalytics({
    startDate: fromDate,
    endDate: toDate,
  });

  const salesTeam = await getSalespersons();

  const ordersCount = await getOrdersCount({
    startDate: from ? new Date(from as string) : startOfMonth(new Date()),
    endDate: to ? new Date(to as string) : endOfMonth(new Date()),
  });

  const thisYearSales = await getWebsiteSales({
    startDate: fromDate,
    endDate: toDate,
  });
  const lastYearSales = await getWebsiteSales({
    startDate: fromDate,
    endDate: toDate,
  });

  const SalesPersonLastYearSales = await getSalespersonSales({
    startDate: fromDate,
    endDate: toDate,
  });

  const SalesPersonThisYearSales = await getSalespersonSales({
    startDate: fromDate,
    endDate: toDate,
  });

  const IndependantThisYearSales = await getSalespersonSales({
    startDate: fromDate,
    endDate: toDate,
  });

  const IndependantLastYearSales = await getSalespersonSales({
    startDate: fromDate,
    endDate: toDate,
  });

  const formattedWebsiteSales = CreateWebsiteSalesChart(
    thisYearSales,
    lastYearSales,
    from as string,
    to as string
  );
  const formattedSalePersonSales = CreateSalespersonSalesChart(
    SalesPersonThisYearSales,
    SalesPersonLastYearSales,
    from as string,
    to as string
  );

  const formattedIndependantSales = CreateIndependantSalesChart(
    IndependantThisYearSales,
    IndependantLastYearSales,
    from as string,
    to as string
  );

  const SalespersonOrders = await getSalesPersonOrders();

  return (
    <div>
      <FinancialsPage
        salesTeam={salesTeam}
        analytics={analytics}
        ordersCount={ordersCount}
        WebsiteSalesChartData={formattedWebsiteSales}
        SalespersonSalesChartData={formattedSalePersonSales}
        IndependantSalesChartData={formattedIndependantSales}
        salesPersonOrders={SalespersonOrders}
      />
    </div>
  );
};

export default page;
