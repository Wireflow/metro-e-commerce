import { OrderDetails } from '../../schemas/orders';
import CustomerInfo from './CustomerInfo';
import OrderInfo from './OrderInfo';
import PaymentInfo from './PaymentInfo';

type Props = {
  order: OrderDetails;
};

const OrderDetailsTopCards = ({ order }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <OrderInfo order={order} />
      <CustomerInfo order={order} />
      <PaymentInfo order={order} />
    </div>
  );
};

export default OrderDetailsTopCards;
