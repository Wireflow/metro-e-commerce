'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { formatDistanceToNow } from 'date-fns';

import { Badge } from '@/components/ui/badge';
// eslint-disable-next-line import/no-named-as-default
import DynamicTable, { useTableFields } from '@/components/ui/dynamic-table';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import { formatCurrency } from '@/utils/utils';

import { Product } from '../../schemas/products';
import ProductActions from './ProductActions';

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  const router = useRouter();
  const fields = useTableFields<Product>([
    {
      key: product => (
        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
          <Image
            src={product?.images[0]?.url ?? PLACEHOLDER_IMG_URL}
            alt={product.name}
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
          {product?.discounted_until && new Date(product?.discounted_until) > new Date() && (
            <Badge variant={'warning'} className="-ml-1 h-5 shadow-none">
              Sale ends{' '}
              {formatDistanceToNow(new Date(product?.discounted_until), {
                addSuffix: true,
              })}
            </Badge>
          )}
          <p>{product.name}</p>
        </div>
      ),
      className: 'min-w-[300px] md:min-w-none',
      label: 'Name',
    },
    {
      key: product => (
        <div>
          {product?.discounted_until &&
          product?.discount &&
          new Date(product?.discounted_until) > new Date() ? (
            <div className="grid gap-1">
              <p className="text-xs line-through">{formatCurrency(product.retail_price)}</p>
              <p>{formatCurrency(product.retail_price - product?.discount)}</p>
            </div>
          ) : (
            <p>{formatCurrency(product.retail_price)}</p>
          )}
        </div>
      ),
      label: 'Retail Price',
    },
    {
      key: product => (
        <div>
          {product?.discounted_until &&
          product?.discount &&
          new Date(product?.discounted_until) > new Date() ? (
            <div className="grid gap-1">
              <p className="text-xs line-through">{formatCurrency(product.wholesale_price)}</p>
              <p>{formatCurrency(product.wholesale_price - product?.discount)}</p>
            </div>
          ) : (
            <p>{formatCurrency(product.wholesale_price)}</p>
          )}
        </div>
      ),
      label: 'Wholesale Price',
    },
    {
      key: product => (
        <Badge variant={product.in_stock ? 'success' : 'destructive'}>
          {product.in_stock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      ),
      label: 'Stock',
      className: 'min-w-[120px]',
    },
    {
      key: product => product.manufacturer,
      label: 'Brand',
    },
    {
      key: product => (
        <ProductActions
          productId={product.id}
          published={product.published}
          in_stock={product.in_stock}
          onEdit={() => router.push(`/admin/products/${product.id}`)}
        />
      ),
      className: 'text-center md:max-w-[50px]',
      label: 'Actions',
    },
  ]);

  return <DynamicTable fields={fields} data={products} />;
};

export default ProductList;
