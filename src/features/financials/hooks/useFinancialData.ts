import { useQuery } from '@tanstack/react-query';

import { DailyAnalytics } from '@/features/dashboard/schemas/daily-analytics';
import { SalesData } from '@/features/financials/components/FinancialsPage';
import { Row } from '@/types/supabase/table';

import { fetchFinancialsData } from '../server/fetchFinancialData';
import { Salesperson } from '../server/getSalespersons';

export type FinancialsData = {
  analytics: DailyAnalytics;
  salesTeam: Salesperson[];
  ordersCount: number | null;
  salesPersonOrders: Row<'orders'>[];
  chartData: SalesData;
};

export interface UseFinancialsParams {
  fromDate?: string;
  toDate?: string;
  initialData?: FinancialsData;
}

export const useFinancials = ({ fromDate, toDate, initialData }: UseFinancialsParams = {}) => {
  return useQuery({
    queryKey: ['financials', fromDate, toDate],
    queryFn: async () => {
      const data = await fetchFinancialsData(fromDate, toDate);
      return data;
    },
    placeholderData: initialData,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
