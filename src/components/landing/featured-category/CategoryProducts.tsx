import ProductCard from '@/features/products/components/ProductCard';
import { CategoryWithProducts } from '@/features/products/schemas/category';
import { ViewRow } from '@/types/supabase/table';

type Props = {
  activeManufacturer: string | null;
  manufacturers: ViewRow<'category_manufacturers'>[];
  category: CategoryWithProducts;
};

const CategoryProducts = ({ activeManufacturer, manufacturers, category }: Props) => {
  return (
    <div>
      {category.products.map(product => {
        return (
          <div key={product.id}>
            {activeManufacturer === 'All Products'
              ? product.manufacturer
              : activeManufacturer === product.manufacturer && (
                  <ProductCard key={product.id} className="flex cursor-pointer gap-4">
                    <ProductCard.Image product={product} />
                    <div className="flex flex-col gap-1">
                      <ProductCard.Title product={product} />
                      <ProductCard.Price product={product} />
                    </div>
                  </ProductCard>
                )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryProducts;
