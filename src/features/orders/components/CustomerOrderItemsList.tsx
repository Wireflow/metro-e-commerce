'use client';

import Image from 'next/image';

import { CheckCircle2, Minus, Plus, XCircle } from 'lucide-react';
import { useState } from 'react';

import { Animate } from '@/components/animation/Animate';
import { Button } from '@/components/ui/button';
import { DynamicTable, useTableFields } from '@/components/ui/dynamic-table';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { formatCurrency } from '@/utils/utils';

import { OrderItemsDetails } from '../schemas/orders';

type Props = {
  orderItems: OrderItemsDetails[];
  variant?: 'default' | 'bordered' | 'minimal' | 'striped';
  limit?: number;
};

const CustomerOrderItemsList = ({ orderItems, variant = 'default', limit }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = limit && orderItems.length > limit;
  const displayedItems = shouldShowButton && !isExpanded ? orderItems.slice(0, limit) : orderItems;

  const fields = useTableFields<OrderItemsDetails>([
    {
      key: product => (
        <div className="flex gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-md border md:h-20 md:w-20">
            <Image
              src={product?.product.product_images[0]?.url ?? PLACEHOLDER_IMG_URL}
              alt={product.product.name}
              fill
              className="object-cover"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="mt-2 flex flex-col items-start gap-1">
            <p className="text-xs font-medium text-theme-sky-blue">
              {product.product.manufacturer}
            </p>
            <p className="truncate font-medium">{product.product.name}</p>
          </div>
        </div>
      ),
      label: 'Product',
    },
    {
      key: product => (
        <div>
          <p>{formatCurrency(product.unit_price)}</p>
        </div>
      ),
      label: 'Unit Price',
      className: 'text-center',
    },
    {
      key: product => (
        <div>
          <p>x{product?.quantity}</p>
        </div>
      ),
      label: 'Quantity',
      className: 'text-center',
    },
    {
      key: product => (
        <div>
          <p>
            {!!product?.discount_amount && '-'}
            {formatCurrency(product?.discount_amount)}
          </p>
        </div>
      ),
      label: 'Discount',
      className: 'text-center',
    },
    {
      key: product => (
        <div>
          <p>
            {!!product?.tax_amount && '+'}
            {formatCurrency(product?.tax_amount)}
          </p>
        </div>
      ),
      label: 'Tax',
      className: 'text-center',
    },
    {
      key: product => (
        <div>
          <p>{formatCurrency(product.total_price)}</p>
        </div>
      ),
      label: 'Total',
      className: 'text-center',
    },
    {
      key: product => (
        <div className="flex items-center justify-center">
          {product.status === 'returned' ? (
            <XCircle className="h-5 w-5 text-red-600" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          )}
        </div>
      ),
      label: 'Status',
      className: 'text-center',
    },
  ]);

  return (
    <div className="w-full">
      <Animate type="bounce">
        <DynamicTable variant={variant} fields={fields} data={displayedItems} />
      </Animate>

      {shouldShowButton && (
        <Button
          variant="ghost"
          className="mt-4 w-full text-gray-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <span className="flex items-center gap-2">
              Show Less <Minus className="h-4 w-4" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              View All ({orderItems.length} items) <Plus className="h-4 w-4" />
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default CustomerOrderItemsList;
