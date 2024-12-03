'use client';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DynamicTable, useTableFields } from '@/components/ui/dynamic-table';
import { Order } from '@/features/orders/schemas/orders';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';
import { formatRelativeDateTime } from '@/utils/dateUtils';
import { formatCurrency } from '@/utils/utils';

import useCustomerTabs from '../store/useCustomerTabs';
import { CustomerTab } from './CustomerAccountSideBar';

type Props = {
  TableName?: string;
  action?: boolean;
  orders: Order[];
};

const CustomerOrdersHistoryTable = ({ TableName, action, orders }: Props) => {
  const { setActiveTab } = useCustomerTabs();
  const matchingHref = '/customer/history';

  const getOrderStatusColor = (status: Enum<'order_status'>) => {
    switch (status) {
      case 'created':
        return 'text-gray-500';
      case 'ready':
        return 'text-indigo-500';
      case 'pending':
        return 'text-yellow-500';
      case 'cancelled':
        return 'text-red-500';
      case 'completed':
        return 'text-green-500';
      case 'refunded':
        return 'text-gray-500';
      case 'confirmed':
        return 'text-green-500';
      case 'preparing':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
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
      className: 'pl-4 w-[300px]',
    },
    {
      key: order => (
        <div className={`font-semibold uppercase ${getOrderStatusColor(order.status)}`}>
          {order?.status}
        </div>
      ),
      label: 'Status',
      className: ' w-[300px]',
    },
    {
      key: order => (
        <div className="flex flex-col items-start gap-2">
          {getOrderStatusDate(order) ? (
            <p className="ml-0.5 text-gray-500">
              {formatRelativeDateTime(getOrderStatusDate(order))}
            </p>
          ) : (
            'N/A'
          )}
        </div>
      ),
      label: 'Date',
      className: ' w-[300px]',
    },

    {
      key: order => (
        <div className="flex items-center gap-1">
          <p className="font-medium text-gray-900">{formatCurrency(order.total_amount)}</p>(
          {order.total_quantity} Products)
        </div>
      ),
      label: 'Total',
      className: 'w-[300px] text-left',
    },

    {
      key: order => (
        <Link
          onClick={() => setActiveTab(matchingHref as CustomerTab)}
          href={`/customer/history/${order.id}`}
        >
          <Button variant="ghost" className="gap-1 px-0 text-theme-sky-blue hover:bg-transparent">
            View Details <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      ),
      label: 'Actions',
      className: 'text-right',
    },
  ]);
  return (
    <div className="rounded-md border border-gray-200">
      <div className="flex items-center justify-between gap-5 px-5 py-3">
        <p className="text-md font-semibold capitalize">{TableName}</p>
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
          data={orders ?? []}
          className="h-full"
          emptyMessage="No order history"
          variant="minimal"
        />
      </div>
    </div>
  );
};

export default CustomerOrdersHistoryTable;
