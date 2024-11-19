import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { CategoryWithProducts } from '@/features/products/schemas/category';
import { ViewRow } from '@/types/supabase/table';

type Props = {
  activeTabs: string | null;
  setActiveTabs: Dispatch<SetStateAction<string | null>>;
  manufacturers: ViewRow<'category_manufacturers'>[];
  category: CategoryWithProducts;
};

const CategoryListHeader = ({ activeTabs, setActiveTabs, manufacturers, category }: Props) => {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-2xl font-semibold">{category?.name}</p>
      <div className="flex items-center gap-5">
        <div className="flex items-center">
          <Button
            variant={'ghost'}
            className={`border-b-2 ${
              activeTabs === 'All Products' ? 'border-primary' : 'border-transparent'
            } text-gray-700 transition-colors hover:bg-primary hover:text-white`}
            onClick={() => setActiveTabs('All Products')}
          >
            All Products
          </Button>
          {/* {category?.map(manufacturer => (
            <Button
              variant={'ghost'}
              className={`border-b-2 ${
                activeManufacturer === manufacturer.manufacturer
                  ? 'border-primary hover:bg-gray-200 hover:text-black'
                  : 'border-transparent hover:bg-primary hover:text-white'
              } text-gray-700 transition-colors focus-visible:ring-0`}
              onClick={() => setActiveManufacturer(manufacturer.manufacturer)}
              key={manufacturer.category_id}
            >
              {manufacturer.manufacturer}
            </Button>
          ))} */}
        </div>
        <Link
          href={`/products?category=${category.id}`}
          className="flex items-center text-primary transition-colors hover:text-primary/90"
        >
          Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryListHeader;
