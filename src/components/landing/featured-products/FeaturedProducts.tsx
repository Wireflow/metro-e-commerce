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
        <div className="flex h-full flex-col items-center justify-between gap-5 p-4 sm:flex-row sm:justify-around md:justify-between lg:flex-col lg:justify-center">
          <div className="flex flex-col items-center space-y-4 md:items-start lg:items-center">
            <div className="flex flex-col items-center md:items-start lg:items-center">
              <PromoCard.Label />
              <PromoCard.Title className="text-center font-bold sm:text-2xl md:text-start lg:text-center" />
              <PromoCard.Description className="w-80 text-wrap text-center text-sm md:w-60 md:text-start lg:w-[300px] lg:text-center" />
            </div>

            <PromoCard.Action />
          </div>

          <div className="">
            <PromoCard.Image className="h-[250px] w-[300px] lg:h-[150px] lg:w-[200px]" />
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
