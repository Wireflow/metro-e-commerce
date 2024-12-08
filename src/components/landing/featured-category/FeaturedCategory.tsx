'use client';
import { Edit } from 'lucide-react';
import { useMemo, useState } from 'react';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import WithAuth from '@/features/auth/components/WithAuth';
import { useCategoryById } from '@/features/products/hooks/product-query-hooks';
import { usePromotedCategory } from '@/features/products/hooks/usePromotedCategory';
import PromoCard from '@/features/promotions/components/PromoCard';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';
import { useIsEditMode } from '@/features/promotions/hooks/useIsEditMode';

import CategoryListHeader from './CategoryListHeader';
import CategoryProducts from './CategoryProducts';
import EditPromotedCategoryForm from './EditPromotedCategoryForm';

const FeaturedCategory = () => {
  const [activeTabs, setActiveTabs] = useState<string | null>('All Products');

  const { data: featuredCategory, isLoading: isLoadingFeaturedCategory } = usePromotedCategory();
  const { data: categories, isLoading } = useCategoryById(featuredCategory?.id ?? '');
  const { data: promotions, isLoading: isLoadingPromotions } = usePromotedProducts([6]);

  const isInEditMode = useIsEditMode();

  const promotion = useMemo(() => {
    if (!promotions?.length || !promotions[0]?.product) {
      return null;
    }
    return promotions[0];
  }, [promotions]);

  if (isLoadingFeaturedCategory || isLoading || isLoadingPromotions) {
    return (
      <Container>
        <Skeleton className="h-[240px] w-full sm:h-[280px] md:h-[400px] lg:h-[500px]" />;
      </Container>
    );
  }

  if (!categories || !promotion || !featuredCategory) return null;

  return (
    <Container className="flex flex-col gap-5 lg:flex-row">
      <div className="relative flex flex-1 flex-col gap-5">
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
        {isInEditMode && (
          <WithAuth rules={{ requiredRole: 'admin' }}>
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 transition-opacity">
              <EditPromotedCategoryForm
                trigger={
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-fit gap-2"
                    onClick={() => {
                      // Handle edit action
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Promo
                  </Button>
                }
                promotedCategory={featuredCategory}
              />
            </div>
          </WithAuth>
        )}
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
