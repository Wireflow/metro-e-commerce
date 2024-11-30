import { AddressParams, formatAddress } from '@/utils/utils';

import { OrderDetails } from '../../schemas/orders';
import OrderAddresses from './OrderAddresses';

type Props = {
  order: OrderDetails;
};

const OrderAddressInfo = ({ order }: Props) => {
  const fullName = `${order?.customer.first_name} ${order?.customer.last_name}`;
  const billingAddress = order?.payment?.payment_method?.billingAddress;
  const shippingAddress = order?.deliveryAddress;
  return (
    <div className="border-t">
      <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2 xl:grid-cols-3">
        <OrderAddresses
          title="Delivery Address"
          name={fullName}
          address={
            shippingAddress
              ? formatAddress(shippingAddress as AddressParams)
              : 'No delivery address available'
          }
          phone={order?.customer.phone ?? 'N/A'}
          email={order?.customer.email ?? 'N/A'}
        />
        <OrderAddresses
          title="Billing Address"
          name={fullName}
          address={
            billingAddress
              ? formatAddress(billingAddress as AddressParams)
              : 'No billing address available'
          }
          phone={order?.customer.phone ?? 'N/A'}
          email={order?.customer.email ?? 'N/A'}
        />
        <div className="col-span-1 flex flex-col gap-5 lg:col-span-2 lg:px-5 xl:col-span-1 xl:p-5">
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
