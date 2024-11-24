'use client';

import { useEffect } from 'react';

import { Separator } from '@/components/ui/separator';

import { useCategories, useManufacturers } from '../../hooks/category-query-hooks';
import CategoryFilter from './CategoryFilter';
import ManfacturersFilter from './ManfacturersFilter';
import PriceRangeFilter, { Range } from './PriceRangeFilter';

type ProductFiltersProps = {
  setSelectedManufacturers: (manufacturers: string[] | null) => void;
  setCategoryId: (categoryId: string | null) => void;
  setPriceRange: (priceRange: Range | null) => void;
  selectedManufacturers: string[];
  categoryId: string;
  priceRange: number[];
};

const ProductFilters = ({
  setSelectedManufacturers,
  setCategoryId,
  setPriceRange,
  selectedManufacturers,
  categoryId,
  priceRange,
}: ProductFiltersProps) => {
  const { data: categories, isLoading } = useCategories();
  const { data: manufacturers, isLoading: isLoadingManufacturers } = useManufacturers();

  const handlePriceRangeChange = (range: Range) => {
    setPriceRange(range[0] === 0 && range[1] === 0 ? null : range);
  };

  const handleCategoryChange = (category: { id: string }) => {
    setCategoryId(category.id || null);
  };

  useEffect(() => {
    if (categoryId === '') {
      setCategoryId(null);
    }
    if (priceRange?.[0] === 0 && priceRange?.[1] === 0) {
      setPriceRange(null);
    }

    if (selectedManufacturers.length === 0) {
      setSelectedManufacturers(null);
    }
  }, [
    categoryId,
    priceRange,
    setCategoryId,
    setPriceRange,
    selectedManufacturers,
    setSelectedManufacturers,
  ]);

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
        onChange={handlePriceRangeChange}
        defaultValue={(priceRange as Range) || [0, 0]}
      />
      <Separator />

      <ManfacturersFilter manufacturers={manufacturers || []} onSelect={setSelectedManufacturers} />
    </div>
  );
};

export default ProductFilters;
