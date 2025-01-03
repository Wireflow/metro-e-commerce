import { ArrowRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryWithProducts } from '@/features/products/schemas/category';
import { getEditModeUrl } from '@/lib/editRouting';

type Props = {
  activeTabs: string | null;
  setActiveTabs: Dispatch<SetStateAction<string | null>>;
  category: CategoryWithProducts;
};

const CategoryListHeader = ({ activeTabs, setActiveTabs, category }: Props) => {
  const searchParams = useSearchParams();
  const [visibleTabs, setVisibleTabs] = useState(category.sub_categories.length);

  useEffect(() => {
    const updateVisibleTabs = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleTabs(Math.min(3, category.sub_categories.length));
      } else if (width >= 1024) {
        setVisibleTabs(Math.min(2, category.sub_categories.length));
      } else if (width >= 768) {
        setVisibleTabs(Math.min(2, category.sub_categories.length));
      } else {
        setVisibleTabs(Math.min(0, category.sub_categories.length));
      }
    };

    updateVisibleTabs();
    window.addEventListener('resize', updateVisibleTabs);
    return () => window.removeEventListener('resize', updateVisibleTabs);
  }, [category.sub_categories.length]);

  const visibleSubcategories = category.sub_categories.slice(0, visibleTabs);
  const hiddenSubcategories = category.sub_categories.slice(visibleTabs);

  return (
    <div className="flex w-full flex-col gap-4 md:justify-between xl:flex-row xl:items-center">
      <div className="">
        <p className="text-lg font-bold capitalize md:text-xl">{category?.name}</p>
      </div>

      <div className="flex items-center justify-between gap-1 lg:gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className={`min-w-fit whitespace-nowrap border-b-2 px-2 text-sm lg:px-3 lg:text-base ${
              activeTabs === 'All Products'
                ? 'border-primary text-gray-700'
                : 'border-transparent text-gray-700 hover:bg-primary hover:text-white'
            }`}
            onClick={() => setActiveTabs('All Products')}
          >
            All Products
          </Button>
          {visibleSubcategories.map(subcategory => (
            <Button
              key={subcategory.id}
              variant="ghost"
              className={`min-w-fit whitespace-nowrap border-b-2 px-2 text-sm lg:px-3 lg:text-base ${
                activeTabs === subcategory.id
                  ? 'border-primary hover:bg-gray-200 hover:text-black'
                  : 'border-transparent text-gray-700 hover:bg-primary hover:text-white'
              }`}
              onClick={() => setActiveTabs(subcategory.id)}
            >
              {subcategory.name}
            </Button>
          ))}
          {hiddenSubcategories.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="min-w-fit border-b-2 border-transparent px-1 text-gray-700 lg:px-2"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {hiddenSubcategories.map(subcategory => (
                  <DropdownMenuItem
                    key={subcategory.id}
                    onClick={() => setActiveTabs(subcategory.id)}
                  >
                    {subcategory.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <Link href={getEditModeUrl('/shop', searchParams)}>
          <Button className="w-fit text-theme-sky-blue" variant={'link'}>
            <span className="hidden sm:block">Browse All Products</span>{' '}
            <span className="block sm:hidden">Browse All</span> <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryListHeader;
