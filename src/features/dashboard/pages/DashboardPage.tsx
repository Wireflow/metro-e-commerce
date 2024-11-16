'use client';

import { BadgeDollarSign, Package, Users } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrdersList from '@/features/orders/components/OrdersList';
import { Order } from '@/features/orders/schemas/orders';
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
  latestOrders: Order[];
};

const DashboardPage = ({ analytics, topSellingProducts, salesChartData, latestOrders }: Props) => {
  return (
    <AnimatedDiv>
      <div className="flex flex-col">
        <PageHeader title="Dashboard" description="View your daily summary" className="flex-none" />

        <div className="flex min-h-0 flex-1 flex-col gap-6">
          {/* Analytics Cards Row */}
          <div className="grid flex-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          {/* Main Content Area */}
          <div className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
            {/* Left Column - Sales Chart and Orders */}
            <div className="flex min-h-0 flex-col gap-6 lg:w-2/3">
              {/* Sales Chart */}
              <div className="min-h-0 flex-1">
                <SalesChart data={salesChartData} />
              </div>
              {/* Orders List */}
              <Card className="h-full min-h-0 flex-1 overflow-auto shadow-none">
                <CardHeader>
                  <CardTitle className="md:text-2xl">Latest Orders</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <OrdersList
                    orders={latestOrders}
                    disabledFields={['customer']}
                    variant="minimal"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Top Selling Products */}
            <div className="min-h-0 w-full">
              <TopSellingProducts topSellingProducts={topSellingProducts} />
            </div>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default DashboardPage;
