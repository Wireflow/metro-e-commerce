import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/utils';

import { OrderDetails } from '../../schemas/orders';
import OrderItemsTable from './OrderItemsTable';

type Props = {
  order: OrderDetails;
};

const OrderItemsList = ({ order }: Props) => {
  return (
    <div className="cols-span-2 md:cols-span-1">
      <Card className="shadow-none">
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col justify-between sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 pt-4">
              <p className="text-lg font-semibold">Items</p>
              <Badge variant={'success'}>
                <span className="text-md font-bold">{order.total_quantity} Products</span>
              </Badge>
            </div>
            <p>
              <span className="text-lg font-bold">Invoice</span> #{order.order_number}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col gap-2">
              <p className="md:text-md text-sm font-medium text-neutral-500">
                Subtotal: {formatCurrency(order?.subtotal ?? 0)}
              </p>
              <p className="md:text-md text-sm font-medium text-neutral-500">
                Tax: {formatCurrency(order.tax)}
              </p>
              <p className="md:text-md text-sm font-medium text-neutral-500">
                Fees: {formatCurrency(order.fees)}
              </p>
              <p className="md:text-md text-sm font-medium text-neutral-500">
                Shipping Costs: {formatCurrency(order.shipping_costs ?? 0)}
              </p>
              <p className="md:text-md text-sm font-medium text-red-500">
                Discount: {formatCurrency(order.total_discount)}
              </p>
              <p className="text-md font-bold md:text-lg">
                Grand Total: {formatCurrency(order.total_amount)}
              </p>
            </div>
          </div>
          <OrderItemsTable orderItems={order.orderItems} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderItemsList;
