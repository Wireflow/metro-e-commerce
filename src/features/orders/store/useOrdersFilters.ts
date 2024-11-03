// stores/useProductFiltersStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { OrdersFilters } from '../hooks/orders-query-hook';

interface OrdersFiltersStore {
  filters: OrdersFilters;
  pagination: {
    page: number;
    pageSize: number;
  };
  setFilter: <K extends keyof OrdersFilters>(key: K, value: OrdersFilters[K]) => void;
  setPagination: (pagination: { page: number; pageSize: number }) => void;
  resetFilters: () => void;
}

const initialFilters: OrdersFilters = {
  search: '',
  searchFields: ['customer.business_name', 'order_number'],
  sortBy: 'created_at',
  sortOrder: 'desc',
};

export const useOrdersFiltersStore = create<OrdersFiltersStore>()(
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
    { name: 'OrdersFiltersStore' }
  )
);
