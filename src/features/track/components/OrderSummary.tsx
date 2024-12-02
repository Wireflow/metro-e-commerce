import { formatDate } from 'date-fns';
import { Dot } from 'lucide-react';

import { formatCurrency } from '@/utils/utils';

type Props = {
  orderDate: Date;
  quantity: number;
  total: number;
  orderNumber: number | string;
};

const OrderSummary = ({ orderDate, quantity, total, orderNumber }: Props) => {
  return (
    <div className="rounded-sm border-2 border-theme-accent/50 bg-theme-yellow/30 p-6">
      <div className="flex justify-between md:items-center">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold text-neutral-800">#{orderNumber}</p>
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-0">
            <p className="text-sm font-bold text-neutral-600">
              {quantity}
              <span className="font-medium"> Products</span>
            </p>
            <Dot className="hidden text-neutral-600 md:flex" />
            <p className="flex flex-col text-sm text-neutral-600 md:flex-row md:items-center md:gap-1">
              Order placed on{''}
              <span className="font-medium">{formatDate(orderDate, 'MMMM d, yyyy, h:mm a')}</span>
            </p>
          </div>
        </div>
        <p className="text-3xl font-semibold text-primary">{formatCurrency(total)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
