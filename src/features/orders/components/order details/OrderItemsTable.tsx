'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  console.log(orderItems);

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
          <p>{product?.quantity}</p>
        </div>
      ),
      label: 'Qty',
    },
    {
      key: product => (
        <div>
          {product?.product?.discounted_until &&
          product?.product?.discount &&
          new Date(product?.product?.discounted_until) > new Date() ? (
            <div className="grid gap-1">
              <p className="text-xs line-through">
                {formatCurrency(product?.product?.retail_price)}
              </p>
              <p>{formatCurrency(product?.product?.retail_price - product?.product?.discount)}</p>
            </div>
          ) : (
            <p>{formatCurrency(product?.product?.retail_price)}</p>
          )}
        </div>
      ),
      label: 'Price',
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
  ]);

  return <DynamicTable variant={variant} fields={fields} data={orderItems} />;
};

export default OrderItemsTable;
