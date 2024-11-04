import { Banknote, CalendarClock, CheckCircle } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { formatDateToString } from '@/utils/dateUtils';
import { formatCurrency } from '@/utils/utils';

import { OrderDetails } from '../../schemas/orders';

type Props = {
  order: OrderDetails;
};

const PaymentInfo = ({ order }: Props) => {
  return (
    <Card className="w-full lg:col-span-2 xl:col-span-1">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3 pt-4">
          <p className="mt-2 h-fit text-lg font-semibold">Payment</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <CheckCircle className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[12px] font-bold">Status</p>
            </div>
            <p className="text-[12px] capitalize text-gray-500">{order?.payment?.payment_status}</p>
          </div>
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <CalendarClock className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[12px] font-bold">Paid On</p>
            </div>

            <p className="text-[12px] capitalize text-gray-500">
              {order?.payment?.payment_date &&
                formatDateToString(new Date(order?.payment?.payment_date))}
            </p>
          </div>
          <div className='pt-4" flex items-center justify-between gap-3'>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 p-2">
                <Banknote className="h-5 w-5" color="gray" />
              </div>
              <p className="text-[12px] font-bold">Amount</p>
            </div>

            <p className="text-[12px] text-gray-500">
              {formatCurrency(order?.payment?.payment_amount)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfo;
