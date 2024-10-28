/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { ProductFilters } from '@/features/products/hooks/product-query-hooks';

export function isStringInArray(string: string, array: unknown[]) {
  return array.includes(string);
}

export const applyProductFilters = (
  queries: PostgrestFilterBuilder<any, any, any>[],
  filters: ProductFilters
) => {
  return queries.map(query => {
    let modifiedQuery = query;

    // Apply text search across specified fields
    if (filters?.search && filters?.search?.length > 0) {
      const searchFields = filters.searchFields || ['name', 'description', 'manufacturer'];
      const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.search}%`);
      modifiedQuery = modifiedQuery.or(searchConditions.join(','));
    }

    // Apply boolean filters
    if (filters.inStock !== undefined) {
      modifiedQuery = modifiedQuery.eq('in_stock', filters.inStock);
    }

    if (filters.published !== undefined) {
      modifiedQuery = modifiedQuery.eq('published', filters.published);
    }

    // Apply category filter
    if (filters.category_id) {
      modifiedQuery = modifiedQuery.eq('category_id', filters.category_id);
    }

    // Apply price range filters
    if (filters.minPrice !== undefined) {
      modifiedQuery = modifiedQuery.gte('retail_price', filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      modifiedQuery = modifiedQuery.lte('retail_price', filters.maxPrice);
    }

    return modifiedQuery;
  });
};
