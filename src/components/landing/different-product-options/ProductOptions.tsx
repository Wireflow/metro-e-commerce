'use client';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useProductBestSellers,
  useProductNewArrivals,
  useProductSales,
} from '@/features/products/hooks/product-query-hooks';

import ProductShowcaseList from './ProductShowcaseList';

const ProductOptions = () => {
  const { data: products, isLoading: isLoadingProducts } = useProductSales();
  const { data: bestSellers, isLoading: isLoadingBestSellers } = useProductBestSellers();
  const { data: newArrivals, isLoading: isLoadingNewArrivals } = useProductNewArrivals();

  if (isLoadingBestSellers || isLoadingProducts || isLoadingNewArrivals) {
    return (
      <Container className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="mb-4 h-[20px] w-[140px] rounded-[4px]" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[105px] w-full rounded-[4px]" />
              <Skeleton className="h-[105px] w-full rounded-[4px]" />
              <Skeleton className="h-[105px] w-full rounded-[4px]" />
            </div>
          </div>
        ))}
      </Container>
    );
  }

  return (
    <Container className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-2">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ProductShowcaseList data={products} title="Flash Sales" />
          <ProductShowcaseList data={bestSellers} title="Best Sellers" />
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-1">
        <ProductShowcaseList data={newArrivals} title="New Arrivals" />
      </div>
    </Container>
  );
};

export default ProductOptions;
