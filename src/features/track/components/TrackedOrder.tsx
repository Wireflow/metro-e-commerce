import { formatDate } from 'date-fns';
import { Dot } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Row } from '@/types/supabase/table';

import TimelineActivity from './TimeLineActivity';
import TimelineTracker from './TimeLineTracker';

type Props = {
  order: Partial<Row<'orders'>>;
};

const TrackedOrder = ({ order }: Props) => {
  console.log(order?.status);
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="m-5 bg-yellow-50">
        <div className="flex justify-between md:items-center">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-neutral-800">#{order?.order_number}</p>
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-0">
              <p className="text-sm font-bold text-neutral-600">
                {order?.total_quantity}
                <span className="font-medium"> Products</span>
              </p>
              <Dot className="hidden text-neutral-600 md:flex" />
              <p className="flex flex-col text-sm text-neutral-600 md:flex-row md:items-center md:gap-1">
                Order placed on{''}
                <span className="font-medium">
                  {formatDate(new Date(order?.created_at as string), 'MMMM d, yyyy, h:mm a')}
                </span>
              </p>
            </div>
          </div>
          <p className="text-3xl font-semibold text-primary">${order.total_amount}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <TimelineTracker order={order} />
        <TimelineActivity order={order} />
      </CardContent>
    </Card>
  );
};

export default TrackedOrder;
