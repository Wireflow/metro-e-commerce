'use client';

import { ArrowRight, Calendar, Check, Info, Package, Store, Truck, Undo2 } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DynamicTable, useTableFields } from '@/components/ui/dynamic-table';
import { Enum } from '@/types/supabase/enum';
import { Row } from '@/types/supabase/table';
import { formatRelativeDateTime } from '@/utils/dateUtils';
import { getUserFullName } from '@/utils/userUtils';
import { formatCurrency, formatPhoneNumber } from '@/utils/utils';

import { Order } from '../schemas/orders';

type DisabledFields = 'customer' | 'payment' | 'status';

type Props = {
  orders: Order[];
  disabledFields?: DisabledFields[];
  variant?: 'default' | 'minimal';
};

const OrdersList = ({ orders, disabledFields, variant = 'default' }: Props) => {
  const getBadgeVariantOrderStatus = (status: Enum<'order_status'>) => {
    switch (status) {
      case 'created':
        return 'destructive';
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

  const getOrderTypeInfo = (order: Order) => {
    if (order.order_category === 'return') {
      return {
        icon: <Undo2 className="h-4 w-4 text-blue-600" />,
        color: 'bg-blue-50 text-blue-700',
        label: 'Return',
      };
    }

    switch (order.type) {
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
      className: 'min-w-[100px]',
    },
    {
      key: order => (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start gap-1.5">
            <div
              className={`flex items-center gap-1 rounded-md px-2 py-1 ${getOrderTypeInfo(order).color}`}
            >
              {getOrderTypeInfo(order).icon}
              <span className="text-xs font-medium">{getOrderTypeInfo(order).label}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Calendar className="mt-0.5 h-3.5 w-3.5 text-gray-500" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-gray-700">
                  {formatRelativeDateTime(getOrderTimestamp(order))}
                </p>
                {order.expected_delivery_at && (
                  <span className="text-xs text-amber-600">
                    Expected: {formatRelativeDateTime(order.expected_delivery_at)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      label: 'Details',
      className: 'min-w-[250px]',
    },

    {
      key: order => (
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-900">{formatCustomerName(order)}</p>
          {order?.customer?.email && (
            <p className="cursor-pointer text-xs text-blue-600 hover:underline">
              {order?.customer.email}
            </p>
          )}
          {order?.customer?.phone && (
            <p className="text-xs text-green-600">{formatPhoneNumber(order?.customer?.phone)}</p>
          )}
        </div>
      ),
      label: 'Customer',
      className: 'min-w-[200px]',
      disabled: disabledFields?.includes('customer'),
    },
    {
      key: order => (
        <div className="flex flex-col items-start gap-1.5">
          <Badge
            variant={
              order?.payment?.payment_type
                ? order?.payment?.payment_type === 'later'
                  ? 'outline-info'
                  : 'outline-success'
                : 'outline-error'
            }
            className="capitalize"
          >
            {order?.payment?.payment_type ? (
              <span className="flex items-center gap-1 capitalize">
                {order?.payment?.payment_type === 'later' ? (
                  <>
                    Pay on {order?.type} <Info className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Paid {order.payment.payment_type} <Check className="h-3 w-3" />
                  </>
                )}
              </span>
            ) : order.order_category === 'return' ? (
              'Return Order'
            ) : (
              'Payment Failed'
            )}
          </Badge>

          {order.salesperson && (
            <span className="w-fit rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              Sales: <span className="font-bold">{getUserFullName(order.salesperson)}</span>
            </span>
          )}
        </div>
      ),
      label: 'Payment',
      className: 'min-w-[200px] text-start',
      disabled: disabledFields?.includes('payment'),
    },
    {
      key: order => (
        <div className="flex flex-col items-center gap-1">
          <p className="font-medium text-gray-900">
            {formatCurrency(
              order.order_category === 'return' ? order.total_refunded : order.total_amount
            )}
          </p>
          <Badge variant="secondary" className="w-fit">
            {order.order_category === 'return' ? order.quantity_refunded : order.total_quantity}{' '}
            items
          </Badge>
          {!!order.shipping_costs && (
            <span className="w-fit rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
              +{formatCurrency(order.shipping_costs)} shipping
            </span>
          )}
        </div>
      ),
      label: 'Total',
      className: 'min-w-[150px] text-center',
    },

    {
      key: order => (
        <div className="flex flex-col items-start gap-2">
          <Badge
            variant={
              order.order_category === 'return'
                ? 'warning'
                : getBadgeVariantOrderStatus(order?.status)
            }
            className="capitalize"
          >
            {order?.status === 'created'
              ? 'failed'
              : order.order_category === 'return'
                ? `Return ${order?.status}`
                : order?.status}
          </Badge>
          {getOrderStatusDate(order) && (
            <p className="ml-0.5 text-xs text-gray-500">
              {formatRelativeDateTime(getOrderStatusDate(order))}
            </p>
          )}
        </div>
      ),
      label: 'Status',
      className: 'min-w-[150px]',
      disabled: disabledFields?.includes('status'),
    },
    {
      key: order => (
        <Link href={`/admin/orders/${order.id}`}>
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-neutral-300">
            View <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      ),
      label: 'Actions',
      className: 'w-[100px]',
    },
  ]);

  return (
    <DynamicTable
      fields={fields}
      data={orders}
      className="h-full"
      variant={variant}
      emptyMessage="No order history"
    />
  );
};

export default OrdersList;
