import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';

type Props = {
  data: Product[] | undefined;
};

const NewArrivals = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="">
      <p className="mb-3 text-lg font-semibold text-gray-900">New Arrivals</p>
      <div className="flex flex-col gap-3">
        {data?.map(product => {
          return (
            <ProductCard key={product.id} className="flex cursor-pointer gap-4">
              <ProductCard.Image product={product} />
              <div className="flex flex-col gap-1">
                <ProductCard.Title product={product} />
                <ProductCard.Price product={product} />
              </div>
            </ProductCard>
          );
        })}
      </div>
    </div>
  );
};

export default NewArrivals;
