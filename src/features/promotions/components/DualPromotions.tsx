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
    <Container className="grid gap-8 sm:grid-cols-2">
      {promotions?.map((promotion, index) => (
        <PromoCard
          key={promotion.id}
          product={promotion.product}
          promotedProduct={promotion}
          label={promotion.label ?? ''}
          className="flex-1"
          variant={index % 2 === 0 ? 'light' : 'dark'}
        >
          <div className="relative flex min-h-[200px] flex-col sm:min-h-[210px] md:min-h-[230px] lg:min-h-[250px] lg:p-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col justify-between xl:max-w-[60%]">
              <div className="space-y-2">
                <PromoCard.Label />
                <div className="w-full">
                  <PromoCard.Title className="block w-full max-w-full truncate text-2xl capitalize" />
                </div>
                <div className="w-full">
                  <PromoCard.Description className="block w-full text-sm sm:text-sm md:w-80 2xl:text-lg" />
                </div>
              </div>
              <PromoCard.Action className="mt-4" />
            </div>
            <div className="relative ml-4 flex justify-center">
              <PromoCard.Image className="w-full object-cover lg:h-56 lg:w-56" />
            </div>
          </div>
        </PromoCard>
      ))}
    </Container>
  );
};

export default DualPromotions;
