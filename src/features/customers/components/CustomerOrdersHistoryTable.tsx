'use client';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import { Order } from '@/features/orders/schemas/orders';
import { useUser } from '@/hooks/useUser';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';
import { formatRelativeDateTime } from '@/utils/dateUtils';
import { formatCurrency } from '@/utils/utils';

import { useCustomerOrdersClient } from '../server/getCustomerOrdersClient';
import useCustomerTabs from '../store/useCustomerTabs';
import { CustomerTab } from './CustomerAccountSideBar';

type Props = {
  TableName?: string;
  action?: boolean;
  limit: number;
};

const CustomerOrdersHistoryTable = ({ TableName, action, limit }: Props) => {
  const { setActiveTab } = useCustomerTabs();
  const { metadata } = useUser();
  const { data: customerOrders } = useCustomerOrdersClient({
    customerId: metadata?.id,
    limit: limit,
  });
  const matchingHref = '/customer/history';
  const getBadgeVariantOrderStatus = (status: Enum<'order_status'>) => {
    switch (status) {
      case 'created':
        return 'secondary';
      case 'ready':
        return 'indigo';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      case 'completed':
        return 'success';
      case 'refunded':
        return 'secondary';
      case 'confirmed':
        return 'success';
      case 'preparing':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getOrderStatusDate = (order: Row<'orders'>) => {
    switch (order.status) {
      case 'pending':
        return order.created_at;
      case 'confirmed':
        return order.confirmed_at;
      case 'preparing':
        return order.preparing_at;
      case 'ready':
        return order.ready_at;
      case 'completed':
        return order.completed_at;
      case 'cancelled':
        return order.cancelled_at;
      case 'refunded':
        return order.refunded_at;
      default:
        return null;
    }
  };

  const fields = useTableFields<Order>([
    {
      key: order => (
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-900">#{order.order_number}</span>
        </div>
      ),
      label: 'No.',
      className: 'w-[300px]',
    },
    {
      key: order => (
        <div className="flex flex-col items-start gap-2">
          <Badge variant={getBadgeVariantOrderStatus(order.status)} className="capitalize">
            {order?.status === 'created' ? 'Initialized' : order?.status}
          </Badge>
          {getOrderStatusDate(order) && (
            <p className="ml-0.5 text-xs text-gray-500">
              {formatRelativeDateTime(getOrderStatusDate(order))}
            </p>
          )}
        </div>
      ),
      label: 'Status',
      className: 'min-w-[150px] ',
    },

    {
      key: order => (
        <div className="flex flex-col items-center gap-1">
          <p className="font-medium text-gray-900">{formatCurrency(order.total_amount)}</p>
          <Badge variant="secondary" className="w-fit">
            {order.total_quantity} items
          </Badge>
          {order.shipping_costs && (
            <span className="w-fit rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
              +{formatCurrency(order.shipping_costs)} shipping
            </span>
          )}
        </div>
      ),
      label: 'Total',
      className: 'min-w-[550px] text-center',
    },

    {
      key: order => (
        <Link
          onClick={() => setActiveTab(matchingHref as CustomerTab)}
          href={`/customer/history/${order.id}`}
        >
          <Button
            variant="ghost"
            size="lg"
            className="gap-1 text-theme-sky-blue hover:bg-transparent"
          >
            View <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      ),
      label: 'Actions',
      className: 'w-[200px]',
    },
  ]);
  return (
    <div className="rounded-md border border-gray-200">
      <div className="flex items-center justify-between gap-5 px-5 py-3">
        <p className="text-xl font-semibold capitalize">{TableName}</p>
        {action && (
          <Link
            className="flex items-center text-sm text-primary"
            onClick={() => setActiveTab(matchingHref as CustomerTab)}
            href={matchingHref}
          >
            View All <ArrowRight className="ml-2" />
          </Link>
        )}
      </div>
      <div>
        <DynamicTable
          fields={fields}
          data={customerOrders ?? []}
          className="h-full"
          emptyMessage="No order history"
        />
      </div>
    </div>
  );
};

export default CustomerOrdersHistoryTable;
