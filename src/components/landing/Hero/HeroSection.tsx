'use client';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import HeroProductPromoCards from '@/features/promotions/components/HeroProductPromoCards';
import { mockCustomPromotion } from '@/features/promotions/constants/custom-promotion-fallback';
import { mockPromotedProducts } from '@/features/promotions/constants/promoted-products-fallback';
import { useCustomPromos } from '@/features/promotions/hooks/queries/useCustomPromos';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';

import HeroCard from './HeroCard';

const HeroSection = () => {
  const { data: promotions, isLoading: isLoadingPromotions } = usePromotedProducts([1, 2]);
  const { data: customPromos, isLoading: isLoadingCustomPromos } = useCustomPromos([1]);

  if (isLoadingPromotions || isLoadingCustomPromos) {
    return (
      <Container className="flex w-full flex-wrap gap-4 p-4 xl:flex-nowrap">
        <Skeleton className="h-[340px] w-full min-w-[250px] flex-1" />
        <div className="flex w-full flex-col gap-4 xl:w-96">
          <Skeleton className="h-[162px] w-full" />
          <Skeleton className="h-[162px] w-full" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex w-full flex-wrap gap-4 p-4 xl:flex-nowrap">
      <HeroCard
        promotion={customPromos && customPromos.length > 0 ? customPromos[0] : mockCustomPromotion}
      />

      <div className="grid w-full grid-cols-1 gap-4 lg:w-96">
        <HeroProductPromoCards promotions={promotions ?? mockPromotedProducts} />
      </div>
    </Container>
  );
};

export default HeroSection;
