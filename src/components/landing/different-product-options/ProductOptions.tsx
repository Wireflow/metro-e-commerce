'use client';
import Container from '@/components/layout/Container';
import {
  useProductBestSellers,
  useProductNewArrivals,
  useProductSales,
} from '@/features/products/hooks/product-query-hooks';

import BestSellers from './BestSellers';
import FlashSales from './FlashSales';
import NewArrivals from './NewArrivals';

type Props = {};

const ProductOptions = (props: Props) => {
  const { data: products } = useProductSales();
  const { data: bestSellers } = useProductBestSellers();
  const { data: newArrivals } = useProductNewArrivals();

  return (
    <Container className="grid grid-cols-3 gap-5">
      <FlashSales data={products} />
      <BestSellers data={bestSellers} />
      <NewArrivals data={newArrivals} />
    </Container>
  );
};

export default ProductOptions;
