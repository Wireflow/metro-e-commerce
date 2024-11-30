'use client';

import { useRouter } from 'next/navigation';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useCategories,
  useCategoryFeaturedProducts,
  useCategoryManufacturers,
} from '@/features/products/hooks/category-query-hooks';
import { useIsMobile } from '@/hooks/use-mobile';

import AnimatedDiv from '../animation/AnimatedDiv';
import CategoryFeaturedProducts from './CategoryFeaturedProducts';

const CategoryMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isMobile = useIsMobile();

  const { data: categories } = useCategories();
  const { data: featuredProducts, isLoading: isLoadingProducts } = useCategoryFeaturedProducts(
    selectedCategory ?? ''
  );
  const { data: manufacturers, isLoading: isLoadingManufacturers } = useCategoryManufacturers(
    selectedCategory ?? ''
  );

  const handleCategoryClick = (categoryId: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMobile) {
      router.push(`/shop?category=${categoryId}`);
      return;
    }

    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="h-12 min-w-[200px] justify-between shadow-none hover:bg-theme-primary hover:text-white"
          >
            All Categories <ChevronDown size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="mt-2 min-w-[250px] rounded-[2px] p-0"
          sideOffset={1}
        >
          <div ref={menuRef} className="max-h-[600px] overflow-auto">
            {categories?.map((category, index) => (
              <div key={category.id} className="">
                <DropdownMenuItem
                  className={`flex w-full cursor-pointer items-center justify-between rounded-none p-3 py-2.5 hover:bg-gray-100 ${
                    selectedCategory === category.id ? 'bg-gray-100' : 'text-gray-500'
                  }`}
                  onClick={e => handleCategoryClick(category.id, index, e)}
                >
                  <span className="capitalize">{category.name}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </DropdownMenuItem>
                {selectedCategory === category.id && (
                  <div className="absolute left-full top-0 z-50 ml-4 mt-2">
                    <AnimatedDiv direction="right">
                      <div className="w-auto border bg-white shadow-lg">
                        <span className="hidden md:block">
                          <CategoryFeaturedProducts
                            category={category}
                            products={featuredProducts ?? []}
                            manufacturers={manufacturers ?? []}
                            loading={isLoadingProducts || isLoadingManufacturers}
                          />
                        </span>
                      </div>
                    </AnimatedDiv>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryMenu;
