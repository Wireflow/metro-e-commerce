import { formatDate } from 'date-fns';
import {
  CheckCircle,
  CheckCircle2,
  Package,
  RefreshCcw,
  ShoppingCart,
  Truck,
  XCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';

type StatusType =
  | 'created'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'refunded';

type Props = {
  order: Partial<Row<'orders'>>;
};

const TimelineActivity = ({ order }: Props) => {
  const getActivityDescription = (status: StatusType, orderType: Enum<'order_type'>) => {
    const actionText =
      orderType === 'delivery'
        ? 'delivery'
        : orderType === 'pickup'
          ? 'pickup'
          : orderType === 'shipment'
            ? 'shipment'
            : 'order';

    const descriptions = {
      created: `New ${actionText} order has been created and is being processed`,
      confirmed: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} order has been confirmed`,
      preparing: `Your order is being prepared for ${actionText}`,
      ready: `Order is ready for ${actionText}`,
      completed: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} has been completed successfully`,
      cancelled: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} order has been cancelled`,
      refunded: `Refund has been processed for this ${actionText} order`,
    };

    return descriptions[status];
  };

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'cancelled':
        return 'text-red-500';
      case 'refunded':
        return 'text-orange-500';
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-blue-500';
    }
  };

  const getStatusIcon = (status: StatusType) => {
    const icons = {
      created: ShoppingCart,
      confirmed: CheckCircle2,
      preparing: Package,
      ready: Truck,
      completed: CheckCircle,
      cancelled: XCircle,
      refunded: RefreshCcw,
    };

    const IconComponent = icons[status];
    return IconComponent;
  };

  const getActivities = () => {
    const allActivities = [
      {
        status: 'created' as StatusType,
        timestamp: order.created_at,
        title: 'Order Created',
      },
      {
        status: 'confirmed' as StatusType,
        timestamp: order.confirmed_at,
        title: 'Order Confirmed',
      },
      {
        status: 'preparing' as StatusType,
        timestamp: order.preparing_at,
        title: 'Preparing Order',
      },
      {
        status: 'ready' as StatusType,
        timestamp: order.ready_at,
        title: 'Order Ready',
      },
      {
        status: 'completed' as StatusType,
        timestamp: order.completed_at,
        title: 'Order Completed',
      },
      {
        status: 'cancelled' as StatusType,
        timestamp: order.cancelled_at,
        title: 'Order Cancelled',
      },
      {
        status: 'refunded' as StatusType,
        timestamp: order.refunded_at,
        title: 'Order Refunded',
      },
    ];

    return allActivities
      .filter(activity => activity.timestamp)
      .sort((a, b) => {
        const dateA = new Date(a.timestamp!).getTime();
        const dateB = new Date(b.timestamp!).getTime();
        return dateB - dateA;
      });
  };

  const activities = getActivities();

  if (activities.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200">
          {activities.map((activity, index) => {
            const Icon = getStatusIcon(activity.status);
            return (
              <div
                key={index}
                className="flex flex-col items-start py-4 first:pt-0 last:pb-0 sm:flex-row"
              >
                <div
                  className={`mb-2 flex items-center sm:mb-0 ${getStatusColor(activity.status)}`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
                  <span className="ml-2 text-sm font-medium text-gray-900 sm:hidden">
                    {activity.title}
                  </span>
                </div>

                <div className="min-w-0 flex-1 sm:ml-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="hidden text-sm font-medium text-gray-900 sm:block">
                        {activity.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(new Date(activity.timestamp!), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 sm:mt-0">
                      {getActivityDescription(activity.status, order.type as Enum<'order_type'>)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineActivity;
