'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import Container from '@/components/layout/Container';
import List from '@/components/List';
import BestDealsSkeleton from '@/components/skeletons/BestDealsSkeleton';
import { Button } from '@/components/ui/button';
import WithAuth from '@/features/auth/components/WithAuth';
import { getEditModePath, getEditModeUrl } from '@/lib/editRouting';
import { cn } from '@/lib/utils';

import { useDiscountedProducts } from '../hooks/queries/useTopDeal';
import { Product } from '../schemas/products';
import ProductCard from './ProductCard';

type Props = {
  className?: string;
};

const BestDeals = ({ className }: Props) => {
  const { data: products, isLoading } = useDiscountedProducts(9);
  const router = useRouter();
  const searchParams = useSearchParams();

  const topDeal = products?.slice(0)[0];
  const restDeals = products?.slice(1).map((product, index) => ({
    ...product,
    // Show all items in mobile, hide items after 6 in md, show all in lg
    ...(index >= 6 && { className: 'block md:hidden lg:block' }),
  }));

  if (isLoading) return <BestDealsSkeleton />;

  if (!products || products?.length <= 0) return null;

  const handleProductClick = (productId: string) => {
    const url = getEditModePath(`/products/${productId}`, searchParams);
    router.push(url);
  };

  const renderFeaturedCard = (product: Product) => (
    <ProductCard
      key={product.id}
      className="group flex h-full cursor-pointer flex-col justify-between gap-4 p-4 transition-all hover:shadow-lg"
      onClick={() => handleProductClick(product.id)}
    >
      <div className="relative flex-1">
        <div className="absolute right-0 top-0 z-10 flex flex-col gap-2">
          <ProductCard.SaleBadge product={product} variant="discount" />

          <ProductCard.SaleBadge
            product={product}
            variant="hot"
            className="absolute right-0 top-10"
          />
        </div>

        <ProductCard.Image
          product={product}
          className="h-64 w-full object-contain"
          disableSaleBadge
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <ProductCard.Title product={product} className="truncate" />
          <ProductCard.Price product={product} />
          <ProductCard.Description
            product={product}
            className="line-clamp-2 text-sm text-muted-foreground"
          />
        </div>

        <ProductCard.AdminEditButton product={product} />
        <WithAuth disableAdmin rules={{ customCheck: metadata => !!metadata?.approved }}>
          <div className="flex flex-wrap gap-2">
            <ProductCard.WishlistButton product={product} />
            <ProductCard.AddToCartButton product={product} className="h-9 flex-1" />
            <ProductCard.QuickViewButton product={product}>
              View Product
            </ProductCard.QuickViewButton>
          </div>
        </WithAuth>
      </div>
    </ProductCard>
  );

  const renderItem = (item: Product & { className?: string }) => (
    <ProductCard
      key={item.id}
      className={cn(
        'group flex h-full cursor-pointer flex-col gap-4 p-4 transition-all hover:shadow-lg',
        item.className
      )}
      onClick={() => handleProductClick(item.id)}
    >
      <div className="relative aspect-square w-full">
        <ProductCard.Image product={item} className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <ProductCard.Title product={item} size="sm" className="truncate" />
        <ProductCard.Price product={item} />
        <ProductCard.AdminEditButton product={item} />
      </div>
    </ProductCard>
  );

  return (
    <Container className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold md:text-xl">Best Deals</p>
        <Link href={getEditModeUrl('/shop', searchParams)}>
          <Button className="w-fit text-theme-sky-blue" variant={'link'}>
            <span className="hidden sm:block">Browse All Products</span>
            <span className="block sm:hidden">Browse All</span>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        {topDeal && (
          <div className="h-full bg-card md:col-span-4">{renderFeaturedCard(topDeal)}</div>
        )}

        <div className={cn('h-full bg-card', topDeal ? 'md:col-span-8' : 'md:col-span-12')}>
          <List<Product & { className?: string }>
            data={restDeals ?? []}
            renderItem={renderItem}
            ListEmptyComponent={
              <div className="flex h-full items-center justify-center p-8">
                <p className="text-muted-foreground">No deals available</p>
              </div>
            }
            contentClassName={cn(
              'grid auto-rows-fr gap-4',
              topDeal
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5'
            )}
          />
        </div>
      </div>
    </Container>
  );
};

export default BestDeals;
