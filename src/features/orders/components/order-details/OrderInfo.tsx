import { Banknote, CalendarCheck, Check, CreditCardIcon, Landmark, Truck, X } from 'lucide-react';

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
        return 'destructive';
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

  const handlePaymenttype = (order: OrderDetails) => {
    const paymentDetails = {
      online: {
        icon: CreditCardIcon,
        text: `Card Ending in ************${order?.payment?.payment_method?.last_four}`,
      },
      card: { icon: CreditCardIcon, text: 'Card At Warehouse' },
      cash: {
        icon: Banknote,
        text: order.type === 'pickup' ? 'Cash on Pick Up' : 'Cash on Delivery',
      },
      check: {
        icon: Landmark,
        text:
          order.type === 'pickup'
            ? 'Check on Pick Up'
            : order.type === 'delivery'
              ? 'Check on Delivery'
              : 'Check',
      },
      later: {
        icon: Check,
        text: `Pay On ${order.type === 'pickup' ? 'Pickup' : order.type === 'delivery' ? 'Delivery' : 'Shipment'}`,
      },
    }[order.payment?.payment_type as string];

    return paymentDetails ? (
      <div className="flex w-full items-center gap-3 pt-4">
        <div className="rounded-full bg-gray-200 p-2">
          <paymentDetails.icon className="h-5 w-5" color="gray" />
        </div>

        <div className="flex w-full flex-col justify-between sm:flex-row">
          <p className="text-[14px] font-bold">Payment Type</p>
          <p className="w-fit text-wrap text-[14px] text-gray-500">{paymentDetails.text}</p>
        </div>
      </div>
    ) : (
      order.status === 'created' && (
        <div className="flex w-full items-center gap-3 pt-4">
          <div className="rounded-full bg-gray-200 p-2">
            <X className="h-5 w-5" color="gray" />
          </div>

          <div className="flex w-full flex-col justify-between sm:flex-row">
            <p className="text-[14px] font-bold">Payment Type</p>
            <p className="w-fit text-wrap text-[14px] text-gray-500">Payment Failed</p>
          </div>
        </div>
      )
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3 pt-4">
          <p className="h-fit text-lg font-semibold">Order #{order?.order_number}</p>
          <Badge variant={getBadgeVariantOrderStatus(order?.status)} className="py-1 capitalize">
            <span className="text-[14px] capitalize">
              {order?.status === 'created' ? 'Failed' : order?.status}
            </span>
          </Badge>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center gap-3 pt-4">
            <div className="rounded-full bg-gray-200 p-2">
              <CalendarCheck className="h-5 w-5" color="gray" />
            </div>

            <div className="flex w-full flex-col justify-between sm:flex-row">
              <p className="text-[14px] font-bold">Placed On</p>
              <p className="text-[14px] text-gray-500">
                {formatDateToString(new Date(order?.created_at))}
              </p>
            </div>
          </div>
          {handlePaymenttype(order)}
          <div className="flex items-center gap-3 pt-4">
            <div className="rounded-full bg-gray-200 p-2">
              <Truck className="h-5 w-5" color="gray" />
            </div>

            <div className="flex w-full flex-col justify-between sm:flex-row">
              <p className="text-[14px] font-bold">Order Type</p>
              <p className="text-[14px] text-gray-500">
                {order?.type === 'delivery'
                  ? 'Delivery'
                  : order?.type === 'pickup'
                    ? 'Pick Up'
                    : order.type === 'shipment'
                      ? 'Shipment'
                      : ''}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInfo;
