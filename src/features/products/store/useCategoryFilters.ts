// stores/useProductFiltersStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CategoryFilters } from '../hooks/category-paginated-query';

interface CategoryFiltersStore {
  filters: CategoryFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  setFilter: (key: keyof CategoryFilters, value: CategoryFilters[keyof CategoryFilters]) => void;
  updateFilters: (updates: Partial<CategoryFilters>) => void;
  setPagination: (pagination: { page: number; pageSize: number }) => void;
  resetFilters: () => void;
}

const initialFilters: CategoryFilters = {
  search: '',
  searchFields: ['name', 'description'],
  sortBy: 'created_at',
  sortOrder: 'desc',
};

export const useCategoryFiltersStore = create<CategoryFiltersStore>()(
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
      updateFilters: updates =>
        set(
          state => ({
            filters: {
              ...state.filters,
              ...updates,
            },
          }),
          false,
          'updateFilters'
        ),
      resetFilters: () => set({ filters: initialFilters }, false, 'resetFilters'),
    }),
    { name: 'CategoryFiltersStore' }
  )
);
