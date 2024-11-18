import { useRouter } from 'next/navigation';

import { Fragment } from 'react';

import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';
import { cn } from '@/lib/utils';

type Props = {
  products: Product[];
};

const ProductSearchResults = ({ products }: Props) => {
  const router = useRouter();

  return (
    products &&
    products.length > 0 && (
      <div className="mt-1 flex flex-col">
        {products?.map((product, index) => (
          <Fragment key={product.id}>
            <ProductCard
              className={cn(
                'flex cursor-pointer gap-4 border-b-0 border-l-0 border-r-0 border-t-0 py-4 transition-colors duration-300 hover:bg-primary/5',
                {
                  'border-b border-gray-200 pb-4': index !== products.length - 1,
                }
              )}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <ProductCard.Image product={product} className="h-[50px] w-[50px]" />
              <div className="flex flex-col gap-1">
                <ProductCard.Title product={product} />
                <ProductCard.Price product={product} />
              </div>
            </ProductCard>
          </Fragment>
        ))}
      </div>
    )
  );
};

export default ProductSearchResults;
