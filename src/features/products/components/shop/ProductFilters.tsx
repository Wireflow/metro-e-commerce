'use client';

import { Separator } from '@/components/ui/separator';

import { useCategories, usePopularManufacturers } from '../../hooks/category-query-hooks';
import ProductTypeFilter from '../ProductTypeFilter';
import CategoryFilter from './CategoryFilter';
import ManfacturersFilter from './ManfacturersFilter';
import PriceRangeFilter, { Range } from './PriceRangeFilter';

type ProductFiltersProps = {
  setSelectedManufacturers: (manufacturers: string[] | null) => void;
  setCategoryId: (categoryId: string | null) => void;
  setPriceRange: (priceRange: [number, number] | null) => void;
  setTobacco: (tobacco: boolean | null) => void;
  categoryId: string;
  priceRange: number[];
  manfacturers: string[];
  tobacco: boolean | null;
};

const ProductFilters = ({
  setSelectedManufacturers,
  setCategoryId,
  setPriceRange,
  setTobacco,
  categoryId,
  priceRange,
  tobacco,
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

  const handleTobaccoChange = (tobacco: boolean | null) => {
    setTobacco(tobacco);
  };

  if (isLoading || isLoadingManufacturers) {
    return <div className="p-4">Loading filters...</div>;
  }

  return (
    <div className="space-y-6">
      <ProductTypeFilter value={tobacco} onChange={handleTobaccoChange} />
      <Separator />
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
