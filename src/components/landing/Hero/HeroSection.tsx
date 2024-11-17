'use client';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { usePromotedProductById } from '@/features/products/hooks/promoted-products/usePromotedProductById';

import HeroCard from './HeroCard';
import PromoCard from './PromoCard';

const HeroSection = () => {
  const heroData = {
    label: 'THE BEST PRICES IN TOWN',
    title: 'Best Deals',
    description: 'Save up to 50% on select Xbox games.\nGet 3 months of PC Game Pass for $2 USD.',
    image: '/api/placeholder/500/400',
    imageAlt: 'Snickers chocolate bar box',
  };

  const { data: promotedProduct1, isLoading: isLoadingPromotedProduct1 } =
    usePromotedProductById(1);
  const { data: promotedProduct2, isLoading: isLoadingPromotedProduct2 } =
    usePromotedProductById(2);

  if (isLoadingPromotedProduct1 || isLoadingPromotedProduct2) {
    return (
      <Container className="flex flex-wrap gap-4">
        <Skeleton className="h-[272px] w-full min-w-[250px] flex-1" />
        <div className="flex min-w-[250px] flex-1 flex-col gap-4 md:max-w-80">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Container>
    );
  }

  console.log(promotedProduct1);

  return (
    <Container className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
      <HeroCard {...heroData} />

      <div className="flex w-full flex-col gap-4 xl:w-96">
        <PromoCard
          product={promotedProduct1?.product}
          label={
            promotedProduct2?.label ?? promotedProduct1?.product?.manufacturer ?? 'Summer Sales'
          }
          className="flex w-full justify-between gap-2"
          variant="dark"
        >
          <div className="flex flex-col">
            <PromoCard.Label />
            <PromoCard.Title />
            <PromoCard.Action />
          </div>
          <PromoCard.Discount />
          <PromoCard.Image />
        </PromoCard>
        <PromoCard
          product={promotedProduct2?.product}
          label={
            promotedProduct2?.label ?? promotedProduct1?.product?.manufacturer ?? 'Summer Sales'
          }
          className="flex w-full justify-between gap-2"
        >
          <div className="flex flex-col">
            <PromoCard.Label />
            <PromoCard.Title />
            <PromoCard.Action />
          </div>
          <PromoCard.Discount />
          <PromoCard.Image />
        </PromoCard>
      </div>
    </Container>
  );
};

export default HeroSection;
