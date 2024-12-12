import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/schemas/products';

type Props = {
  data: Product[] | undefined;
  title: string;
  href?: string;
};

const ProductShowcaseList = ({ data, title, href }: Props) => {
  const router = useRouter();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="p-0 hover:cursor-pointer" onClick={() => href && router.push(href)}>
      <div className="flex items-start justify-between gap-2">
        <p className="mb-3 text-lg font-semibold text-gray-900">{title}</p>
        {href && (
          <Link href={href}>
            <Button variant={'link'} className="px-0 text-xs">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-3 p-0">
        {data &&
          data.length > 0 &&
          data?.map(product => {
            return (
              <ProductCard
                key={product?.id}
                onClick={e => {
                  e.stopPropagation();
                  router.push(`/products/${product?.id}`);
                }}
                className="flex cursor-pointer items-center gap-4 overflow-hidden p-0"
              >
                <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden">
                  <ProductCard.Image
                    className="absolute inset-0 h-full w-full object-cover"
                    product={product}
                    disableHoverEffect
                    disableSaleBadge
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <ProductCard.Title
                    size="sm"
                    product={product}
                    className="max-w-[250px] text-wrap"
                  />
                  <ProductCard.Price product={product} className="w-fit" />
                  <ProductCard.AdminEditButton product={product} className="w-fi4 mr-2" size={'sm'}>
                    Edit Product
                  </ProductCard.AdminEditButton>
                </div>
              </ProductCard>
            );
          })}
      </div>
    </div>
  );
};

export default ProductShowcaseList;
