'use client';

import { useQueryClient } from '@tanstack/react-query';
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

type Props = {};

const WishListPage = (props: Props) => {
  const { data: wishlist } = useWishList();
  const { mutate: deleteFromWishList } = useDeleteFromWishList();
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Wish List', href: '/customer/wishlist' },
  ];

  const handleProductWishListRemove = (productId: string) => {
    deleteFromWishList(productId);
  };
  const queryClient = useQueryClient();

  if (wishlist) {
    queryClient.invalidateQueries({ queryKey: ['wishlist'] });
  }

  const fields = useTableFields<Product>([
    {
      key: product => (
        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
          <ProductCard.Image
            disableHoverEffect
            disableSaleBadge
            product={product}
            className="flex-1 object-cover"
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
        <div className="flex items-center">
          <ProductCard.AddToCartButton product={product} className="flex-1" />
          <Button
            variant={'none'}
            onClick={() => handleProductWishListRemove(product?.id)}
            className="flex-1"
          >
            <CircleX />
          </Button>
        </div>
      ),
      className: 'text-center ',
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
        <Card>
          <h1 className="p-5 text-lg font-bold">Wishlist</h1>
          <CardContent>
            <DynamicTable fields={fields} data={wishlist?.product as Product[]} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default WishListPage;
