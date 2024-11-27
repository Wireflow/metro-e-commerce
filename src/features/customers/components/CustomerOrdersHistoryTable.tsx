'use client';
import Link from 'next/link';

import { ArrowRight, Package, Store, Truck } from 'lucide-react';

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

  const getOrderTypeInfo = (type: Enum<'order_type'>) => {
    switch (type) {
      case 'delivery':
        return {
          icon: <Truck className="h-4 w-4 text-blue-600" />,
          color: 'bg-blue-50 text-blue-700',
          label: 'Delivery',
        };
      case 'shipment':
        return {
          icon: <Package className="h-4 w-4 text-purple-600" />,
          color: 'bg-purple-50 text-purple-700',
          label: 'Shipment',
        };
      case 'pickup':
        return {
          icon: <Store className="h-4 w-4 text-green-600" />,
          color: 'bg-green-50 text-green-700',
          label: 'Pickup',
        };
      default:
        return {
          icon: null,
          color: 'bg-gray-50 text-gray-700',
          label: 'Unknown',
        };
    }
  };

  const formatCustomerName = (order: Order) => {
    const businessName = order.customer?.business_name;
    const firstName = order.customer?.first_name;
    const lastName = order.customer?.last_name;

    if (businessName) {
      return businessName.toUpperCase();
    }
    if (firstName || lastName) {
      return `${firstName || ''} ${lastName || ''}`.trim().toUpperCase();
    }
    return 'N/A';
  };

  const getOrderTimestamp = (order: Order) => {
    return (
      order.completed_at ||
      order.ready_at ||
      order.preparing_at ||
      order.confirmed_at ||
      order.created_at
    );
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
        <Link onClick={() => setActiveTab(matchingHref)} href={`/customer/history/${order.id}`}>
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-neutral-300">
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
      <div className="flex items-center justify-between gap-5 p-5">
        <p className="text-xl font-semibold capitalize">{TableName}</p>
        {action && (
          <Link
            className="flex items-center text-primary"
            onClick={() => setActiveTab(matchingHref)}
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
