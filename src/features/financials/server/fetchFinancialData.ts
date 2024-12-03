'use server';

import { getDailyAnalytics } from '@/features/dashboard/server/getDailyAnalytics';

import { UseFinancialsParams } from '../hooks/useFinancialData';
import { formatSalesData, getDateRange } from '../utils/chartUtils';
import { getIndependantSales } from './getIndependantSales';
import { getOrdersCount } from './getOrderCount';
import { getSalesPersonOrders } from './getSalesPersonOrders';
import { getSalespersons } from './getSalespersons';
import { getSalespersonSales } from './getSalesPersonSales';
import { getWebsiteSales } from './getWebsiteSales';

export const fetchFinancialsData = async (
  fromDate?: string,
  toDate?: string
): Promise<UseFinancialsParams['initialData']> => {
  const { fromDate: start, toDate: end, startDate, endDate } = getDateRange(fromDate, toDate);

  const [
    analytics,
    salesTeam,
    ordersCount,
    salesPersonOrders,
    websiteSales,
    salesPersonSales,
    independantSales,
  ] = await Promise.all([
    getDailyAnalytics({ startDate: start, endDate: end }),
    getSalespersons(),
    getOrdersCount({ startDate, endDate }),
    getSalesPersonOrders(),
    getWebsiteSales({ startDate: start, endDate: end }),
    getSalespersonSales({ startDate: start, endDate: end }),
    getIndependantSales({ startDate: start, endDate: end }),
  ]);

  const chartData = {
    website: formatSalesData(websiteSales),
    salesperson: formatSalesData(salesPersonSales),
    independent: formatSalesData(independantSales),
  };

  return {
    analytics,
    salesTeam,
    ordersCount,
    salesPersonOrders,
    chartData,
  };
};
