import { X } from 'lucide-react';

import { formatCurrency } from '@/utils/utils';

import { useCategories } from '../../hooks/category-query-hooks';
import { useShopFilters } from '../../hooks/useShopFilters';

type Props = {
  resultsCount?: number;
};

const ShopActiveFilters = ({ resultsCount }: Props) => {
  const {
    filters,
    setCategoryId,
    setPriceRange,
    setSearchQuery,
    setSelectedManufacturers,
    setSortBy,
    clearFilters,
  } = useShopFilters();

  const { data: categories } = useCategories();

  const activeFilters = [
    ...(filters.category_id
      ? [
          {
            id: 'category',
            label: 'Category',
            value: categories?.find(c => c.id === filters.category_id)?.name ?? '',
            onRemove: () => setCategoryId(null),
          },
        ]
      : []),

    ...(filters.minPrice || filters.maxPrice
      ? [
          {
            id: 'price',
            label: 'Price',
            value: `${formatCurrency(filters.minPrice)} - ${formatCurrency(filters.maxPrice)}`,
            onRemove: () => setPriceRange(null),
          },
        ]
      : []),

    ...(filters.search
      ? [
          {
            id: 'search',
            label: 'Search',
            value: filters.search,
            onRemove: () => setSearchQuery(null),
          },
        ]
      : []),

    ...(filters.manufacturer_ids?.map(id => ({
      id: `manufacturer-${id}`,
      label: 'Manufacturer',
      value: id,
      onRemove: () => {
        const newManufacturers = filters.manufacturer_ids?.filter(m => m !== id) ?? [];
        setSelectedManufacturers(newManufacturers.length ? newManufacturers : null);
      },
    })) ?? []),

    ...(filters.sortBy && filters.sortBy !== 'created_at'
      ? [
          {
            id: 'sort',
            label: 'Sort',
            value: filters.sortBy === 'retail_price' ? 'Price' : 'Name',
            onRemove: () => setSortBy(null),
          },
        ]
      : []),
  ];

  return (
    <div className={'bg-gray-100 p-4'}>
      <div className="flex flex-wrap items-start justify-between md:items-center">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <p className="text-sm text-gray-600">Active filters:</p>
          {activeFilters.map(filter => (
            <button
              key={filter.id}
              onClick={filter.onRemove}
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1 text-sm text-black text-gray-700 transition-colors hover:bg-gray-200"
            >
              <span className="text-[13px] font-medium">{filter.label}:</span>
              <span className="max-w-[150px] truncate text-[13px]">{filter.value}</span>
              <X className="h-4 w-4" />
            </button>
          ))}

          {activeFilters.length > 1 && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1 text-[13px] text-sm text-gray-700 transition-colors hover:bg-gray-200"
            >
              <span className="text-[13px]">Clear all</span>
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          <span className="font-bold text-black">{resultsCount}</span> Results found
        </p>
      </div>
    </div>
  );
};

export default ShopActiveFilters;
