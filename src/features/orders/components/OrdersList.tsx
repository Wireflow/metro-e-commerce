'use client';

// eslint-disable-next-line import/no-named-as-default
import { Badge } from '@/components/ui/badge';
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import { formatDateToString } from '@/utils/dateUtils';

import { Order } from '../schemas/orders';

type Props = {
  orders: Order[];
};

const OrdersList = ({ orders }: Props) => {
  const fields = useTableFields<Order>([
    {
      key: order => (
        <div>
          <p>{order.order_number}</p>
        </div>
      ),
      label: 'Order ID',
      className: 'w-[68px]',
    },
    {
      key: order => (
        <div className="flex flex-col items-start gap-1">
          <p>{formatDateToString(new Date(order.created_at))}</p>
        </div>
      ),
      className: 'min-w-[300px] md:min-w-none',
      label: 'Date',
    },
    {
      key: order => (
        <div>
          <p>{(order.customer.first_name, order.customer.last_name)}</p>
          <p>{order.customer.email}</p>
        </div>
      ),
      label: 'Customer',
    },
    {
      key: order => (
        <div>
          <p>{order.total_amount}</p>
        </div>
      ),
      label: 'Total',
    },
    {
      key: order => (
        <div>
          <p>{order.refunded_at}</p>
        </div>
      ),
      label: 'Payment',
      className: 'min-w-[120px]',
    },
    {
      key: order => (
        <Badge variant={order?.payment?.payment_status === 'approved' ? 'success' : 'destructive'}>
          {order?.payment?.payment_status}
        </Badge>
      ),
      label: 'Status',
    },
    {
      key: order => <div>{order.order_number}</div>,
      className: 'text-center md:max-w-[50px]',
      label: 'Actions',
    },
  ]);

  return <DynamicTable fields={fields} data={orders} />;
};

export default OrdersList;
