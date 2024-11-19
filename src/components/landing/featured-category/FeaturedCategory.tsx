'use client';
import { useState } from 'react';

import Container from '@/components/layout/Container';
import {
  useCategoryManufacturers,
  useFeaturedCategory,
} from '@/features/products/hooks/category-query-hooks';

import CategoryListHeader from './CategoryListHeader';
import CategoryProducts from './CategoryProducts';

const FeaturedCategory = () => {
  const { data: featuredCategory } = useFeaturedCategory();
  const [activeTabs, setActiveTabs] = useState<string | null>('All Products');
  const { data: manufacturers } = useCategoryManufacturers(featuredCategory?.id ?? '');

  if (!manufacturers) return null;

  if (!featuredCategory) return null;
  return (
    <Container>
      <CategoryListHeader
        category={featuredCategory}
        activeTabs={activeTabs}
        setActiveTabs={setActiveTabs}
        manufacturers={manufacturers}
      />
      <CategoryProducts
        manufacturers={manufacturers}
        category={featuredCategory}
        activeManufacturer={activeTabs}
      />
    </Container>
  );
};

export default FeaturedCategory;
