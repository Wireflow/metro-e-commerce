import { formatDate } from 'date-fns';
import { CheckCircle2, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';
import { formatDateToString } from '@/utils/dateUtils';

export type StatusType =
  | 'created'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'refunded';

const getStatusTitle = (status: StatusType, orderType: Enum<'order_type'>) => {
  const getActionText = () => {
    switch (orderType) {
      case 'delivery':
        return 'Delivery';
      case 'pickup':
        return 'Pick Up';
      case 'shipment':
        return 'Shipment';
      default:
        return 'Order';
    }
  };

  const actionText = getActionText();

  const statusTitles = {
    created: `Processing ${actionText}`,
    confirmed: `${actionText} Confirmed`, // Changed to include action text
    preparing: `Preparing ${actionText}`,
    ready: `Ready for ${actionText}`,
    completed: `${actionText} Completed`,
    cancelled: `${actionText} Cancelled`,
    refunded: `${actionText} Refunded`,
  };

  return statusTitles[status];
};

type Props = {
  order: Partial<Row<'orders'>>;
};

const TimelineTracker = ({ order }: Props) => {
  const currentStatus = (order.status as StatusType) || 'created';

  const getStatusList = (): StatusType[] => {
    const baseStatuses: StatusType[] = ['created', 'confirmed', 'preparing', 'ready', 'completed'];

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
    const timestamp = getTimestamp(itemStatus);

    if (timestamp) {
      return 'text-green-600 border-green-600 bg-green-50';
    }

    if (currentStatus === itemStatus && !['cancelled', 'refunded'].includes(currentStatus)) {
      return 'text-blue-600 border-blue-600 bg-blue-50';
    }

    return 'text-gray-400 border-gray-300 bg-gray-50';
  };

  const getLineColor = (itemStatus: StatusType) => {
    const timestamp = getTimestamp(itemStatus);
    return timestamp ? 'border-green-600' : 'border-gray-300';
  };

  const getTimestamp = (statusItem: StatusType): string | null => {
    switch (statusItem) {
      case 'created':
        return order.created_at as string;
      case 'confirmed':
        return order.confirmed_at as string;
      case 'preparing':
        return order.preparing_at as string;
      case 'ready':
        return order.ready_at as string;
      case 'completed':
        return order.completed_at as string;
      case 'cancelled':
        return order.cancelled_at as string;
      case 'refunded':
        return order.refunded_at as string;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <p className="text-sm text-neutral-600">
            Order expected arrival{' '}
            <span className="font-semibold">
              {formatDate(new Date(order?.created_at as string), 'MMMM d, yyyy')}
            </span>
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - Vertical on mobile, Horizontal on desktop */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 md:left-0 md:right-0 md:top-4 md:h-0.5 md:w-full" />

          {/* Status points - Stack vertically on mobile, horizontally on desktop */}
          <div className="relative flex flex-col space-y-8 md:flex-row md:space-x-4 md:space-y-0">
            {status.map((statusItem, index) => {
              const timestamp = getTimestamp(statusItem);
              const isLast = index === status.length - 1;

              return (
                <div key={statusItem} className="flex md:flex-1">
                  {/* Mobile layout - Left aligned with connecting line */}
                  <div className="flex flex-row items-center md:flex-col md:items-center">
                    {/* Status point */}
                    <div
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${getStatusColor(
                        statusItem
                      )}`}
                    >
                      {timestamp ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>

                    {/* Status label - Right of circle on mobile, below circle on desktop */}
                    <div className="ml-4 md:ml-0 md:mt-2 md:text-center">
                      <p className="text-xs font-medium">
                        {getStatusTitle(statusItem, order.type as Enum<'order_type'>)}
                      </p>
                      {timestamp ? (
                        <p className="mt-1 text-xs text-gray-500">
                          {formatDateToString(new Date(timestamp))}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-400">Pending</p>
                      )}
                    </div>
                  </div>

                  {/* Connecting line - Only show on desktop and if not last item */}
                  {!isLast && (
                    <div
                      className={`absolute left-0 right-0 top-4 hidden h-0.5 w-full md:block ${getLineColor(
                        statusItem
                      )}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTracker;
