import Animate from '@/components/animation/Animate';
import { Separator } from '@/components/ui/separator';
import { Row } from '@/types/supabase/table';

import OrderActivity from './OrderActivity';
import OrderSummary from './OrderSummary';
import TimelineTracker from './TimeLineTracker';

type Props = {
  order: Partial<Row<'orders'>>;
};

const TrackedOrder = ({ order }: Props) => {
  return (
    <Animate type="bounce" className="flex flex-col gap-2">
      <OrderSummary
        orderDate={new Date(order?.created_at as string)}
        quantity={order?.total_quantity ?? 0}
        total={order?.total_amount ?? 0}
        orderNumber={order?.order_number ?? 0}
      />
      <div className="space-y-6">
        <TimelineTracker order={order} />
        <Separator />
        <OrderActivity order={order} className="px-4" />
      </div>
    </Animate>
  );
};

export default TrackedOrder;
