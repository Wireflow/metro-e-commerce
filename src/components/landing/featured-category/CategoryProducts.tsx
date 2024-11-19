import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import List from '@/components/List';
import ProductCard from '@/features/products/components/ProductCard';
import { useCategoryProducts } from '@/features/products/hooks/category-query-hooks';
import { CategoryWithProducts } from '@/features/products/schemas/category';
import { Product } from '@/features/products/schemas/products';
import { cn } from '@/lib/utils';

type Props = {
  activeTabs: string | null;
  category: CategoryWithProducts;
};

const CategoryProducts = ({ activeTabs, category }: Props) => {
  const [promotion] = useState(true);
  const [activeProducts, setActiveProducts] = useState<Product[]>(category.products.slice(0, 8));
  const { data: categoryProducts } = useCategoryProducts(activeTabs as string);
  const router = useRouter();

  useEffect(() => {
    if (activeTabs === 'All Products') {
      setActiveProducts(category.products.slice(0, 8));
    } else {
      setActiveProducts((categoryProducts?.products ?? []).slice(0, 8));
    }
  }, [setActiveProducts, categoryProducts, activeTabs, category.products]);

  const renderItem = (item: Product) => (
    <ProductCard
      key={item.id}
      className="group flex cursor-pointer flex-col gap-4 p-4 transition-all hover:shadow-lg"
      onClick={() => router.push(`/products/${item.id}`)}
    >
      <ProductCard.Image product={item} className="aspect-square w-full object-contain" />
      <div className="flex flex-col gap-1">
        <ProductCard.Title product={item} size="sm" className="line-clamp-2" />
        <ProductCard.Price product={item} />
      </div>
    </ProductCard>
  );

  return (
    <div>
      <List<Product>
        data={activeProducts}
        renderItem={renderItem}
        ListEmptyComponent={
          <div className="flex h-full items-center justify-center p-8">
            <p className="text-muted-foreground">No products available in this category</p>
          </div>
        }
        contentClassName={cn(
          'grid gap-4',
          promotion
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' // 4 columns for 8 products
            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' // 5 columns when no featured product
        )}
      />
    </div>
  );
};

export default CategoryProducts;
