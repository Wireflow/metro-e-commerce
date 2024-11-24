import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useEffect, useMemo } from 'react';

import { SelectOptions } from '@/components/quick/Select';

export type ShopFilters = {
  published: boolean;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  manufacturer_ids?: string[];
  search?: string;
  sortBy?: 'retail_price' | 'name' | 'created_at';
};

export const useShopFilters = () => {
  const [selectedManufacturers, setSelectedManufacturers] = useQueryState<string[]>(
    'manufacturers',
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(12));

  const [categoryId, setCategoryId] = useQueryState('category', parseAsString.withDefault(''));

  const [priceRange, setPriceRange] = useQueryState<number[]>(
    'price',
    parseAsArrayOf(parseAsInteger.withDefault(0), ',').withDefault([0, 0])
  );

  const [sortBy, setSortBy] = useQueryState('sort', parseAsString.withDefault('created_at'));

  const [searchQuery, setSearchQuery] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      clearOnDefault: false,
    })
  );

  // Memoized filters object
  const filters = useMemo(
    (): ShopFilters => ({
      published: true,
      category_id: categoryId || undefined,
      minPrice: priceRange?.[0] || undefined,
      maxPrice: priceRange?.[1] || undefined,
      manufacturer_ids: selectedManufacturers?.length ? selectedManufacturers : undefined,
      search: searchQuery || undefined,
      sortBy: (sortBy as 'retail_price' | 'name' | 'created_at') || undefined,
    }),
    [categoryId, priceRange, selectedManufacturers, sortBy, searchQuery]
  );

  // Cleanup effect for non-search filters
  useEffect(() => {
    const cleanup = async () => {
      if (categoryId === '') {
        await setCategoryId(null);
      }

      if (priceRange?.[0] === 0 && priceRange?.[1] === 0) {
        await setPriceRange(null);
      }

      if (selectedManufacturers?.length === 0) {
        await setSelectedManufacturers(null);
      }

      if (sortBy === '') {
        await setSortBy(null);
      }
    };

    cleanup();
  }, [
    categoryId,
    priceRange,
    selectedManufacturers,
    setCategoryId,
    setPriceRange,
    setSelectedManufacturers,
    setSortBy,
    sortBy,
  ]);

  // Separate cleanup for search query
  useEffect(() => {
    if (searchQuery === '') {
      const timer = setTimeout(() => {
        setSearchQuery(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, setSearchQuery]);

  return {
    // Filter values
    filters,
    categoryId,
    priceRange,
    searchQuery,
    selectedManufacturers,
    sortBy,
    page,
    pageSize,

    // Setters
    setCategoryId,
    setPriceRange,
    setSearchQuery,
    setSelectedManufacturers,
    setSortBy,
    setPage,
    setPageSize,

    // Sort options (moved from component)
    sortOptions: [
      { value: 'created_at', label: 'New Arrivals' },
      { value: 'retail_price', label: 'Price: Low to High' },
      { value: 'name', label: 'Name: A to Z' },
    ] as SelectOptions[],
  };
};
