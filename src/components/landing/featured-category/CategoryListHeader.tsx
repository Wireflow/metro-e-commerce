import Link from 'next/link';

import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryWithProducts } from '@/features/products/schemas/category';

type Props = {
  activeTabs: string | null;
  setActiveTabs: Dispatch<SetStateAction<string | null>>;
  category: CategoryWithProducts;
};

const CategoryListHeader = ({ activeTabs, setActiveTabs, category }: Props) => {
  const [visibleTabs, setVisibleTabs] = useState(category.sub_categories.length);

  useEffect(() => {
    const updateVisibleTabs = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleTabs(category.sub_categories.length);
      } else if (width >= 1024) {
        setVisibleTabs(Math.min(4, category.sub_categories.length));
      } else if (width >= 768) {
        setVisibleTabs(Math.min(2, category.sub_categories.length));
      } else {
        setVisibleTabs(Math.min(1, category.sub_categories.length));
      }
    };

    updateVisibleTabs();
    window.addEventListener('resize', updateVisibleTabs);
    return () => window.removeEventListener('resize', updateVisibleTabs);
  }, [category.sub_categories.length]);

  const visibleSubcategories = category.sub_categories.slice(0, visibleTabs);
  const hiddenSubcategories = category.sub_categories.slice(visibleTabs);

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <h2 className="truncate text-xl font-semibold sm:text-2xl">{category?.name}</h2>
        <Link
          href="/products"
          className="items-center whitespace-nowrap text-sm text-primary transition-colors hover:text-primary/90 md:hidden"
        >
          Browse All Products <ArrowRight className="ml-2 inline-block h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="ghost"
          className={`min-w-fit whitespace-nowrap border-b-2 px-3 ${
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
            className={`min-w-fit whitespace-nowrap border-b-2 px-3 ${
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
                className="min-w-fit border-b-2 border-transparent px-2 text-gray-700"
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

        <Link
          href="/products"
          className="hidden items-center whitespace-nowrap text-sm text-primary transition-colors hover:text-primary/90 md:flex md:text-base"
        >
          Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryListHeader;
