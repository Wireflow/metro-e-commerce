import { OrderDetails } from '../../schemas/orders';
import CustomerInfo from './CustomerInfo';
import OrderInfo from './OrderInfo';
import PaymentInfo from './PaymentInfo';

type Props = {
  order: OrderDetails;
};

const OrderDetailsTopCards = ({ order }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 2xl:grid-cols-2">
      <OrderInfo order={order} />
      <CustomerInfo order={order} />
      <div className="block xl:hidden">
        <PaymentInfo order={order} />
      </div>
    </div>
  );
};

export default OrderDetailsTopCards;
