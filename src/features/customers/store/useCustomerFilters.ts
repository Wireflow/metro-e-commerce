// stores/useProductFiltersStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CustomerFilters } from '../hooks/customer-paginated-query';

interface CustomerFiltersStore {
  filters: CustomerFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  setFilter: <K extends keyof CustomerFilters>(key: K, value: CustomerFilters[K]) => void;
  setPagination: (pagination: { page: number; pageSize: number }) => void;
  resetFilters: () => void;
}

const initialFilters: CustomerFilters = {
  search: '',
  searchFields: ['business_name', 'street', 'phone'],
  approved: undefined,
  blocked: undefined,
  customer_type: undefined,
  sortBy: 'created_at',
  sortOrder: 'desc',
};

export const useCustomerFiltersStore = create<CustomerFiltersStore>()(
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
    { name: 'CustomerFiltersStore' }
  )
);
