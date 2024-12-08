'use client';

import OrderAddress from '../../components/order-details/OrderAddress';
import OrderDetailsTopCards from '../../components/order-details/OrderDetailsTopCards';
import OrderItemsList from '../../components/order-details/OrderItemsList';
import OrderStatus from '../../components/order-details/OrderStatus';
import PaymentInfo from '../../components/order-details/PaymentInfo';
import ShippingInfo from '../../components/order-details/ShippingInfo';
import { useOrderById } from '../../hooks/orders-query-hook';

type Props = {
  id: string;
};

const OrderDetailsPage = ({ id }: Props) => {
  const { data: order } = useOrderById(id);

  if (!order) return null;

  return (
    <div className="flex flex-col gap-5">
      {' '}
      {order.type === 'shipment' && <ShippingInfo shipping={order.shipping} />}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <OrderDetailsTopCards order={order} />
          <OrderItemsList order={order} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="hidden xl:block">
            <PaymentInfo order={order} />
          </div>
          <div className="hidden w-full flex-col gap-5 lg:col-span-1 xl:flex">
            <OrderAddress order={order} />
            <OrderStatus order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
