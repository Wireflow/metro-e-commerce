import { Animate } from '@/components/animation/Animate';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Row } from '@/types/supabase/table';

import OrderActivity from './OrderActivity';
import OrderSummary from './OrderSummary';
import OrderTimeline from './OrderTimeline';

type Props = {
  order: Partial<Row<'orders'>>;
  className?: string;
};

const TrackedOrder = ({ order, className }: Props) => {
  return (
    <Animate type="bounce" className={cn('flex flex-col gap-2', className)}>
      <OrderSummary
        orderDate={new Date(order?.created_at as string)}
        quantity={order?.total_quantity ?? 0}
        total={order?.total_amount ?? 0}
        orderNumber={order?.order_number ?? 0}
      />
      <div className="space-y-6">
        <OrderTimeline order={order} />
        <Separator />
        <OrderActivity order={order} className="px-4" />
      </div>
    </Animate>
  );
};

export default TrackedOrder;
