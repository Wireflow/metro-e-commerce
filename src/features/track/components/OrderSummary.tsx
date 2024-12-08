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
    <div className="rounded-sm border-2 border-theme-accent/50 bg-theme-yellow/30 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Top Row */}
        <div className="flex flex-wrap items-start justify-between">
          <p className="text-lg font-semibold text-neutral-800 sm:text-xl">#{orderNumber}</p>
          <p className="text-xl font-semibold text-primary sm:text-2xl md:text-3xl">
            {formatCurrency(total)}
          </p>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col gap-2 text-sm text-neutral-600 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1">
            <span className="font-bold">{quantity}</span>
            <span>Products</span>
          </div>

          <Dot className="hidden text-neutral-600 sm:block" />

          <div className="flex flex-wrap items-center gap-x-1">
            <span>Order placed on</span>
            <span className="font-medium">{formatDate(orderDate, 'MMMM d, yyyy, h:mm a')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
