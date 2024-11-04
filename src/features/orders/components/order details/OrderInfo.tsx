import { CalendarCheck, CreditCardIcon, Truck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Enum } from '@/types/supabase/enum';
import { formatDateToString } from '@/utils/dateUtils';

import { OrderDetails } from '../../schemas/orders';

type Props = {
  order: OrderDetails;
};

const OrderInfo = ({ order }: Props) => {
  const getBadgeVariantOrderStatus = (status: Enum<'order_status'>) => {
    switch (status) {
      case 'created':
        return 'secondary';
      case 'ready':
        return 'indigo';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      case 'completed':
        return 'success';
      case 'refunded':
        return 'secondary';
      case 'confirmed':
        return 'success';
      case 'preparing':
        return 'info';
      default:
        return 'secondary';
    }
  };
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3 pt-4">
          <p className="h-fit text-lg font-semibold">Order #{order?.order_number}</p>
          <Badge variant={getBadgeVariantOrderStatus(order?.status)} className="py-1 capitalize">
            <span className="text-[14px] capitalize">
              {order?.status === 'created' ? 'initialized' : order?.status}
            </span>
          </Badge>
        </div>
        <div className="flex flex-col gap-3">
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <CalendarCheck className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[12px] font-bold">Added</p>
            </div>
            <p className="text-[12px] text-gray-500">
              {formatDateToString(new Date(order?.created_at))}
            </p>
          </div>
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <CreditCardIcon className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[12px] font-bold">Payment Method</p>
            </div>

            <p className="text-[12px] text-gray-500">{order?.payment?.payment_type}</p>
          </div>
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <Truck className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[12px] font-bold">Order Type</p>
            </div>

            <p className="text-[12px] text-gray-500">
              {order?.type === 'delivery' ? 'Delivery' : 'Pick Up'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInfo;
