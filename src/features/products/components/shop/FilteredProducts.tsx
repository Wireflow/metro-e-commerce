import { Skeleton } from '@/components/ui/skeleton';

import { Product } from '../../schemas/products';
import PublicProductList from '../partials/PublicProductList';

type Props = {
  products: Product[];
  loading?: boolean;
};

const FilteredProducts = ({ products, loading }: Props) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <PublicProductList
        data={products ?? []}
        contentClassName="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      />
    </div>
  );
};

export default FilteredProducts;
