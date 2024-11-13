'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BadgeDollarSign, Package, Users } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DailyAnalytics } from '@/features/dashboard/schemas/daily-analytics';
import { TopSellingProduct } from '@/features/dashboard/schemas/top-selling-product';
import { Order } from '@/features/orders/schemas/orders';
import { Row } from '@/types/supabase/table';
import { formatCurrency } from '@/utils/utils';

import { IndependantSalesChartData } from './CreateIndependantSalesChart';
import { SalesPersonSalesChartData } from './CreateSalespersonSalesChart';
import { WebsiteSalesChartData } from './CreateWebsiteSalesChart';
import IndependantSalesChart from './IndependantSalesChart';
import SalesPersonSalesChart from './SalespersonSalesChart';
import WebsiteSalesChart from './WebsiteSalesChart';

type Props = {
  analytics: DailyAnalytics;
  topSellingProducts: TopSellingProduct[];
  WebsiteSalesChartData: WebsiteSalesChartData[];
  SalespersonSalesChartData: SalesPersonSalesChartData[];
  IndependantSalesChartData: IndependantSalesChartData[];
  latestOrders: Order[];
  ordersCount: number | null;
  salesTeam: Row<'users'>[];
  salesPersonOrders: Row<'orders'>[];
};

const FinancialsPage = ({
  analytics,
  topSellingProducts,
  WebsiteSalesChartData,
  SalespersonSalesChartData,
  latestOrders,
  ordersCount,
  IndependantSalesChartData,
  salesTeam,
  salesPersonOrders,
}: Props) => {
  const navigate = useRouter();
  return (
    <AnimatedDiv>
      <div className="flex flex-col">
        <PageHeader title="Financials" className="flex-none" />

        <div className="flex min-h-0 flex-1 flex-col gap-6">
          {/* Analytics Cards Row */}
          <div className="grid flex-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            <AnalyticCard
              title="Total Orders"
              value={ordersCount ?? 0}
              variant="outlined"
              icon={Users}
            />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-3 gap-5">
            {/* Left Column - Sales Chart and Orders */}

            {/* Sales Chart */}
            <div className="col-span-2">
              <Tabs defaultValue="Website">
                <TabsList>
                  <TabsTrigger className="text-lg" value="Website">
                    Website
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="Salesperson">
                    Salesperson
                  </TabsTrigger>
                  <TabsTrigger className="text-lg" value="Independant">
                    Independant
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="Website">
                  <WebsiteSalesChart
                    startDate={new Date('2024-02-01')}
                    endDate={new Date('2024-02-28')}
                    data={WebsiteSalesChartData}
                  />
                </TabsContent>
                <TabsContent value="Salesperson">
                  <SalesPersonSalesChart
                    startDate={new Date('2024-02-01')}
                    endDate={new Date('2024-02-28')}
                    data={SalespersonSalesChartData}
                  />
                </TabsContent>
                <TabsContent value="Independant">
                  <IndependantSalesChart
                    startDate={new Date('2024-02-01')}
                    endDate={new Date('2024-02-28')}
                    data={IndependantSalesChartData}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <Card className="h-full min-h-0 flex-1 overflow-auto shadow-none">
                  <CardHeader>
                    <CardTitle className="md:text-md text-gray-500">
                      Cost of goods sold (COGS)
                    </CardTitle>
                    <p className="text-2xl font-bold">{formatCurrency(analytics?.cogs ?? 0)}</p>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4"></CardContent>
                </Card>
              </div>
              <div>
                <Card className="h-full min-h-0 flex-1 overflow-auto shadow-none">
                  <CardHeader>
                    <CardTitle className="md:text-md text-gray-500">Sales Team</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div>
                      {salesTeam.map(user => (
                        <div key={user.id} className="flex items-center gap-10">
                          <div className="flex w-fit flex-col items-center gap-2">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="font-bold">
                                {user.first_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-md">{user.first_name}</p>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <p className="font-bold">Total Sales</p>
                              <p>
                                {formatCurrency(
                                  salesPersonOrders
                                    .filter(order => order.salesperson_id === user.id)
                                    .reduce((acc, order) => acc + order.total_amount, 0)
                                )}
                              </p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="font-bold">Orders</p>
                              <p>{salesPersonOrders.length} orders</p>
                            </div>
                            <div>
                              <Link href={`/salesperson/${user.id}`}>
                                <Button variant={'outline'}>View </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default FinancialsPage;
