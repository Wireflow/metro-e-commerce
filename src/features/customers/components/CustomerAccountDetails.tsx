'use client';
import { ArchiveX, Box, Rocket } from 'lucide-react';

import { useUser } from '@/hooks/useUser';

import { useCustomerOrdersByStatusClient } from '../server/getCustomerOrderByStatus';
import CustomerAccountInfo from './CustomerAccountInfo';
import CustomerBillingAddress from './CustomerBillingAddress';
import CustomerOrdersDataCard from './CustomerOrdersDataCard';

const CustomerAccountDetails = () => {
  const { metadata } = useUser();
  const { data: orders } = useCustomerOrdersByStatusClient({
    customerId: metadata?.id,
  });
  const { data: completedOrders } = useCustomerOrdersByStatusClient({
    customerId: metadata?.id,
    status: 'completed',
  });
  const { data: pendingOrders } = useCustomerOrdersByStatusClient({
    customerId: metadata?.id,
    status: 'cancelled',
  });

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <CustomerAccountInfo />
      <CustomerBillingAddress />
      <div className="col-span-1 flex flex-col gap-5 lg:col-span-2 xl:col-span-1">
        <CustomerOrdersDataCard
          className="bg-blue-100"
          title="Total Orders"
          icon={<Rocket className="h-7 w-7 text-theme-sky-blue" />}
          count={orders?.length ?? 0}
        />
        <CustomerOrdersDataCard
          className="bg-orange-100"
          title="Cancelled Orders"
          icon={<ArchiveX className="h-7 w-7 text-primary" />}
          count={pendingOrders?.length ?? 0}
        />
        <CustomerOrdersDataCard
          className="bg-green-100"
          title="Completed Orders"
          icon={<Box className="h-7 w-7 text-green-500" />}
          count={completedOrders?.length ?? 0}
        />
      </div>
    </div>
  );
};

export default CustomerAccountDetails;
