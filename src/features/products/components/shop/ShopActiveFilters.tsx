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
    setTobacco,
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
            onRemove: () => setPriceRange([0, 0]),
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
            value:
              filters.sortBy === 'retail_price'
                ? 'Price'
                : filters.sortBy === 'discounted_until'
                  ? 'Discount: Low to High'
                  : filters.sortBy === 'sales'
                    ? 'Sales: High to Low'
                    : 'Name: A to Z',
            onRemove: () => setSortBy(null),
          },
        ]
      : []),
    ...(filters.is_tobacco !== undefined
      ? [
          {
            id: 'tobacco',
            label: 'Tobacco',
            value:
              filters.is_tobacco === true ? 'Yes' : filters.is_tobacco === false ? 'No' : 'All',
            onRemove: () => setTobacco(null),
          },
        ]
      : []),
  ];

  return (
    <div className={'bg-gray-100 p-4'}>
      <div className="flex flex-wrap items-start justify-between gap-2 md:items-center">
        <div className="flex flex-1 flex-col items-start gap-2 sm:flex-row sm:items-start">
          <p className="min-w-[100px] text-sm text-gray-600">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(filter => (
              <button
                key={filter.id}
                onClick={filter.onRemove}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
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
        </div>
        <p className="self-start text-sm text-gray-500">
          <span className="font-bold">{resultsCount}</span> Results found
        </p>
      </div>
    </div>
  );
};

export default ShopActiveFilters;
