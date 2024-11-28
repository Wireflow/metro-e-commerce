'use client';
import OrderItemsTable from '@/features/orders/components/order details/OrderItemsTable';
import { useOrderById } from '@/features/orders/hooks/orders-query-hook';

type Props = {
  id: string;
};

const CustomerOrderDetailsPage = ({ id }: Props) => {
  const { data: order } = useOrderById(id as string);

  return (
    <div>
      <OrderItemsTable variant="minimal" orderItems={order?.orderItems ?? []} />
    </div>
  );
};

export default CustomerOrderDetailsPage;
