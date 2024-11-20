'use client';
import { useMemo, useState } from 'react';

import CategoryProducts from '@/components/landing/featured-category/CategoryProducts';
import Container from '@/components/layout/Container';
import { useFeaturedCategory } from '@/features/products/hooks/category-query-hooks';
import { useCategoryById } from '@/features/products/hooks/product-query-hooks';
import PromoCard from '@/features/promotions/components/PromoCard';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';

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
    <Container className="flex gap-5">
      <div className="flex flex-1 flex-col gap-5">
        <CategoryProducts
          category={featuredCategory}
          activeTabs={activeTabs}
          isLoading={isLoading}
        />
      </div>
      <PromoCard
        product={promotion?.product}
        promotedProduct={promotion}
        className="grid min-w-[300px] place-items-center bg-theme-yellow"
      >
        <div className="flex flex-col items-center">
          <PromoCard.Image />
          <PromoCard.Label />
          <PromoCard.Title />
          <PromoCard.Description />
          <div className="mt-3 flex items-center justify-center gap-1">
            <p>Only for</p>
            <PromoCard.Price className="rounded-[2px] bg-white px-2 py-1 text-sm" suffix="USD" />
          </div>
          <PromoCard.Action className="w-full" />
        </div>
      </PromoCard>
    </Container>
  );
};

export default FeaturedCategory;
