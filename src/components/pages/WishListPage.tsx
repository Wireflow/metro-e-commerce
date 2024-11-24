'use client';

import { formatDistanceToNow } from 'date-fns';
import { CircleX } from 'lucide-react';

import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';
import { useDeleteFromWishList } from '@/features/wishlist/hooks/mutations/useDeleteFromWishlist';
import { useWishList } from '@/features/wishlist/hooks/mutations/wishlist-query-hooks';

import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import DynamicTable, { useTableFields } from '../ui/dynamic-table';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Wish List', href: '/customer/wishlist' },
];

const WishListPage = () => {
  const { data: wishlist } = useWishList();

  const { mutate: deleteFromWishList } = useDeleteFromWishList();

  const handleProductWishListRemove = (productId: string) => {
    deleteFromWishList(productId);
  };

  const fields = useTableFields<Product>([
    {
      key: product => (
        <ProductCard.Image
          disableHoverEffect
          disableSaleBadge
          product={product}
          className="p-0"
          object="cover"
        />
      ),
      label: 'Image',
      className: 'w-[68px] pl-4',
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
          <ProductCard.Price product={product} className="flex-1" />
        </div>
      ),
      label: 'Price',
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
      key: product => (
        <div className="flex justify-end gap-2">
          <ProductCard.AddToCartButton product={product} className="min-w-[200px]" />
          <Button
            variant={'none'}
            size={'icon'}
            onClick={() => handleProductWishListRemove(product?.id)}
            className="flex-[0.2] text-gray-500"
          >
            <CircleX />
          </Button>
        </div>
      ),
      className: 'text-end pr-4  w-fit',
      label: 'Actions',
    },
  ]);
  if (!wishlist?.product) {
    return;
  }
  return (
    <div>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container>
        <Card className="p-0 shadow-none">
          <h1 className="p-5 text-lg font-semibold">Wishlist</h1>
          <CardContent className="p-0">
            <DynamicTable
              fields={fields}
              data={wishlist?.product as Product[]}
              variant="minimal"
              headerClassname="bg-gray-200 text-white"
              emptyMessage="No products in wishlist"
            />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default WishListPage;
