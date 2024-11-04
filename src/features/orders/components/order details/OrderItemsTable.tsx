'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
// eslint-disable-next-line import/no-named-as-default
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { formatCurrency } from '@/utils/utils';

import { OrderDetails, OrderItemsDetails } from '../../schemas/orders';

type Props = {
  order: OrderDetails;
};

const OrderItemsTable = ({ order }: Props) => {
  const router = useRouter();

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
      label: 'Image',
      className: 'w-[68px]',
    },
    {
      key: product => (
        <div className="flex flex-col items-start gap-1">
          <Badge variant={'warning'} className="-ml-1 h-5 shadow-none">
            Discount {product.discount_amount}
          </Badge>

          <p>{product.product.name}</p>
        </div>
      ),
      className: 'min-w-[300px] md:min-w-none',
      label: 'Name',
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
      label: 'Retail Price',
    },
    {
      key: product => (
        <div>
          <p>{product.quantity}</p>
        </div>
      ),
      label: 'Qty',
    },
    {
      key: product => (
        <div>
          <p>{product.product.retail_price * product.quantity}</p>
        </div>
      ),
      label: 'Total',
      className: 'min-w-[120px]',
    },
  ]);

  return <DynamicTable fields={fields} data={order.orderItems} />;
};

export default OrderItemsTable;
