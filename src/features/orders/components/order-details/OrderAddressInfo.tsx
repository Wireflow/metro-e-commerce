import AddressCard from '@/features/checkout/components/addresses/AddressCard';

import { OrderDetails } from '../../schemas/orders';

type Props = {
  order: OrderDetails;
};

const OrderAddressInfo = ({ order }: Props) => {
  const billingAddress = order?.payment?.payment_method?.billingAddress;
  const deliveryAddress = order?.deliveryAddress;

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <AddressCard
          address={billingAddress!}
          className="flex-1 border-x-0 border-b-0"
          options={{ showOptions: false }}
          placeholderTitle="Billing Address"
        />

        <AddressCard
          address={deliveryAddress!}
          options={{ showOptions: false }}
          className="flex-1 border-b-0 border-r-0 md:border-l"
          placeholderTitle="Delivery Address"
        />

        <div className="col-span-1 flex flex-1 flex-col gap-5 border border-border p-5 lg:col-span-2">
          <h1 className="text-xl font-semibold">Order Instructions</h1>
          <p className="text-sm text-neutral-500">
            {order?.instructions ? order?.instructions : 'No instructions available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderAddressInfo;
