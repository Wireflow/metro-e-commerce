import { Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Enum } from '@/types/supabase/enum';
import { formatDateToString } from '@/utils/dateUtils';

import { OrderDetails } from '../../schemas/orders';

export type StatusType =
  | 'created'
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'refunded';

const getStatusTitle = (status: StatusType, orderType: Enum<'order_type'>) => {
  const statusTitles = {
    created: `Processing ${orderType === 'delivery' ? 'Delivery' : orderType === 'shipment' ? 'Shipment' : 'Pick Up'}`,
    pending: 'Order Sent to Warehouse',
    confirmed: `Accepted Order`,
    preparing: `Preparing for ${orderType === 'delivery' ? 'Delivery' : orderType === 'shipment' ? 'Shipment' : 'Pick Up'}`,
    ready: `Ready to ${orderType === 'delivery' ? 'Deliver' : orderType === 'shipment' ? 'Ship' : 'Pick Up'}`,
    completed: `Completed ${orderType === 'delivery' ? 'Delivery' : orderType === 'shipment' ? 'Shipment' : 'Pick Up'}`,
    cancelled: `Cancelled ${orderType === 'delivery' ? 'Delivery' : orderType === 'shipment' ? 'Shipment' : 'Pick Up'}`,
    refunded: `Refunded ${orderType === 'delivery' ? 'Delivery' : orderType === 'shipment' ? 'Shipment' : 'Pick Up'}`,
  };
  return statusTitles[status];
};

type Props = {
  order: OrderDetails;
};

const OrderStatus = ({ order }: Props) => {
  const currentStatus = (order.status as StatusType) || 'created';

  // Always show base statuses, only add cancelled/refunded if they are the current status
  const getStatusList = (): StatusType[] => {
    const baseStatuses: StatusType[] = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];

    if (currentStatus === 'cancelled') {
      return [...baseStatuses, 'cancelled'];
    }

    if (currentStatus === 'refunded') {
      return [...baseStatuses, 'refunded'];
    }

    return baseStatuses;
  };

  const status = getStatusList();

  const getStatusColor = (itemStatus: StatusType) => {
    if (currentStatus === itemStatus) {
      return 'text-blue-600 font-medium';
    }

    // Special handling for cancelled/refunded status
    if (['cancelled', 'refunded'].includes(currentStatus)) {
      return 'text-gray-400';
    }

    const currentIndex = status.indexOf(currentStatus);
    const itemIndex = status.indexOf(itemStatus);

    if (itemIndex < currentIndex) {
      return 'text-green-600';
    }
    return 'text-gray-400';
  };

  const getTimestamp = (statusItem: StatusType): string | null => {
    switch (statusItem) {
      case 'pending':
        return order.created_at;
      case 'confirmed':
        return order.confirmed_at;
      case 'preparing':
        return order.preparing_at;
      case 'ready':
        return order.ready_at;
      case 'completed':
        return order.completed_at;
      case 'cancelled':
        return order.cancelled_at;
      case 'refunded':
        return order.refunded_at;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="mb-4 flex items-center gap-3 pt-4">
          <p className="text-lg font-semibold">Order Status</p>
        </div>
        {order.status === 'created' ? (
          <div>
            <p className="font-semibold">No status available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {status.map(statusItem => {
              const timestamp = getTimestamp(statusItem);

              return (
                <div
                  key={statusItem}
                  className={`flex items-start gap-3 ${getStatusColor(statusItem)}`}
                >
                  <div className="mt-1 h-4 w-4">
                    <Clock className="h-full w-full" />
                  </div>
                  <div>
                    <p className="capitalize">{getStatusTitle(statusItem, order.type)}</p>
                    {timestamp ? (
                      <p className="text-xs text-gray-500">
                        {formatDateToString(new Date(timestamp))}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">Not yet updated</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderStatus;
