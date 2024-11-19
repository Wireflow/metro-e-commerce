'use client';
import { useState } from 'react';

import Container from '@/components/layout/Container';
import { useFeaturedCategory } from '@/features/products/hooks/category-query-hooks';
import { useCategoryById } from '@/features/products/hooks/product-query-hooks';

import CategoryListHeader from './CategoryListHeader';
import CategoryProducts from './CategoryProducts';

const FeaturedCategory = () => {
  const { data: featuredCategory } = useFeaturedCategory();
  const [activeTabs, setActiveTabs] = useState<string | null>('All Products');
  const { data: categories } = useCategoryById(featuredCategory?.id ?? '');

  if (!categories) return null;

  if (!featuredCategory) return null;
  return (
    <Container className="flex flex-col gap-5">
      <CategoryListHeader
        category={featuredCategory}
        activeTabs={activeTabs}
        setActiveTabs={setActiveTabs}
      />
      <CategoryProducts category={featuredCategory} activeTabs={activeTabs} />
    </Container>
  );
};

export default FeaturedCategory;
