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
          label={promotion.label ?? ''}
          className="flex-1"
          variant={index % 2 === 0 ? 'light' : 'dark'}
        >
          <div className="relative flex min-h-[200px] items-center justify-between p-4 sm:min-h-[210px] md:min-h-[230px] lg:min-h-[250px]">
            <div className="flex-1 pr-4">
              <PromoCard.Label />
              <PromoCard.Title className="text-md max-w-full truncate capitalize lg:text-xl 2xl:text-2xl" />
              <PromoCard.Description className="mb-4 max-w-full text-sm sm:text-sm 2xl:text-lg" />

              <PromoCard.Action className="mt-auto" />
            </div>
            <div className="relative aspect-square h-auto">
              <PromoCard.Image className="h-40 w-40 object-contain md:h-48 md:w-48 lg:h-56 lg:w-56" />
            </div>
          </div>
        </PromoCard>
      ))}
    </Container>
  );
};

export default DualPromotions;
