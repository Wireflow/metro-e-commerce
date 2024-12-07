import { MobileIcon } from '@radix-ui/react-icons';
import { Mail, User } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { formatPhoneNumber } from '@/utils/utils';

import { OrderDetails } from '../../schemas/orders';

type Props = {
  order: OrderDetails;
};

const CustomerInfo = ({ order }: Props) => {
  const formatCustomerName = (order: OrderDetails) => {
    const firstName = order.customer?.first_name;
    const lastName = order.customer?.last_name;
    if (firstName || lastName) {
      return `${firstName || ''} ${lastName || ''}`.trim();
    }
    return 'N/A';
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3 pt-4">
          <p className="mt-2 h-fit text-lg font-semibold">Customer</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <User className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[14px] font-bold">Customer</p>
            </div>
            <p className="text-[14px] capitalize text-gray-500">{formatCustomerName(order)}</p>
          </div>
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <Mail className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[14px] font-bold">Email</p>
            </div>

            <p className="text-[14px] text-gray-500">{order?.customer.email}</p>
          </div>
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <MobileIcon className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[14px] font-bold">Phone</p>
            </div>

            <p className="text-[14px] text-gray-500">{formatPhoneNumber(order?.customer.phone)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfo;
