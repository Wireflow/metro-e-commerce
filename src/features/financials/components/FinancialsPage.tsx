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
import { IndependantSalesChartData } from './CreateIndependantSalesChart';
import { SalesPersonSalesChartData } from './CreateSalespersonSalesChart';
import { WebsiteSalesChartData } from './CreateWebsiteSalesChart';
import { DatePickerWithRange } from './DatePickerWithRange';
import FinancialsAnalytics from './FinancialsAnalytics';
import { IndependantSalesData } from './IndependantSalesChart';
import RightComponents from './RightFinancialComponents';
import { SalespersonSalesData } from './SalespersonSalesChart';
import { WebsiteSalesData } from './WebsiteSalesChart';

type Props = {
  analytics: DailyAnalytics;
  WebsiteSalesChartData: WebsiteSalesChartData[];
  SalespersonSalesChartData: SalesPersonSalesChartData[];
  IndependantSalesChartData: IndependantSalesChartData[];
  ordersCount: number | null;
  salesTeam: Row<'users'>[];
  salesPersonOrders: Row<'orders'>[];
  totalWebsiteRevenue: WebsiteSalesData[];
  totalSalepersonRevenue: SalespersonSalesData[];
  totalIndependantSalesRevenue: IndependantSalesData[];
};

const FinancialsPage = ({
  analytics,
  ordersCount,
  salesTeam,
  salesPersonOrders,
  totalWebsiteRevenue,
  totalSalepersonRevenue,
  totalIndependantSalesRevenue,
}: Props) => {
  const navigate = useRouter();
  const [toDate, setToDate] = useQueryState<Date>(
    'to',
    parseAsIsoDate.withDefault(endOfMonth(new Date()))
  );
  const [fromDate, setFromDate] = useQueryState<Date>(
    'from',
    parseAsIsoDate.withDefault(startOfMonth(new Date()))
  );

  const handleOnDateChange = async (date: DateRange) => {
    //@ts-ignore
    await setFromDate(date?.from);
    //@ts-ignore
    await setToDate(date?.to);
    navigate.refresh();
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Financials', href: '/admin/financials?from=11/1/2024&to=11/30/2024' },
  ];

  return (
    <AnimatedDiv>
      <div className="flex flex-1 flex-col">
        <div>
          <PageHeader
            title="Financials"
            description="manage your financials"
            className="flex-none"
            breadcrumbs={breadcrumbs}
            actions={
              <DatePickerWithRange
                onDateChange={(date: DateRange | undefined) =>
                  handleOnDateChange({
                    from: date?.from,
                    to: date?.to,
                  })
                }
                date={{ from: fromDate, to: toDate }}
              />
            }
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <FinancialsAnalytics analytics={analytics} ordersCount={ordersCount} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="col-span-2">
              <ChartTabs
                fromDate={fromDate}
                toDate={toDate}
                totalWebsiteRevenue={totalWebsiteRevenue}
                totalSalepersonRevenue={totalSalepersonRevenue}
                totalIndependantSalesRevenue={totalIndependantSalesRevenue}
              />
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
