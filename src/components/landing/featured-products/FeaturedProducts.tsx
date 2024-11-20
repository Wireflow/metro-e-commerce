'use client';
import Container from '@/components/layout/Container';
import { useFeaturedProducts } from '@/features/products/hooks/product-query-hooks';

import ProductListHeader from './ProductListHeader';
import ProductsList from './ProductsList';

type Props = {};

const FeaturedProducts = (props: Props) => {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  return (
    <Container className="flex flex-col gap-5">
      <ProductListHeader />
      <ProductsList isLoading={isLoading} products={featuredProducts} />
    </Container>
  );
};

export default FeaturedProducts;
