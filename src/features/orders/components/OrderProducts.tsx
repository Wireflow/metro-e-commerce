import { OrderItemsDetails } from '../schemas/orders';
import CustomerOrderItemsList from './CustomerOrderItemsList';

type Props = {
  orderItems: OrderItemsDetails[];
};

const OrderProducts = ({ orderItems }: Props) => {
  const ProductsCount = orderItems.map(item => item.quantity).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-3 p-5">
      <h1 className="flex items-end gap-2 text-xl font-semibold">
        Products{' '}
        <span className="text-sm font-normal text-neutral-500">{`(${ProductsCount}) items`}</span>
      </h1>
      <CustomerOrderItemsList variant="minimal" orderItems={orderItems ?? []} limit={5} />
    </div>
  );
};

export default OrderProducts;
