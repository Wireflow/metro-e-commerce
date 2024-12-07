import { Banknote, CalendarClock, CheckCircle, Landmark } from 'lucide-react';

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
          <p className="h-fit text-lg font-semibold">Payment</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 pt-4">
            <div className="rounded-full bg-gray-200 p-2">
              <CheckCircle className="h-5 w-5" color="gray" />
            </div>

            <div className="flex w-full flex-col justify-between sm:flex-row">
              <p className="text-[14px] font-bold">Status</p>
              <p className="text-[14px] capitalize text-gray-500">
                {order?.payment?.payment_status ? order?.payment?.payment_status : 'Payment Failed'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <div className="rounded-full bg-gray-200 p-2">
              <CalendarClock className="h-5 w-5" color="gray" />
            </div>

            <div className="flex w-full flex-col justify-between sm:flex-row">
              <p className="text-[14px] font-bold">Paid On</p>
              <p className="text-[14px] capitalize text-gray-500">
                {order?.payment?.payment_date
                  ? formatDateToString(new Date(order?.payment?.payment_date))
                  : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <div className="rounded-full bg-gray-200 p-2">
              <Banknote className="h-5 w-5" color="gray" />
            </div>

            <div className="flex w-full flex-col justify-between sm:flex-row">
              <p className="text-[14px] font-bold">Amount</p>
              <p className="text-[14px] text-gray-500">
                {formatCurrency(order?.payment?.payment_amount)}
              </p>
            </div>
          </div>
          {order?.payment?.payment_type === 'check' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 pt-4">
                <div className="rounded-full bg-gray-200 p-2">
                  <Landmark className="h-5 w-5" color="gray" />
                </div>

                <div className="flex w-full flex-col justify-between md:flex-row">
                  <p className="text-[14px] font-bold">Check Number</p>
                  <p className="text-[14px] capitalize text-gray-500">
                    {order?.payment?.check_number}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <div className="rounded-full bg-gray-200 p-2">
                  <Landmark className="h-5 w-5" color="gray" />
                </div>

                <div className="flex w-full flex-col justify-between md:flex-row">
                  <p className="text-[14px] font-bold">Check Amount</p>
                  <p className="text-[14px] capitalize text-gray-500">
                    {formatCurrency(order?.payment?.check_amount as number)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfo;
