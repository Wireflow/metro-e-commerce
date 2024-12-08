import { endOfMonth, startOfMonth } from 'date-fns';

import { DynamicDateSalesData } from '../components/DynamicDateSalesChart';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatSalesData = (data: any[]): DynamicDateSalesData[] => {
  return data.map(sales => ({
    date: sales.order_date as string,
    sales: parseFloat(sales.revenue.toFixed(2)) as number,
  }));
};

export const getDateRange = (from?: string, to?: string) => {
  const today = new Date();
  return {
    fromDate: from || startOfMonth(today).toLocaleDateString(),
    toDate: to || endOfMonth(today).toLocaleDateString(),
    startDate: from ? new Date(from) : startOfMonth(today),
    endDate: to ? new Date(to) : endOfMonth(today),
  };
};
