'use client';
import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import BackButton from '@/components/BackButton';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import OrderAddressInfo from '@/features/orders/components/order-details/OrderAddressInfo';
import { useOrderById } from '@/features/orders/hooks/orders-query-hook';
import TrackedOrder from '@/features/track/components/TrackedOrder';

import OrderBreakdown from '../../components/OrderBreakdown';
import OrderPayment from '../../components/OrderPayment';
import OrderProducts from '../../components/OrderProducts';
import OrderShipping from '../../components/OrderShipping';

type Props = {
  id: string;
};

const OrderDetailsPage = ({ id }: Props) => {
  const { data: order, isLoading } = useOrderById(id as string);
  const router = useRouter();

  if (isLoading) return <Skeleton className="h-[900px] w-full" />;

  if (!order) {
    router.push('/not-found');
    return;
  }

  return (
    <Card className="shadow-none">
      <BackButton href="/customer/history" className="m-2">
        <ArrowLeft />
        Back to Orders
      </BackButton>

      <div className="space-y-5">
        <TrackedOrder order={order} className="px-4" />
        {order.type === 'shipment' && (
          <>
            <div className="px-4">
              <Separator />
            </div>
            <OrderShipping shipping={order?.shipping} />
            <div className="px-4">
              <Separator />
            </div>
          </>
        )}

        <OrderProducts orderItems={order?.orderItems ?? []} />
      </div>
      <OrderAddressInfo order={order} />
      <OrderPayment payment={order?.payment} />
      <OrderBreakdown order={order} />
    </Card>
  );
};

export default OrderDetailsPage;
