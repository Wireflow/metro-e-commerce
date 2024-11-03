'use client';

import Image from 'next/image';

// eslint-disable-next-line import/no-named-as-default
import DynamicTable, { TableField } from '@/components/ui/dynamic-table';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { formatCurrency } from '@/utils/utils';

import { TopSellingProduct } from '../schemas/top-selling-product';

type Props = {
  topSellingProducts: TopSellingProduct[];
};

const TopProductsList = ({ topSellingProducts }: Props) => {
  const fields: TableField<TopSellingProduct>[] = [
    {
      key: (p, index) => index,
      label: 'No.',
      className: 'md:w-[50px]',
    },
    {
      key: product => (
        <div className="flex gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-md border">
            <Image
              src={
                product?.product.images?.length > 0
                  ? product.product.images[0]?.url
                  : PLACEHOLDER_IMG_URL
              }
              alt={product.product.name}
              fill
              sizes="48px"
              className="object-cover"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{product.product.name}</p>
            <p className="text-xs text-gray-500">{product.product.manufacturer}</p>
          </div>
        </div>
      ),
      label: 'Product',
      className: 'w-[200px] truncate',
    },
    {
      key: p => (
        <div className="grid gap-1">
          <p className="text-xs">
            <span className="font-medium">Retail:</span>{' '}
            <span className="text-blue-600">{formatCurrency(p.product.retail_price)}</span>
          </p>
          <p className="text-xs">
            <span className="font-medium">Wholesale:</span>{' '}
            <span className="text-amber-700">{formatCurrency(p.product.wholesale_price)}</span>
          </p>
        </div>
      ),
      label: 'Price',
    },
    {
      key: p => <p>{p.sales} pcs</p>,
      label: 'Items Sold',
    },
  ];

  return (
    <DynamicTable
      data={topSellingProducts}
      fields={fields}
      variant="minimal"
      emptyMessage="Not enough sales to show top selling products!"
    />
  );
};

export default TopProductsList;
