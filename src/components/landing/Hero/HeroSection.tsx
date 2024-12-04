'use client';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import HeroProductPromoCards from '@/features/promotions/components/HeroProductPromoCards';
import { mockPromotedProducts } from '@/features/promotions/constants/promoted-products-fallback';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';

import HeroPromoCarousel from './HeroPromoCarousel';

const HeroSection = () => {
  const { data: promotions, isLoading: isLoadingPromotions } = usePromotedProducts([1, 2]);

  if (isLoadingPromotions) {
    return (
      <Container className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <Skeleton className="h-[340px] w-full min-w-[250px] flex-1" />
        <div className="flex w-full flex-col gap-4 xl:w-96">
          <Skeleton className="h-[162px] w-full" />
          <Skeleton className="h-[162px] w-full" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
      <HeroPromoCarousel />

      <div className="grid w-full grid-cols-1 gap-4 lg:w-[800px]">
        <HeroProductPromoCards promotions={promotions ?? mockPromotedProducts} />
      </div>
    </Container>
  );
};

export default HeroSection;
