import { getDailyAnalytics } from '@/features/dashboard/server/getDailyAnalytics';
import { getLatestOrders } from '@/features/dashboard/server/getLatestOrders';
import { getTopSellingProducts } from '@/features/dashboard/server/getTopSellingProducts';
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
  console.log(searchP);

  const analytics = await getDailyAnalytics({
    startDate: from as string,
    endDate: to as string,
  });

  const SalesTeam = await getSalespersons();

  const ordersCount = await getOrdersCount({
    startDate: new Date(from as string),
    endDate: new Date(to as string),
  });
  console.log(new Date(from as string));
  const topSellingProducts = await getTopSellingProducts({
    startDate: from as string,
    endDate: to as string,
  });

  const thisYearSales = await getWebsiteSales({
    startDate: from as string,
    endDate: to as string,
  });
  const lastYearSales = await getWebsiteSales({
    startDate: from as string,
    endDate: to as string,
  });

  const SalesPersonLastYearSales = await getSalespersonSales({
    startDate: from as string,
    endDate: to as string,
  });

  const SalesPersonThisYearSales = await getSalespersonSales({
    startDate: from as string,
    endDate: to as string,
  });

  const IndependantThisYearSales = await getSalespersonSales({
    startDate: from as string,
    endDate: to as string,
  });

  const IndependantLastYearSales = await getSalespersonSales({
    startDate: from as string,
    endDate: to as string,
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
  const latestOrders = await getLatestOrders();
  const SalespersonOrders = await getSalesPersonOrders();

  return (
    <div>
      <FinancialsPage
        salesTeam={SalesTeam}
        analytics={analytics}
        topSellingProducts={topSellingProducts}
        latestOrders={latestOrders}
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
