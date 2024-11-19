import { useRouter } from 'next/navigation';

import { useState } from 'react';

import List from '@/components/List';
import ProductCard from '@/features/products/components/ProductCard';
import { CategoryWithProducts } from '@/features/products/schemas/category';
import { Product } from '@/features/products/schemas/products';
import { cn } from '@/lib/utils';
import { ViewRow } from '@/types/supabase/table';

type Props = {
  activeManufacturer: string | null;
  manufacturers: ViewRow<'category_manufacturers'>[];
  category: CategoryWithProducts;
};

const CategoryProducts = ({ activeManufacturer, manufacturers, category }: Props) => {
  const [promotion, setPromotion] = useState(false);
  const router = useRouter();
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
      {category.products.map(product => {
        return (
          <div key={product.id}>
            {activeManufacturer === 'All Products'
              ? product.manufacturer
              : activeManufacturer === product.manufacturer && (
                  <List<Product>
                    data={category.products ?? []}
                    renderItem={renderItem}
                    ListEmptyComponent={
                      <div className="flex h-full items-center justify-center p-8">
                        <p className="text-muted-foreground">No Category available</p>
                      </div>
                    }
                    contentClassName={cn(
                      'grid gap-4',
                      promotion
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' // 4 columns for 8 products
                        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' // 5 columns when no featured product
                    )}
                  />
                )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryProducts;
