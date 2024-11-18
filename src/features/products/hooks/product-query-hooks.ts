import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../queries/getProducts';
import { getPublishedProducts } from '../queries/getPublishedProducts';
import { getCategoryById } from '../server/categories/getCategoryById';
import { getProductsAnalytics } from '../server/products/getProductsAnalytics';

export interface ProductFilters {
  search?: string;
  searchFields?: ('name' | 'description' | 'manufacturer')[];
  inStock?: boolean;
  published?: boolean;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
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

export const usePublishedProducts = ({ filters = {}, enabled = true }: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', 'published', JSON.stringify(filters)],
    queryFn: () => getPublishedProducts(filters),
    enabled,
  });
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['products', 'analytics'],
    queryFn: () => getProductsAnalytics(),
  });
};

export const useCategoryById = (categoryId: string) => {
  return useQuery({
    queryKey: ['categories', categoryId],
    queryFn: () => getCategoryById(categoryId),
  });
};

// export const useProductById = (productId: string) => {
//   return useQuery({
//     queryKey: ['product', productId],
//     queryFn: () => getProductById(productId),
//   });
// };
