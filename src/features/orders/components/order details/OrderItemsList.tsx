import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { OrderDetails } from '../../schemas/orders';

type Props = {
  order: OrderDetails;
};

const OrderItemsList = ({ order }: Props) => {
  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex items-center gap-3 pt-4">
            <p className="text-lg font-semibold">Order List</p>
            <Badge variant={'success'}>
              <span className="text-md font-bold">{order.orderItems.length} Products</span>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderItemsList;
