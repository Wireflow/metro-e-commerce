'use client';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import HeroProductPromoCards from '@/features/promotions/components/HeroProductPromoCards';
import { mockCustomPromotion } from '@/features/promotions/constants/custom-promotion-fallback';
import { mockPromotedProducts } from '@/features/promotions/constants/promoted-products-fallback';
import { useCustomPromos } from '@/features/promotions/hooks/queries/useCustomPromos';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';

import HeroPromoCarousel from './HeroPromoCarousel';

const HeroSection = () => {
  const { data: promotions, isLoading: isLoadingPromotions } = usePromotedProducts([1, 2]);
  const { data: customPromos, isLoading: isLoadingCustomPromos } = useCustomPromos([1, 2, 3]);

  if (isLoadingPromotions) {
    return (
      <Container className="py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="md:col-span-2 lg:col-span-4">
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="flex flex-col gap-4 md:col-span-2">
            <Skeleton className="h-[192px] w-full" />
            <Skeleton className="h-[192px] w-full" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <div className="md:col-span-2 lg:col-span-4">
          <HeroPromoCarousel
            customPromos={
              customPromos ?? [mockCustomPromotion, mockCustomPromotion, mockCustomPromotion]
            }
            isLoading={isLoadingCustomPromos}
          />
        </div>
        <div className="flex w-full flex-col gap-4 md:col-span-2 md:flex-row lg:flex-col">
          <HeroProductPromoCards promotions={promotions ?? mockPromotedProducts} />
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
