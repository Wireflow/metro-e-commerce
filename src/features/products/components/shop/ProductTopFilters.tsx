'use client';

import { Filter } from 'lucide-react';

import DebouncedSearchInput from '@/components/form/SearchInput';
import QuickSelect, { SelectOptions } from '@/components/quick/Select';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

import { useShopFilters } from '../../hooks/useShopFilters';
import ProductFilters from './ProductFilters';

type ProductTopFiltersProps = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  setSortBy: (sortBy: string) => void;
  sortBy: string;
  sortOptions: SelectOptions[];
};

const ProductTopFilters = ({
  setSearchQuery,
  searchQuery,
  setSortBy,
  sortBy,
  sortOptions,
}: ProductTopFiltersProps) => {
  const isMobile = useIsMobile();

  const {
    setCategoryId,
    setPriceRange,
    setSelectedManufacturers,
    categoryId,
    priceRange,
    selectedManufacturers,
  } = useShopFilters();

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="max-w-[400px] flex-1">
        <DebouncedSearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="flex w-full gap-2 md:max-w-[200px]">
        <QuickSelect
          options={sortOptions}
          onValueChange={option => setSortBy(option ?? '')}
          value={sortBy}
        />
        {isMobile && (
          <Sheet>
            <SheetTrigger>
              <Button>
                Filters <Filter className="h-4 w-4 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll">
              <ProductFilters
                setSelectedManufacturers={setSelectedManufacturers}
                setCategoryId={setCategoryId}
                setPriceRange={setPriceRange}
                categoryId={categoryId}
                priceRange={priceRange}
                manfacturers={selectedManufacturers}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
};

export default ProductTopFilters;
