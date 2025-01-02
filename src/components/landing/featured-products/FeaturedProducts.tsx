'use client';
import { useMemo } from 'react';

import Container from '@/components/layout/Container';
import { useFeaturedProducts } from '@/features/products/hooks/product-query-hooks';
import PromoCard from '@/features/promotions/components/PromoCard';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';

import ProductListHeader from './ProductListHeader';
import ProductsList from './ProductsList';

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  const { data: promotions } = usePromotedProducts([7]);

  const promotion = useMemo(() => {
    if (!promotions?.length || !promotions[0]?.product) {
      return null;
    }
    return promotions[0];
  }, [promotions]);

  if (!featuredProducts || !promotion) return null;

  return (
    <Container className="flex flex-col gap-8 lg:flex-row">
      <PromoCard
        product={promotion?.product}
        promotedProduct={promotion}
        className="hover:scale-102 md::w-[350px] transform bg-gray-200 transition-transform"
        label={promotion?.label ?? ''}
      >
        <div className="flex h-full flex-col items-center justify-between gap-5 p-4 sm:flex-row sm:justify-around md:flex-col md:justify-between lg:justify-center">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex flex-col items-center">
              <PromoCard.Label />
              <PromoCard.Title className="text-2xl font-bold" />
              <PromoCard.Description className="w-60 text-sm" />
            </div>

            {/* <div className="mt-4 flex items-center justify-center gap-2">
              <PromoCard.Price className="px-3 py-1.5 text-4xl font-black" suffix="USD" />
            </div> */}

            <PromoCard.Action />
          </div>

          <div className="">
            <PromoCard.Image className="h-[150px] w-[150px]" />
          </div>
        </div>
      </PromoCard>

      <div className="flex flex-1 flex-col gap-5">
        <ProductListHeader />
        <ProductsList isLoading={isLoading} products={featuredProducts} />
      </div>
    </Container>
  );
};

export default FeaturedProducts;
