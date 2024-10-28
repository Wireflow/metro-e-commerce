// stores/useProductFiltersStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ProductFilters } from '../hooks/product-query-hooks';

interface ProductFiltersStore {
  filters: ProductFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  setPagination: (pagination: { page: number; pageSize: number }) => void;
  resetFilters: () => void;
}

const initialFilters: ProductFilters = {
  search: '',
  searchFields: ['name', 'description'],
  inStock: undefined,
  published: undefined,
  category_id: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: 'created_at',
  sortOrder: 'desc',
};

export const useProductFiltersStore = create<ProductFiltersStore>()(
  devtools(
    set => ({
      filters: initialFilters,
      pagination: {
        page: 1,
        pageSize: 10,
      },
      setPagination: pagination => set({ pagination }),
      setFilter: (key, value) =>
        set(
          state => ({
            filters: {
              ...state.filters,
              [key]: value,
            },
          }),
          false,
          'setFilter'
        ),
      resetFilters: () => set({ filters: initialFilters }, false, 'resetFilters'),
    }),
    { name: 'ProductFiltersStore' }
  )
);
