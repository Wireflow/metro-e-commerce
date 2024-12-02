import { Box, Check, CheckCheck, CheckCircle2, RefreshCcw, Warehouse, XCircle } from 'lucide-react';

import ProgressBarSteps, { Step } from '@/components/quick/ProgressBarSteps';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';

import ExpectedDelivery from './ExpectedDelivery';

export type StatusType =
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

const TimelineTracker = ({ order }: Props) => {
  const statusStep: Record<Enum<'order_status'>, number> = {
    created: 1,
    pending: 1,
    confirmed: 2,
    preparing: 3,
    ready: 4,
    completed: 5,
    cancelled: 5,
    refunded: 5,
  };

  const steps: Step[] = [
    {
      icon: Check,
      title: 'Placed',
    },
    {
      icon: Warehouse,
      title: 'Accepted ',
    },
    {
      icon: Box,
      title: 'Preparing',
    },
    {
      icon: CheckCheck,
      title: 'Ready',
    },
    {
      icon:
        order.status === 'cancelled'
          ? XCircle
          : order.status === 'refunded'
            ? RefreshCcw
            : CheckCircle2,
      title:
        order.status === 'cancelled'
          ? 'Cancelled'
          : order.status === 'refunded'
            ? 'Refunded'
            : 'Completed',
    },
  ];

  return (
    <div className="pt-6">
      {order?.expected_delivery_at && (
        <ExpectedDelivery expectedDate={new Date(order?.expected_delivery_at as string)} />
      )}
      <ProgressBarSteps
        steps={steps}
        currentStep={statusStep[order.status ?? 'created']}
        className="pb-16"
      />
    </div>
  );
};

export default TimelineTracker;
