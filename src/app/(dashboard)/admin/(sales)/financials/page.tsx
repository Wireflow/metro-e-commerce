import { formatDate } from 'date-fns';

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

const page = async () => {
  // Get the date range for the entire year
  const currentDate = new Date();
  const yearStart = new Date(currentDate.getFullYear(), 0, 1); // January 1st of current year
  const yearEnd = new Date(currentDate.getFullYear(), 11, 31); // December 31st of current year

  const analytics = await getDailyAnalytics({
    startDate: formatDate('2024-10-01', 'yyyy-MM-dd'),
    endDate: formatDate('2024-11-01', 'yyyy-MM-dd'),
  });

  const SalesTeam = await getSalespersons();
  const ordersCount = await getOrdersCount({
    startDate: yearStart,
    endDate: yearEnd,
  });

  const topSellingProducts = await getTopSellingProducts({
    startDate: formatDate(currentDate, 'yyyy-MM-dd'),
    endDate: formatDate(currentDate, 'yyyy-MM-dd'),
  });

  const lastYearStart = new Date(yearStart.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(yearStart.getFullYear() - 1, 11, 31);
  const thisYearSales = await getWebsiteSales({
    startDate: formatDate(yearStart, 'yyyy-MM-dd'),
    endDate: formatDate(yearEnd, 'yyyy-MM-dd'),
  });
  const lastYearSales = await getWebsiteSales({
    startDate: formatDate(lastYearStart, 'yyyy-MM-dd'),
    endDate: formatDate(lastYearEnd, 'yyyy-MM-dd'),
  });

  const SalesPersonLastYearSales = await getSalespersonSales({
    startDate: formatDate(lastYearStart, 'yyyy-MM-dd'),
    endDate: formatDate(lastYearEnd, 'yyyy-MM-dd'),
  });

  const SalesPersonThisYearSales = await getSalespersonSales({
    startDate: formatDate(lastYearStart, 'yyyy-MM-dd'),
    endDate: formatDate(lastYearEnd, 'yyyy-MM-dd'),
  });

  const IndependantThisYearSales = await getSalespersonSales({
    startDate: formatDate(lastYearStart, 'yyyy-MM-dd'),
    endDate: formatDate(lastYearEnd, 'yyyy-MM-dd'),
  });

  const IndependantLastYearSales = await getSalespersonSales({
    startDate: formatDate(lastYearStart, 'yyyy-MM-dd'),
    endDate: formatDate(lastYearEnd, 'yyyy-MM-dd'),
  });
  const formattedWebsiteSales = CreateWebsiteSalesChart(
    thisYearSales,
    lastYearSales,
    formatDate(yearStart, 'yyyy-MM-dd'),
    formatDate(yearEnd, 'yyyy-MM-dd')
  );
  const formattedSalePersonSales = CreateSalespersonSalesChart(
    SalesPersonThisYearSales,
    SalesPersonLastYearSales,
    formatDate(yearStart, 'yyyy-MM-dd'),
    formatDate(yearEnd, 'yyyy-MM-dd')
  );

  const formattedIndependantSales = CreateIndependantSalesChart(
    SalesPersonThisYearSales,
    SalesPersonLastYearSales,
    formatDate(yearStart, 'yyyy-MM-dd'),
    formatDate(yearEnd, 'yyyy-MM-dd')
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
