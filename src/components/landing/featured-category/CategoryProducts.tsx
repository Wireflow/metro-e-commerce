import { useEffect, useState } from 'react';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import PublicProductList from '@/features/products/components/partials/PublicProductList';
import { useCategoryProducts } from '@/features/products/hooks/category-query-hooks';
import { CategoryWithProducts } from '@/features/products/schemas/category';
import { Product } from '@/features/products/schemas/products';
import { cn } from '@/lib/utils';

type Props = {
  activeTabs: string | null;
  category: CategoryWithProducts;
  isLoading: boolean;
};

const CategoryProducts = ({ activeTabs, category, isLoading }: Props) => {
  const [activeProducts, setActiveProducts] = useState<Product[]>(category.products.slice(0, 8));
  const { data: categoryProducts } = useCategoryProducts(activeTabs as string);

  useEffect(() => {
    if (activeTabs === 'All Products') {
      setActiveProducts(category.products.slice(0, 8));
    } else {
      setActiveProducts((categoryProducts?.products ?? []).slice(0, 8));
    }
  }, [setActiveProducts, categoryProducts, activeTabs, category.products]);

  if (isLoading) {
    return (
      <Container className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[300px] w-full rounded-[4px]" />
        ))}
      </Container>
    );
  }

  return (
    <div>
      <PublicProductList
        data={activeProducts}
        ListEmptyComponent={
          <div className="flex h-full items-center justify-center p-8">
            <p className="text-muted-foreground">No products available in this category</p>
          </div>
        }
        contentClassName={cn(
          'grid gap-4',
          'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' // 5 columns when no featured product
        )}
      />
    </div>
  );
};

export default CategoryProducts;
