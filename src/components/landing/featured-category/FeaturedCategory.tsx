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
  const [activeManufacturer, setActiveManufacturer] = useState<string | null>('All Products');
  const { data: manufacturers } = useCategoryManufacturers(featuredCategory?.id ?? '');

  if (!manufacturers) return null;

  if (!featuredCategory) return null;
  return (
    <Container>
      <CategoryListHeader
        category={featuredCategory}
        activeManufacturer={activeManufacturer}
        setActiveManufacturer={setActiveManufacturer}
        manufacturers={manufacturers}
      />
      <CategoryProducts
        manufacturers={manufacturers}
        category={featuredCategory}
        activeManufacturer={activeManufacturer}
      />
    </Container>
  );
};

export default FeaturedCategory;
