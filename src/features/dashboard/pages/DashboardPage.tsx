'use client';

import { BadgeDollarSign, Package, Users } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { formatCurrency } from '@/utils/utils';

import SalesChart from '../components/SalesChart';
import TopSellingProducts from '../components/TopSellingProducts';
import { DailyAnalytics } from '../schemas/daily-analytics';
import { TopSellingProduct } from '../schemas/top-selling-product';
import { SalesChartData } from '../utils/createChartData';

type Props = {
  analytics: DailyAnalytics;
  topSellingProducts: TopSellingProduct[];
  salesChartData: SalesChartData[];
};

const DashboardPage = ({ analytics, topSellingProducts, salesChartData }: Props) => {
  return (
    <AnimatedDiv>
      <div>
        <PageHeader title="Dashboard" />
        <div className="flex w-full flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnalyticCard
              title="Revenue"
              value={formatCurrency(analytics?.revenue ?? 0)}
              variant="dark"
              textColor="text-white"
              icon={BadgeDollarSign}
            />
            <AnalyticCard
              title="Products Sold"
              value={analytics?.total_products_sold ?? 0}
              variant="outlined"
              icon={Package}
            />
            <AnalyticCard
              title="New Customers"
              value={analytics?.new_customers ?? 0}
              variant="outlined"
              icon={Users}
            />
          </div>
          <div className="flex w-full items-start gap-6">
            <div className="flex flex-[0.7] flex-col gap-6">
              <SalesChart data={salesChartData} />
            </div>
            <div className="h-full flex-1">
              <TopSellingProducts topSellingProducts={topSellingProducts} />
            </div>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default DashboardPage;
