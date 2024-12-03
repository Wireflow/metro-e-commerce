/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { endOfMonth, startOfMonth } from 'date-fns';
import { parseAsIsoDate, useQueryState } from 'nuqs';
import { DateRange } from 'react-day-picker';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';

import { useFinancials, UseFinancialsParams } from '../hooks/useFinancialData';
import ChartTabs from './ChartTabs';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DynamicDateSalesData } from './DynamicDateSalesChart';
import FinancialsAnalytics from './FinancialsAnalytics';
import RightFinancialComponents from './RightFinancialComponents';

export type SalesData = {
  website: DynamicDateSalesData[];
  salesperson: DynamicDateSalesData[];
  independent: DynamicDateSalesData[];
};

type FinancialsPageProps = {
  initialData: UseFinancialsParams['initialData'];
};

const BREADCRUMBS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Financials', href: '/admin/financials?from=11/1/2024&to=11/30/2024' },
];

const FinancialsPage = ({ initialData }: FinancialsPageProps) => {
  const defaultDate = new Date();

  const [toDate, setToDate] = useQueryState(
    'to',
    parseAsIsoDate.withDefault(endOfMonth(defaultDate))
  );
  const [fromDate, setFromDate] = useQueryState(
    'from',
    parseAsIsoDate.withDefault(startOfMonth(defaultDate))
  );

  const { data, isLoading } = useFinancials({
    fromDate: fromDate?.toISOString(),
    toDate: toDate?.toISOString(),
    initialData,
  });

  const handleDateChange = async (date?: DateRange) => {
    if (!date?.from || !date?.to) return;

    await Promise.all([setFromDate(date.from), setToDate(date.to)]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return <div>Failed to fetch financials data</div>;

  const { analytics, salesTeam, ordersCount, salesPersonOrders, chartData } = data;

  return (
    <AnimatedDiv>
      <div className="flex min-h-screen flex-col">
        <PageHeader
          title="Financials"
          description="Manage your financials"
          breadcrumbs={BREADCRUMBS}
          actions={
            <DatePickerWithRange
              date={{ from: fromDate, to: toDate }}
              onDateChange={handleDateChange}
            />
          }
        />

        <div className="flex flex-col gap-6">
          {/* Analytics Cards */}
          <FinancialsAnalytics analytics={analytics} ordersCount={ordersCount} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Charts Section */}
            <div className="xl:col-span-2">
              <ChartTabs chartData={chartData} fromDate={fromDate} toDate={toDate} />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <RightFinancialComponents
                analytics={analytics}
                salesTeam={salesTeam}
                salesPersonOrders={salesPersonOrders}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default FinancialsPage;
