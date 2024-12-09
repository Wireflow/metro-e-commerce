import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useCallback, useMemo, useRef } from 'react';

export type ShopFilters = {
  published: boolean;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  manufacturer_ids?: string[];
  search?: string;
  sortBy?: 'retail_price' | 'name' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  manufacturers?: string[];
};

export type SelectOptions = {
  value: string;
  label: string;
};

export const useShopFilters = () => {
  // Debounce timer ref
  const priceDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Manufacturers
  const [selectedManufacturers, setSelectedManufacturers] = useQueryState(
    'manufacturers',
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // Pagination
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(24));

  // Category
  const [categoryId, setCategoryId] = useQueryState('category', parseAsString.withDefault(''));

  // Price Range with debounce
  const priceRangeParser = parseAsArrayOf(parseAsInteger).withDefault([0, 0]);
  const [priceRange, setPriceRangeImmediate] = useQueryState('price', priceRangeParser);

  // Debounced price range setter
  const setPriceRange = useCallback(
    (newPrice: [number, number] | null) => {
      if (priceDebounceTimer.current) {
        clearTimeout(priceDebounceTimer.current);
      }

      priceDebounceTimer.current = setTimeout(() => {
        setPriceRangeImmediate(newPrice);
      }, 300);
    },
    [setPriceRangeImmediate]
  );

  // Sort
  const [sortBy, setSortBy] = useQueryState('sort', parseAsString.withDefault('created_at'));

  // Search with debounce
  const [searchQuery, setSearchQuery] = useQueryState('search', parseAsString.withDefault(''));

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
      manufacturers: selectedManufacturers?.length ? selectedManufacturers : undefined,
    }),
    [categoryId, priceRange, selectedManufacturers, sortBy, searchQuery]
  );

  const clearFilters = useCallback(async () => {
    // Clear the debounce timer if it exists
    if (priceDebounceTimer.current) {
      clearTimeout(priceDebounceTimer.current);
    }

    await Promise.all([
      setCategoryId(null),
      setPriceRangeImmediate([0, 0]), // Use immediate setter for clearing
      setSearchQuery(null),
      setSelectedManufacturers(null),
      setSortBy('created_at'),
      setPage(1),
    ]);
  }, [
    setCategoryId,
    setPriceRangeImmediate,
    setSearchQuery,
    setSelectedManufacturers,
    setSortBy,
    setPage,
  ]);

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
    setPriceRange, // This is now the debounced version
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
