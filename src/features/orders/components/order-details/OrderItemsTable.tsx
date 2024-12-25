'use client';

import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
// eslint-disable-next-line import/no-named-as-default
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { formatCurrency } from '@/utils/utils';

import { OrderItemsDetails } from '../../schemas/orders';

type Props = {
  orderItems: OrderItemsDetails[];
  variant?: 'default' | 'bordered' | 'minimal' | 'striped';
};

const OrderItemsTable = ({ orderItems, variant = 'default' }: Props) => {
  const GetStatusColor = (status: string) => {
    switch (status) {
      case 'returned':
        return 'destructive';
      case 'confirmed':
        return 'success';
      case 'partial':
        return 'warning';
      default:
        return 'default';
    }
  };
  const fields = useTableFields<OrderItemsDetails>([
    {
      key: product => (
        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
          <Image
            src={product?.product.product_images[0]?.url ?? PLACEHOLDER_IMG_URL}
            alt={product.product.name}
            fill
            sizes="48px"
            className="object-cover"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ),
      label: 'Product',
      className: 'w-[68px]',
    },
    {
      key: product => (
        <div className="flex flex-col items-start gap-1">
          <p>{product.product.name}</p>
        </div>
      ),
      className: 'min-w-[300px] md:min-w-none',
      label: '',
    },
    {
      key: product => (
        <div>
          <p>{product.product?.barcodes?.[0]?.barcode}</p>
        </div>
      ),
      label: 'SKU',
      className: 'min-w-[120px]',
    },
    {
      key: product => (
        <div>
          <p className="text-center">{product?.quantity ?? 0}</p>
        </div>
      ),
      label: 'Qty',
    },
    {
      key: product =>
        product.status !== 'confirmed' && (
          <div className="flex items-center justify-center gap-1">
            <p className="">{product?.refunded_quantity ?? 0}</p>
            <p className="text-sm text-gray-500">({formatCurrency(product.refunded_amount)})</p>
          </div>
        ),
      label: 'Refunded',
    },
    {
      key: product => <div>{formatCurrency(product.unit_price)}</div>,
      label: 'Price',
    },
    {
      key: product => <div>{formatCurrency(product.tax_amount)}</div>,
      label: 'Tax',
    },
    {
      key: product => <div>{formatCurrency(product.discount_amount)}</div>,
      label: 'Discount',
    },
    {
      key: product => (
        <div>
          <p>{formatCurrency(product.total_price)}</p>
        </div>
      ),
      label: 'Total',
      className: 'min-w-[120px]',
    },

    {
      key: product => (
        <Badge className="capitalize" variant={GetStatusColor(product.status)}>
          {product.status}
        </Badge>
      ),
      label: 'Status',
      className: 'min-w-[120px]',
    },
  ]);

  return <DynamicTable variant={variant} fields={fields} data={orderItems} />;
};

export default OrderItemsTable;
