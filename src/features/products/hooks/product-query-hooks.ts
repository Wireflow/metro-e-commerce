import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../server/products/getProducts';
import { getProductsAnalytics } from '../server/products/getProductsAnalytics';

export interface ProductFilters {
  search?: string;
  searchFields?: ('name' | 'description' | 'manufacturer')[];
  inStock?: boolean;
  published?: boolean;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'retail_price' | 'name' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  is_discounted?: boolean;
}

interface UseProductsOptions {
  filters?: ProductFilters;
  enabled?: boolean;
}

export const useProducts = ({ filters = {}, enabled = true }: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(filters)],
    queryFn: () => getProducts(filters),
    enabled,
  });
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['products', 'analytics'],
    queryFn: () => getProductsAnalytics(),
  });
};
