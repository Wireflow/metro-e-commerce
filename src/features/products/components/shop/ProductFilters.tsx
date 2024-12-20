'use client';

import { Separator } from '@/components/ui/separator';

import { useCategories, usePopularManufacturers } from '../../hooks/category-query-hooks';
import CategoryFilter from './CategoryFilter';
import ManfacturersFilter from './ManfacturersFilter';
import PriceRangeFilter, { Range } from './PriceRangeFilter';

type ProductFiltersProps = {
  setSelectedManufacturers: (manufacturers: string[] | null) => void;
  setCategoryId: (categoryId: string | null) => void;
  setPriceRange: (priceRange: [number, number] | null) => void;
  categoryId: string;
  priceRange: number[];
  manfacturers: string[];
};

const ProductFilters = ({
  setSelectedManufacturers,
  setCategoryId,
  setPriceRange,
  categoryId,
  priceRange,
  manfacturers,
}: ProductFiltersProps) => {
  const { data: categories, isLoading } = useCategories();
  const { data: manufacturers, isLoading: isLoadingManufacturers } = usePopularManufacturers();

  const handlePriceRangeChange = (range: Range) => {
    setPriceRange(range);
  };

  const handleCategoryChange = (category: { id: string }) => {
    setCategoryId(category.id || null);
  };

  if (isLoading || isLoadingManufacturers) {
    return <div className="p-4">Loading filters...</div>;
  }

  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={categories || []}
        onSelect={handleCategoryChange}
        value={categoryId || undefined}
      />
      <Separator />
      <PriceRangeFilter
        onChange={r => {
          handlePriceRangeChange(r);
        }}
        defaultValue={(priceRange as Range) || [0, 0]}
      />
      <Separator />

      <ManfacturersFilter
        manufacturers={manufacturers || []}
        onSelect={setSelectedManufacturers}
        value={manfacturers}
      />
    </div>
  );
};

export default ProductFilters;
