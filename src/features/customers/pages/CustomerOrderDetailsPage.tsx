'use client';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import TrackedOrderDetailsPage from '@/components/pages/TrackedOrderDetailsPage';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CustomerOrderItemsList from '@/features/orders/components/CustomerOrderItemsList';
import OrderAddressInfo from '@/features/orders/components/order details/OrderAddressInfo';
import { useOrderById } from '@/features/orders/hooks/orders-query-hook';

type Props = {
  id: string;
};

const CustomerOrderDetailsPage = ({ id }: Props) => {
  const { data: order, isLoading } = useOrderById(id as string);

  const ProductsCount = order?.orderItems.map(item => item.quantity).reduce((a, b) => a + b, 0);

  if (isLoading) return <Skeleton className="h-[900px] w-full" />;

  if (!order) return <div>Order not found</div>;

  return (
    <Card className="shadow-none">
      <Link
        href={`/customer/history`}
        className="flex items-center gap-2 p-5 text-sm hover:text-primary"
      >
        <ArrowLeft /> BACK TO ORDERS
      </Link>
      <div className="space-y-5">
        <div className="px-4">
          <TrackedOrderDetailsPage breadcrumbs={false} id={order?.order_number} />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <h1 className="flex items-end gap-2 text-xl font-semibold">
            Products{' '}
            <span className="text-sm font-normal text-neutral-500">{`(${ProductsCount}) items`}</span>
          </h1>
          <CustomerOrderItemsList
            variant="minimal"
            orderItems={order?.orderItems ?? []}
            limit={5}
          />
        </div>
      </div>
      <OrderAddressInfo order={order} />
    </Card>
  );
};

export default CustomerOrderDetailsPage;
