import { MapIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { formatAddress } from '@/utils/utils';

import { OrderDetails } from '../../schemas/orders';

type Props = {
  order: OrderDetails;
};

const OrderAddress = ({ order }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <Card className="shadow-none">
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center gap-3 pt-4">
            <p className="text-lg font-semibold">Address</p>
          </div>
          <div className="flex items-start gap-2 pt-2">
            <div className="rounded-full bg-gray-200 p-2">
              <MapIcon className="h-5 w-5" color="gray" />
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-[12px] font-bold">Delivery</p>
              <p className="max-w-80 text-sm text-gray-500 md:text-[16px]">
                {order.deliveryAddress
                  ? formatAddress(order.deliveryAddress)
                  : 'No Address Available'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-4">
            <div className="rounded-full bg-gray-200 p-2">
              <MapIcon className="h-5 w-5" color="gray" />
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-[12px] font-bold">Billing</p>
              <p className="max-w-80 text-sm text-gray-500 md:text-[16px]">
                {order.payment?.payment_method?.billingAddress
                  ? formatAddress(order.payment?.payment_method?.billingAddress)
                  : 'No Address Available'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderAddress;
