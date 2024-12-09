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
  categoryId: string;
  categoryName: string;
  onClick?: () => void;
};

const CategoryLinkButton = ({ categoryId, categoryName, onClick }: CategoryLinkButtonProps) => {
  return (
    <Link href={`/shop?category=${categoryId}`} onClick={onClick}>
      <div className="group flex w-[150px] items-center justify-between rounded-[1px] p-1 px-2 hover:bg-gray-100">
        <p className="w-full truncate capitalize">{categoryName}</p>
        <ArrowTopRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
};

type Props = {
  parentCategory: ViewRow<'parent_categories'>;
  products: Product[];
  subCategories: Row<'categories'>[];
  loading: boolean;
  setOpen?: (open: boolean) => void;
};

const CategoryFeaturedProducts = ({
  products,
  parentCategory,
  loading,
  subCategories,
  setOpen,
}: Props) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="grid h-[440px] w-[640px] place-items-center">
        <AnimtedLoadingSpinner />
      </div>
    );
  }

  return (
    <AnimatedDiv className="p-6 pl-4">
      <div className="flex gap-12">
        <div className="flex flex-col gap-2">
          <CategoryLinkButton
            categoryId={parentCategory.id!}
            categoryName="all"
            onClick={() => setOpen?.(false)}
          />
          {subCategories &&
            subCategories?.map(m => (
              <CategoryLinkButton
                key={m.id}
                categoryId={m.id!}
                categoryName={m.name!}
                onClick={() => setOpen?.(false)}
              />
            ))}
        </div>
        <div>
          <h3 className="mb-6 text-lg font-semibold">
            FEATURED {parentCategory?.name!.toUpperCase()}
          </h3>
          <div className="space-y-4">
            {products &&
              products?.length > 0 &&
              products?.map(item => (
                <ProductCard
                  key={item.id}
                  className="flex cursor-pointer gap-4"
                  onClick={() => router.push(`/products/${item.id}`)}
                >
                  <ProductCard.Image
                    disableHoverEffect
                    disableSaleBadge
                    product={item}
                    className="h-[70px] w-[70px]"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="max-w-[calc(100%-20px)] truncate">
                      <ProductCard.Title product={item} />
                    </div>
                    <ProductCard.Price product={item} className="max-w-[150px]" />
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
