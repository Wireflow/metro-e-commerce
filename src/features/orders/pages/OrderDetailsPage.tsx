'use client';

import OrderAddress from '../components/order details/OrderAddress';
import OrderDetailsTopCards from '../components/order details/OrderDetailsTopCards';
import OrderItemsList from '../components/order details/OrderItemsList';
import OrderStatus from '../components/order details/OrderStatus';
import { useOrderById } from '../hooks/orders-query-hook';

type Props = {
  id: string;
};

const OrderDetailsPage = ({ id }: Props) => {
  const { data: order } = useOrderById(id);

  if (!order) return null;

  return (
    <div className="flex flex-col gap-5">
      <OrderDetailsTopCards order={order} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderItemsList order={order} />
        </div>
        <div className="flex flex-col gap-5 lg:col-span-1">
          <OrderAddress order={order} />
          <OrderStatus order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
