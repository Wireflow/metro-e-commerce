import { useCallback, useMemo } from 'react';

import {
  ArrayParser,
  NumberParser,
  StringParser,
  useParamState,
} from '../../../hooks/useParamState';

export type ShopFilters = {
  published: boolean;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  manufacturer_ids?: string[];
  search?: string;
  sortBy?: 'retail_price' | 'name' | 'created_at';
  sortOrder?: 'asc' | 'desc';
};

export type SelectOptions = {
  value: string;
  label: string;
};

export const useShopFilters = () => {
  // Use our custom hook for each parameter
  const [selectedManufacturers, setSelectedManufacturers] = useParamState({
    key: 'manufacturers',
    parser: ArrayParser(StringParser),
    defaultValue: [],
  });

  const [page, setPage] = useParamState({
    key: 'page',
    parser: NumberParser,
    defaultValue: 1,
  });

  const [pageSize, setPageSize] = useParamState({
    key: 'pageSize',
    parser: NumberParser,
    defaultValue: 24,
  });

  const [categoryId, setCategoryId] = useParamState({
    key: 'category',
    parser: StringParser,
    defaultValue: '',
  });

  const [priceRange, setPriceRange] = useParamState({
    key: 'price',
    parser: ArrayParser(NumberParser),
    defaultValue: [0, 0],
  });

  const [sortBy, setSortBy] = useParamState({
    key: 'sort',
    parser: StringParser,
    defaultValue: 'created_at',
  });

  const [searchQuery, setSearchQuery] = useParamState({
    key: 'search',
    parser: StringParser,
    defaultValue: '',
    cleanupDelay: 500,
  });

  const filters = useMemo(
    (): ShopFilters => ({
      published: true,
      category_id: categoryId || undefined,
      minPrice: priceRange[0] || undefined,
      maxPrice: priceRange[1] || undefined,
      manufacturer_ids: selectedManufacturers?.length ? selectedManufacturers : undefined,
      search: searchQuery || undefined,
      sortBy: (sortBy as 'retail_price' | 'name' | 'created_at') || undefined,
      sortOrder: sortBy === 'retail_price' ? 'desc' : 'asc',
    }),
    [categoryId, priceRange, selectedManufacturers, sortBy, searchQuery]
  );

  const clearFilters = useCallback(() => {
    setCategoryId(null);
    setPriceRange(null);
    setSearchQuery(null);
    setSelectedManufacturers(null);
    setSortBy(null);
  }, [setCategoryId, setPriceRange, setSearchQuery, setSelectedManufacturers, setSortBy]);

  const sortOptions = [
    { value: 'created_at', label: 'New Arrivals' },
    { value: 'retail_price', label: 'Price: Low to High' },
    { value: 'name', label: 'Name: A to Z' },
  ] as SelectOptions[];

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
    clearFilters,

    // Sort options
    sortOptions,
  };
};
