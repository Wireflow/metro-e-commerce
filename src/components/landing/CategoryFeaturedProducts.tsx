'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';
import { Row, ViewRow } from '@/types/supabase/table';

import AnimatedDiv from '../animation/AnimatedDiv';
import AnimtedLoadingSpinner from '../animation/AnimtedLoader';

type CategoryLinkButtonProps = {
  category: string;
  manufacturer: string;
};

const CategoryLinkButton = ({ category, manufacturer }: CategoryLinkButtonProps) => {
  return (
    <Link href={`/shop?category=${category}&manufacturer=${manufacturer}`}>
      <div className="group flex w-[150px] items-center justify-between rounded-[1px] p-1 px-2 hover:bg-gray-100">
        <p className="w-full truncate capitalize">{manufacturer}</p>
        <ArrowTopRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
};

type Props = {
  category: Row<'categories'>;
  products: Product[];
  manufacturers: ViewRow<'category_manufacturers'>[];
  loading: boolean;
};

const CategoryFeaturedProducts = ({ products, category, manufacturers, loading }: Props) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="grid h-[440px] w-[640px] place-items-center">
        <AnimtedLoadingSpinner />
      </div>
    );
  }

  return (
    <AnimatedDiv className="h-[440px] w-[640px] p-6 pl-4">
      <div className="flex gap-12">
        <div className="flex flex-col justify-between">
          <CategoryLinkButton category={category.id} manufacturer="all" />
          {manufacturers.map(m => (
            <CategoryLinkButton
              key={m.manufacturer}
              category={category.id}
              manufacturer={m.manufacturer ?? ''}
            />
          ))}
        </div>
        <div>
          <h3 className="mb-6 text-lg font-semibold">FEATURED {category.name.toUpperCase()}</h3>
          <div className="space-y-4">
            {products?.map(item => (
              <ProductCard
                key={item.id}
                className="flex cursor-pointer gap-4"
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <ProductCard.Image product={item} />
                <div className="flex flex-col gap-1">
                  <ProductCard.Title product={item} />
                  <ProductCard.Price product={item} />
                </div>
              </ProductCard>
            ))}
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default CategoryFeaturedProducts;
