'use client';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import AnimtedLoadingSpinner from '@/components/animation/AnimtedLoader';
import TrackedOrderDetailsPage from '@/components/pages/TrackedOrderDetailsPage';
import { Card } from '@/components/ui/card';
import OrderAddressInfo from '@/features/orders/components/order details/OrderAddressInfo';
import OrderItemsTable from '@/features/orders/components/order details/OrderItemsTable';
import { useOrderById } from '@/features/orders/hooks/orders-query-hook';

type Props = {
  id: string;
};

const CustomerOrderDetailsPage = ({ id }: Props) => {
  const { data: order, isLoading } = useOrderById(id as string);

  const ProductsCount = order?.orderItems.map(item => item.quantity).reduce((a, b) => a + b, 0);
  if (isLoading) return <AnimtedLoadingSpinner className="mt-10" />;
  if (!order) return <div>Order not found</div>;

  return (
    <Card className="">
      <Link
        href={`/customer/history`}
        className="flex items-center gap-2 p-5 text-sm hover:text-primary"
      >
        <ArrowLeft /> BACK TO ORDERS
      </Link>
      <div className="flex flex-col gap-5">
        <div className="px-5">
          <TrackedOrderDetailsPage breadcrumbs={false} id={order?.order_number} />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <h1 className="flex items-end gap-2 text-xl font-semibold">
            Products{' '}
            <span className="text-sm font-normal text-neutral-500">{`(${ProductsCount}) items`}</span>
          </h1>
          <OrderItemsTable variant="minimal" orderItems={order?.orderItems ?? []} />
        </div>
        <OrderAddressInfo order={order} />
      </div>
    </Card>
  );
};

export default CustomerOrderDetailsPage;
