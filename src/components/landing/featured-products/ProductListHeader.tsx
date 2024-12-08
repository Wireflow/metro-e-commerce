import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getEditModeUrl } from '@/lib/editRouting';

const ProductListHeader = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-bold md:text-xl">Featured Products</p>
      <Link href={getEditModeUrl('/shop', searchParams)}>
        <Button className="w-fit text-theme-sky-blue" variant={'link'}>
          <span className="hidden sm:block">Browse All Products</span>{' '}
          <span className="block sm:hidden">All</span>
          <ArrowRight className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
};

export default ProductListHeader;
