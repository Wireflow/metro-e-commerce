import { useRouter } from 'next/navigation';

import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';
import { cn } from '@/lib/utils';

type Props = {
  products: Product[];
  setOpen: (value: boolean) => void;
};

const ProductSearchResults = ({ products, setOpen }: Props) => {
  const router = useRouter();

  return (
    products &&
    products.length > 0 && (
      <div className="mt-1 flex flex-col">
        {products?.map((product, index) => (
          <ProductCard
            key={product.id}
            className={cn(
              'flex cursor-pointer gap-4 border-b-0 border-l-0 border-r-0 border-t-0 py-4 transition-colors duration-300 hover:bg-primary/5',
              {
                'border-b border-gray-200 pb-4': index !== products.length - 1,
              }
            )}
            onClick={() => {
              router.push(`/products/${product.id}`);
              setOpen(false);
            }}
          >
            <ProductCard.Image
              product={product}
              className="h-[70px] w-[70px] md:h-[100px] md:w-[100px]"
            />
            <div className="flex flex-col gap-1">
              <ProductCard.Title
                product={product}
                className="block max-w-[300px] overflow-hidden truncate md:max-w-[400px]"
              />
              <div className="w-fit">
                <ProductCard.Price product={product} />
              </div>
            </div>
          </ProductCard>
        ))}
      </div>
    )
  );
};

export default ProductSearchResults;
