import { useRouter } from 'next/navigation';

import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';

type Props = {
  data: Product[] | undefined;
  title: string;
};

const ProductShowcaseList = ({ data, title }: Props) => {
  const router = useRouter();
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="p-0 md:col-span-2 lg:col-span-1">
      <p className="mb-3 text-lg font-semibold text-gray-900">{title}</p>
      <div className="flex flex-col gap-3 p-0">
        {data?.map(product => {
          return (
            <ProductCard
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)}
              className="flex h-24 cursor-pointer items-center gap-4 p-0"
            >
              <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden">
                <ProductCard.Image
                  className="absolute inset-0 h-full w-full object-cover"
                  product={product}
                  disableHoverEffect
                  disableSaleBadge
                />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <ProductCard.Title size="sm" product={product} />

                <ProductCard.Price product={product} className="w-fit" />
              </div>
            </ProductCard>
          );
        })}
      </div>
    </div>
  );
};

export default ProductShowcaseList;
