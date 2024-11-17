import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';
import { Row, ViewRow } from '@/types/supabase/table';

import AnimatedDiv from '../animation/AnimatedDiv';
import AnimtedLoadingSpinner from '../animation/AnimtedLoader';

type Props = {
  category: Row<'categories'>;
  products: Product[];
  manufacturers: ViewRow<'category_manufacturers'>[];
  loading: boolean;
};

const MobileCategoryFeaturedProducts = ({ products, category, manufacturers, loading }: Props) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="grid h-48 place-items-center">
        <AnimtedLoadingSpinner />
      </div>
    );
  }

  return (
    <AnimatedDiv className="w-full pb-4">
      <div className="mb-4 border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <h3 className="text-sm font-medium text-gray-500">Manufacturers</h3>
          <Link
            href={`/shop?category=${category.id}&manufacturer=all`}
            className="text-xs text-blue-600"
          >
            View All
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
          {manufacturers.map(m => (
            <Link
              key={m.manufacturer}
              href={`/shop?category=${category.id}&manufacturer=${m.manufacturer}`}
            >
              <Badge variant="outline" className="whitespace-nowrap border-gray-200 capitalize">
                {m.manufacturer}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium capitalize">Featured {category.name}</h3>
          <Link
            href={`/shop?category=${category.id}`}
            className="flex items-center gap-1 text-xs text-blue-600"
          >
            View All
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-4">
          {products?.slice(0, 3).map(item => (
            <ProductCard
              key={item.id}
              className="flex cursor-pointer items-center gap-3 border p-2"
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <ProductCard.Image product={item} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <ProductCard.Title product={item} />
                <ProductCard.Price product={item} />
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default MobileCategoryFeaturedProducts;
