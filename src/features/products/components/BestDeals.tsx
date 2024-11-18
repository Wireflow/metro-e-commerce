'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';

import Container from '@/components/layout/Container';
import List from '@/components/List';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useDiscountedProducts } from '../hooks/queries/useTopDeal';
import { Product } from '../schemas/products';
import ProductCard from './ProductCard';

type Props = {
  className?: string;
};

const BestDeals = ({ className }: Props) => {
  const { data: products } = useDiscountedProducts(9);
  const router = useRouter();

  const topDeal = products?.slice(0)[0];
  const restDeals = products?.slice(1, 9); // Limit to 8 products for the grid

  const renderFeaturedCard = (product: Product) => (
    <ProductCard
      key={product.id}
      className="group flex h-full cursor-pointer flex-col justify-between gap-4 p-4 transition-all hover:shadow-lg"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative flex-1">
        <div className="absolute right-0 top-0 z-10 flex flex-col gap-2">
          <ProductCard.SaleBadge product={product} variant="discount" />
          <ProductCard.SaleBadge product={product} variant="hot" />
        </div>

        <ProductCard.Image
          product={product}
          className="h-full w-full object-contain"
          disableSaleBadge
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <ProductCard.Title product={product} className="line-clamp-2" />
          <ProductCard.Price product={product} />
          <ProductCard.Description
            product={product}
            className="line-clamp-2 text-sm text-muted-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <ProductCard.WishlistButton product={product} />
          <ProductCard.AddToCartButton product={product} className="flex-1" />
          <ProductCard.QuickViewButton product={product} />
        </div>
      </div>
    </ProductCard>
  );

  const renderItem = (item: Product) => (
    <ProductCard
      key={item.id}
      className="group flex cursor-pointer flex-col gap-4 p-4 transition-all hover:shadow-lg"
      onClick={() => router.push(`/products/${item.id}`)}
    >
      <ProductCard.Image product={item} className="aspect-square w-full object-contain" />
      <div className="flex flex-col gap-1">
        <ProductCard.Title product={item} size="sm" className="line-clamp-2" />
        <ProductCard.Price product={item} />
      </div>
    </ProductCard>
  );

  return (
    <Container className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold md:text-xl">Best Deals</p>
        <Link href={'/shop'}>
          <Button className="w-fit text-theme-sky-blue" variant={'link'}>
            Browse All Products <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        {/* Featured Product - Takes 4 columns on larger screens */}
        {topDeal && <div className="bg-card md:col-span-4">{renderFeaturedCard(topDeal)}</div>}

        {/* Product Grid - Takes 8 columns on larger screens */}
        <div className={cn('bg-card', topDeal ? 'md:col-span-8' : 'md:col-span-12')}>
          <List<Product>
            data={restDeals ?? []}
            renderItem={renderItem}
            ListEmptyComponent={
              <div className="flex h-full items-center justify-center p-8">
                <p className="text-muted-foreground">No deals available</p>
              </div>
            }
            contentClassName={cn(
              'grid gap-4',
              topDeal
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' // 4 columns for 8 products
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' // 5 columns when no featured product
            )}
          />
        </div>
      </div>
    </Container>
  );
};

export default BestDeals;
