'use client';
import OrderDetailsTopCards from '../components/order details/OrderDetailsTopCards';
import OrderItemsList from '../components/order details/OrderItemsList';
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
      <OrderItemsList order={order} />
    </div>
  );
};

export default OrderDetailsPage;
