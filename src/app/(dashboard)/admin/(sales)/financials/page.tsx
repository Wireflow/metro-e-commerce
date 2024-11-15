import { endOfMonth, startOfMonth } from 'date-fns';

import { getDailyAnalytics } from '@/features/dashboard/server/getDailyAnalytics';
import { CreateIndependantSalesChart } from '@/features/financials/components/CreateIndependantSalesChart';
import { CreateSalespersonSalesChart } from '@/features/financials/components/CreateSalespersonSalesChart';
import { CreateWebsiteSalesChart } from '@/features/financials/components/CreateWebsiteSalesChart';
import FinancialsPage from '@/features/financials/components/FinancialsPage';
import { getIndependantSales } from '@/features/financials/server/getIndependantSales';
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

  const formattedWebsiteSales = CreateWebsiteSalesChart(from as string, to as string);
  const formattedSalePersonSales = CreateSalespersonSalesChart(from as string, to as string);

  const formattedIndependantSales = CreateIndependantSalesChart(from as string, to as string);

  const SalespersonOrders = await getSalesPersonOrders();

  const WebsiteSales = await getWebsiteSales();
  const salesPersonSales = await getSalespersonSales();
  const independantSales = await getIndependantSales();

  const totalWebsiteRevenue = WebsiteSales.map(sales => ({
    date: sales.order_date as string,
    sales: sales.revenue as number,
  }));
  const totalSalepersonRevenue = salesPersonSales.map(sales => ({
    date: sales.order_date as string,
    sales: sales.revenue as number,
  }));
  const totalIndependantSalesRevenue = independantSales.map(sales => ({
    date: sales.order_date as string,
    sales: sales.revenue as number,
  }));

  return (
    <div>
      <FinancialsPage
        salesTeam={salesTeam}
        analytics={analytics}
        ordersCount={ordersCount}
        totalWebsiteRevenue={totalWebsiteRevenue}
        totalSalepersonRevenue={totalSalepersonRevenue}
        totalIndependantSalesRevenue={totalIndependantSalesRevenue}
        WebsiteSalesChartData={formattedWebsiteSales}
        SalespersonSalesChartData={formattedSalePersonSales}
        IndependantSalesChartData={formattedIndependantSales}
        salesPersonOrders={SalespersonOrders}
      />
    </div>
  );
};

export default page;
