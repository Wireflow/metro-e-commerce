import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ProductListHeader = () => {
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';

  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-bold md:text-xl">Featured Products</p>
      <Link href={`/shop${isEdit ? '?edit=true' : ''}`}>
        <Button className="w-fit text-theme-sky-blue" variant={'link'}>
          Browse All Products <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default ProductListHeader;
