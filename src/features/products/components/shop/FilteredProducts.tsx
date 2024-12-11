import { PackageSearch, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useShopFilters } from '../../hooks/useShopFilters';
import { Product } from '../../schemas/products';
import PublicProductList from '../partials/PublicProductList';

const NoProducts = () => {
  const router = useRouter();
  const { clearFilters } = useShopFilters();
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
      <div className="relative mb-4">
        <PackageSearch className="h-12 w-12 text-gray-400" />
        <div className="absolute -right-1 -top-1 animate-spin">
          <RefreshCw className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        We couldn&apos;t find any products
      </h3>
      <p className="mb-6 max-w-md text-sm text-gray-500">
        We couldn&apos;t find any products matching your criteria. Try adjusting your filters or
        search terms.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="outline"
          onClick={() => router.refresh()}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Page
        </Button>
        <Button onClick={clearFilters} className="flex items-center gap-2">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

type Props = {
  products: Product[];
  loading?: boolean;
};

const FilteredProducts = ({ products, loading }: Props) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <PublicProductList
        data={products ?? []}
        contentClassName="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        ListEmptyComponent={<NoProducts />}
      />
    </div>
  );
};

export default FilteredProducts;
