'use client';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomersList from '@/features/customers/components/CustomersList';
import OrdersList from '@/features/orders/components/OrdersList';
import { Order } from '@/features/orders/schemas/orders';
import { Row, ViewRow } from '@/types/supabase/table';
import { calculateTotalSales, filterApprovedOrders } from '@/utils/orderUtils';
import { getUserFullName } from '@/utils/userUtils';

import UserPerformanceMetrics from '../components/UserPerformanceMetrics';
import UserProfileCard from '../components/UserProfileCard';

type Props = {
  user: Row<'users'>;
  orders: Order[];
  customers: ViewRow<'customers_with_address'>[];
};

const UserDetailsPage = ({ user, orders, customers }: Props) => {
  const approvedOrders = filterApprovedOrders(orders);
  const totalSales = calculateTotalSales(approvedOrders);
  const avgOrderValue = totalSales / orders?.length || 0;

  const activeCustomers = customers.length;
  const totalOrders = orders.length;

  const userFullName = getUserFullName(user);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Sales Reps', href: '/admin/users/sales' },
    { label: userFullName, href: `/admin/users/${user.id}` },
  ];

  return (
    <AnimatedDiv>
      <div className="flex h-full flex-col">
        <PageHeader title={userFullName} description={user.email} breadcrumbs={breadcrumbs} />
        <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <UserProfileCard user={user} />
          <UserPerformanceMetrics
            orders={orders}
            totalSales={totalSales}
            avgOrderValue={avgOrderValue}
          />
        </div>

        <Card className="flex flex-1 flex-col overflow-hidden">
          <Tabs defaultValue="orders" className="flex h-full flex-col">
            <div className="px-4 pt-4">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="mb-4 grid h-auto grid-cols-2 p-1 sm:mb-0 sm:flex sm:gap-2">
                  <TabsTrigger
                    value="orders"
                    className="flex items-center gap-2 data-[state=active]:shadow-none"
                  >
                    Orders
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{totalOrders}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="customers"
                    className="flex items-center gap-2 data-[state=active]:shadow-none"
                  >
                    Customers
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                      {activeCustomers}
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="flex-1 overflow-hidden px-4 pb-4">
              <TabsContent value="orders" className="mt-0 h-full border-none p-0">
                <div className="max-h-[600px] overflow-auto rounded-lg border bg-card custom-scrollbar">
                  <OrdersList orders={orders} />
                </div>
              </TabsContent>

              <TabsContent value="customers" className="mt-0 h-full border-none p-0">
                <div className="max-h-[600px] overflow-auto rounded-lg border bg-card custom-scrollbar">
                  <CustomersList customers={customers} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </AnimatedDiv>
  );
};

export default UserDetailsPage;
