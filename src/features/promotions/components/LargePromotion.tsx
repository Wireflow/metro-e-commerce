'use client';

import { useMemo } from 'react';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import WithAuth from '@/features/auth/components/WithAuth';

import { usePromotedProducts } from '../hooks/queries/usePromotedProducts';
import PromoCard from './PromoCard';

const LargePromotion = () => {
  const { data: promotions, isLoading, error } = usePromotedProducts([3]);

  const promotion = useMemo(() => {
    if (!promotions?.length || !promotions[0]?.product) {
      return null;
    }
    return promotions[0];
  }, [promotions]);

  if (!promotion) {
    return null;
  }

  if (isLoading) {
    return (
      <Container>
        <Skeleton className="h-[250px] w-full sm:h-[280px] md:h-[300px] lg:h-[340px]" />
      </Container>
    );
  }

  return (
    <Container>
      <PromoCard
        product={promotion.product}
        promotedProduct={promotion}
        className="w-full bg-theme-beige px-4 py-8 sm:px-8 md:px-12 lg:px-24"
        label={promotion.label ?? 'Promotion'}
      >
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <PromoCard.Label />
            <PromoCard.Title className="mb-3 text-lg uppercase sm:text-xl md:mb-4 md:text-2xl lg:text-4xl" />
            <PromoCard.Description className="mb-4 max-w-[400px] text-sm sm:text-base" />
            <PromoCard.Action />
          </div>

          <div className="relative md:mt-0">
            <WithAuth>
              <PromoCard.Price className="absolute left-4 top-10 z-20 flex h-16 w-16 items-center justify-center gap-1 rounded-full border-4 border-white bg-theme-beige-700 text-sm text-white shadow-md sm:h-20 sm:w-20 sm:text-base" />
            </WithAuth>
            <PromoCard.Image
              className="h-[250px] w-[300px] object-contain sm:h-[250px] sm:w-[340px] md:h-[280px] md:w-[360px] lg:h-[310px] lg:w-[400px]"
              object="contain"
            />
          </div>
        </div>
      </PromoCard>
    </Container>
  );
};

export default LargePromotion;
