import { formatDate } from 'date-fns';
import {
  Box,
  CheckCircle,
  CheckCircle2,
  LucideIcon,
  MapPin,
  RefreshCcw,
  XCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Row } from '@/types/supabase/table';

type OrderType = 'shipment' | 'delivery' | 'pickup';

type StatusType =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'refunded';

type Activity = {
  status: StatusType;
  timestamp: string | null;
  title: string;
  icon?: LucideIcon;
};

type Props = {
  order: Partial<Row<'orders'>> & {
    type?: OrderType;
  };
  className?: string;
};

const STATUS_ICONS: Record<StatusType, LucideIcon> = {
  pending: CheckCircle2,
  confirmed: CheckCircle2,
  preparing: Box,
  ready: MapPin,
  completed: CheckCircle,
  cancelled: XCircle,
  refunded: RefreshCcw,
};

const getActivityTitle = (status: StatusType, type?: OrderType): string => {
  const titles: Record<StatusType, string | ((type: OrderType) => string)> = {
    completed: orderType =>
      `Your order has been ${
        orderType === 'shipment' ? 'shipped' : orderType === 'delivery' ? 'delivered' : 'picked up'
      }.`,
    ready: orderType =>
      `Your order is ready ${
        orderType === 'shipment'
          ? 'for shipping and will soon be shipped'
          : orderType === 'delivery'
            ? 'for delivery and will soon be delivered'
            : 'for pickup'
      }.`,
    preparing: 'Your order is being prepared.',
    confirmed: 'Your order has been accepted by the warehouse.',
    pending: 'Your order has been placed and going to be processed.',
    cancelled: 'Your order has been cancelled.',
    refunded: 'Your order has been refunded.',
  };

  const title = titles[status];
  return typeof title === 'function' && type ? title(type) : (title as string);
};

const OrderActivity = ({ order, className }: Props) => {
  const getBackgroundColor = (status: StatusType): string => {
    return ['completed', 'confirmed'].includes(status) ? 'bg-green-500/10' : 'bg-primary/10';
  };

  const getActivities = (): Activity[] => {
    const statusTimestamps: Array<[StatusType, keyof typeof order]> = [
      ['completed', 'completed_at'],
      ['ready', 'ready_at'],
      ['preparing', 'preparing_at'],
      ['confirmed', 'confirmed_at'],
      ['pending', 'created_at'],
    ];

    return statusTimestamps
      .map(([status, timestampKey]) => ({
        status,
        timestamp: order[timestampKey] as string | null,
        title: getActivityTitle(status, order.type),
      }))
      .filter((activity): activity is Activity => !!activity.timestamp)
      .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime());
  };

  const activities = getActivities();

  if (activities.length === 0) return null;

  return (
    <Card className={cn('w-full space-y-6 border-none p-0 shadow-none', className)}>
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-medium">Order Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = STATUS_ICONS[activity.status];
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className={`p-2 ${getBackgroundColor(activity.status)}`}>
                  <Icon className="h-6 w-6 text-primary/60" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(new Date(activity.timestamp!), "dd MMM, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderActivity;
