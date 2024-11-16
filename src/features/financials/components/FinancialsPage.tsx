/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useRouter } from 'next/navigation';

import { endOfMonth, startOfMonth } from 'date-fns';
import { parseAsIsoDate, useQueryState } from 'nuqs';
import { DateRange } from 'react-day-picker';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { DailyAnalytics } from '@/features/dashboard/schemas/daily-analytics';
import { Row } from '@/types/supabase/table';

import ChartTabs from './ChartTabs';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DynamicDateSalesData } from './DynamicDateSalesChart';
import FinancialsAnalytics from './FinancialsAnalytics';
import RightComponents from './RightFinancialComponents';

export type SalesData = {
  website: DynamicDateSalesData[];
  salesperson: DynamicDateSalesData[];
  independent: DynamicDateSalesData[];
};

type FinancialsPageProps = {
  analytics: DailyAnalytics;
  chartData: SalesData;
  ordersCount: number | null;
  salesTeam: Row<'users'>[];
  salesPersonOrders: Row<'orders'>[];
};

const BREADCRUMBS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Financials', href: '/admin/financials?from=11/1/2024&to=11/30/2024' },
];

const FinancialsPage = ({
  analytics,
  ordersCount,
  salesTeam,
  chartData,
  salesPersonOrders,
}: FinancialsPageProps) => {
  const router = useRouter();
  const defaultDate = new Date();

  const [toDate, setToDate] = useQueryState(
    'to',
    parseAsIsoDate.withDefault(endOfMonth(defaultDate))
  );
  const [fromDate, setFromDate] = useQueryState(
    'from',
    parseAsIsoDate.withDefault(startOfMonth(defaultDate))
  );

  const handleDateChange = async (date?: DateRange) => {
    //@ts-ignore
    await Promise.all([setFromDate(date.from), setToDate(date.to)]);

    router.refresh();
  };

  return (
    <AnimatedDiv>
      <div className="flex flex-1 flex-col">
        <PageHeader
          title="Financials"
          description="manage your financials"
          className="flex-none"
          breadcrumbs={BREADCRUMBS}
          actions={
            <DatePickerWithRange
              date={{ from: fromDate, to: toDate }}
              onDateChange={handleDateChange}
            />
          }
        />

        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <FinancialsAnalytics analytics={analytics} ordersCount={ordersCount} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="col-span-2">
              <ChartTabs fromDate={fromDate} toDate={toDate} chartData={chartData} />
            </div>

            <RightComponents
              analytics={analytics}
              salesTeam={salesTeam}
              salesPersonOrders={salesPersonOrders}
            />
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default FinancialsPage;
