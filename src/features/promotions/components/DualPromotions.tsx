'use client';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';

import { usePromotedProducts } from '../hooks/queries/usePromotedProducts';
import PromoCard from './PromoCard';

const DualPromotions = () => {
  const { data: promotions, isLoading } = usePromotedProducts([4, 5]);

  if (isLoading) {
    return (
      <Container className="grid gap-8 md:grid-cols-2">
        <Skeleton className="h-[200px] w-full sm:h-[210px] md:h-[230px] lg:h-[250px]" />
        <Skeleton className="h-[200px] w-full sm:h-[210px] md:h-[230px] lg:h-[250px]" />
      </Container>
    );
  }

  return (
    <Container className="grid gap-8 md:grid-cols-2">
      {promotions?.map((promotion, index) => (
        <PromoCard
          key={promotion.id}
          product={promotion.product}
          promotedProduct={promotion}
          className="flex-1"
          variant={index % 2 === 0 ? 'light' : 'dark'}
        >
          <div className="flex items-center justify-between">
            <div>
              <PromoCard.Label />
              <PromoCard.Title className="max-w-[150px] truncate capitalize md:max-w-none" />
              <PromoCard.Description className="mb-4 max-w-[190px] truncate text-sm sm:text-base md:max-w-[400px]" />
              <PromoCard.Action />
            </div>
            <PromoCard.Image
              className="h-[150px] w-[150px] md:h-[200px] md:w-[200px]"
              object="contain"
            />
          </div>
        </PromoCard>
      ))}
    </Container>
  );
};

export default DualPromotions;
