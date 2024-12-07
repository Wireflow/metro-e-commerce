'use client';

import OrderAddress from '../components/order details/OrderAddress';
import OrderDetailsTopCards from '../components/order details/OrderDetailsTopCards';
import OrderItemsList from '../components/order details/OrderItemsList';
import OrderStatus from '../components/order details/OrderStatus';
import PaymentInfo from '../components/order details/PaymentInfo';
import { useOrderById } from '../hooks/orders-query-hook';

type Props = {
  id: string;
};

const OrderDetailsPage = ({ id }: Props) => {
  const { data: order } = useOrderById(id);

  if (!order) return null;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <div className="flex flex-col gap-5 lg:col-span-2">
        <OrderDetailsTopCards order={order} />{' '}
        <div>
          <OrderItemsList order={order} />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="hidden xl:block">
          <PaymentInfo order={order} />
        </div>
        <div className="flex flex-col gap-5">
          <OrderAddress order={order} />
          <OrderStatus order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
