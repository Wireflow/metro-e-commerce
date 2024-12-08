import { useEffect, useState } from 'react';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import PublicProductList from '@/features/products/components/partials/PublicProductList';
import { useCategoryProducts } from '@/features/products/hooks/category-query-hooks';
import { Product } from '@/features/products/schemas/products';

type Props = {
  activeTabs: string | null;
  products: Product[];
  isLoading: boolean;
};

const CategoryProducts = ({ activeTabs, products, isLoading }: Props) => {
  const [activeProducts, setActiveProducts] = useState<Product[]>(products.slice(0, 8));

  const { data: categoryProducts } = useCategoryProducts(activeTabs as string);

  useEffect(() => {
    const currProducts =
      activeTabs === 'All Products' ? products : (categoryProducts?.products ?? []);

    setActiveProducts(currProducts);
  }, [categoryProducts, activeTabs, products]);

  if (isLoading) {
    return (
      <Container className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[300px] w-full rounded-[4px]" />
        ))}
      </Container>
    );
  }

  // Show different number of products based on screen size using CSS
  const productList = (
    <div className="grid gap-4">
      {/* Small screens - show all products */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {activeProducts.slice(0, 8).map(product => (
          <PublicProductList
            key={`small-${product.id}`}
            data={[product]}
            contentClassName="grid gap-4"
          />
        ))}
      </div>

      {/* Medium screens - show 6 products */}
      <div className="hidden grid-cols-3 gap-4 md:grid lg:hidden">
        {activeProducts.slice(0, 6).map(product => (
          <PublicProductList
            key={`medium-${product.id}`}
            data={[product]}
            contentClassName="grid gap-4"
          />
        ))}
      </div>

      {/* Large screens - show all products */}
      <div className="hidden grid-cols-4 gap-4 lg:grid">
        {activeProducts.slice(0, 8).map(product => (
          <PublicProductList
            key={`large-${product.id}`}
            data={[product]}
            contentClassName="grid gap-4"
          />
        ))}
      </div>
    </div>
  );

  return activeProducts.length > 0 ? (
    productList
  ) : (
    <div className="flex h-full items-center justify-center p-8">
      <p className="text-muted-foreground">No products available in this category</p>
    </div>
  );
};

export default CategoryProducts;
