'use client';
import { useMemo, useState } from 'react';

import Container from '@/components/layout/Container';
import WithAuth from '@/features/auth/components/WithAuth';
import { useFeaturedCategory } from '@/features/products/hooks/category-query-hooks';
import { useCategoryById } from '@/features/products/hooks/product-query-hooks';
import PromoCard from '@/features/promotions/components/PromoCard';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';

import CategoryListHeader from './CategoryListHeader';
import CategoryProducts from './CategoryProducts';

const FeaturedCategory = () => {
  const { data: featuredCategory } = useFeaturedCategory('46a4dbe6-4f4d-4ec6-bcc7-6f3e3672dc6c');
  const { data: categories, isLoading } = useCategoryById(featuredCategory?.id ?? '');
  const { data: promotions } = usePromotedProducts([6]);

  const [activeTabs, setActiveTabs] = useState<string | null>('All Products');

  const promotion = useMemo(() => {
    if (!promotions?.length || !promotions[0]?.product) {
      return null;
    }
    return promotions[0];
  }, [promotions]);

  if (!categories || !promotion || !featuredCategory) return null;

  return (
    <Container className="flex flex-col gap-5 lg:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        <CategoryListHeader
          category={featuredCategory}
          activeTabs={activeTabs}
          setActiveTabs={setActiveTabs}
        />
        <CategoryProducts
          products={featuredCategory.products ?? []}
          activeTabs={activeTabs}
          isLoading={isLoading}
        />
      </div>
      <div className="flex justify-center lg:block">
        <PromoCard
          product={promotion?.product}
          promotedProduct={promotion}
          className="flex h-full w-full flex-col justify-center bg-theme-yellow"
        >
          <div className="flex w-full flex-col items-center justify-between sm:justify-around md:flex-row lg:flex-col">
            <div className="flex justify-center md:block">
              <PromoCard.Image className="hidden h-[300px] w-[300px] md:block" />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <PromoCard.Label />
              <PromoCard.Title className="text-center text-2xl md:text-4xl xl:text-3xl" />
              <PromoCard.Description className="max-w-[300px]" />
              <WithAuth rules={{ customCheck: metadata => !!metadata?.approved }}>
                <div className="mt-3 flex items-center justify-center gap-1">
                  <p>Only for</p>
                  <PromoCard.Price
                    className="rounded-[2px] bg-white px-2 py-1 text-sm"
                    suffix="USD"
                  />
                </div>
              </WithAuth>
              <PromoCard.Action className="w-full" />
            </div>
          </div>
        </PromoCard>
      </div>
    </Container>
  );
};

export default FeaturedCategory;
