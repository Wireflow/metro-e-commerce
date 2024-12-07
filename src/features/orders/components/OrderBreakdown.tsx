import SummaryRow from '@/components/SummaryRow';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utils/utils';

import { OrderDetails } from '../schemas/orders';

type Props = {
  order: OrderDetails;
};

const OrderBreakdown = ({ order }: Props) => {
  if (!order) return null;

  return (
    <div className="space-y-2 border-t border-gray-200 p-4">
      <SummaryRow label="Subtotal" value={formatCurrency(order.subtotal ?? 0)} />
      <SummaryRow label="Delivery Fee" value={formatCurrency(order.delivery_fee ?? 0)} />
      <SummaryRow label="Shipment Fee" value={formatCurrency(order.shipping_costs ?? 0)} />
      <SummaryRow label="Tax" value={formatCurrency(order.tax ?? 0)} />
      <SummaryRow label="Discount ($)" value={formatCurrency(order.total_discount ?? 0)} />
      <Separator />
      <SummaryRow
        label="Quantity"
        value={`${order.total_quantity ?? 0}`}
        labelClassName="font-semibold text-black"
        valueClassName="font-semibold text-black"
      />
      <SummaryRow
        label="Total Paid"
        value={formatCurrency(order.total_amount ?? 0)}
        labelClassName="font-semibold text-black"
        valueClassName="font-semibold text-black"
      />
    </div>
  );
};

export default OrderBreakdown;
