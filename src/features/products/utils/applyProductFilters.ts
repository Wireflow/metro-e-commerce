/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { ProductFilters } from '@/features/products/hooks/product-query-hooks';
import { Enum } from '@/types/supabase/enum';

export const applyProductFilters = (
  queries: PostgrestFilterBuilder<any, any, any>[],
  filters: ProductFilters,
  customerType?: Enum<'customer_type'>
) => {
  return queries.map(query => {
    let modifiedQuery = query;

    // Apply text search across specified fields
    if (filters?.search && filters?.search?.length > 0) {
      const searchFields = filters.searchFields || ['name', 'description', 'manufacturer'];
      const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.search}%`);
      modifiedQuery = modifiedQuery.or(searchConditions.join(','));
    }

    if (filters?.manufacturers && filters?.manufacturers?.length > 0) {
      // Create an array of conditions for each manufacturer
      const manufacturerConditions = filters.manufacturers.map(
        manufacturer => `manufacturer.ilike.%${manufacturer}%`
      );
      modifiedQuery = modifiedQuery.or(manufacturerConditions.join(','));
    }

    // Apply boolean filters
    if (filters.inStock !== undefined) {
      modifiedQuery = modifiedQuery.eq('in_stock', filters.inStock);
    }

    if (filters.published !== undefined) {
      modifiedQuery = modifiedQuery.eq('published', filters.published);
    }

    // Apply category filter
    if (filters.category_id !== undefined) {
      modifiedQuery = modifiedQuery.eq('category_id', filters.category_id);
    }

    if (filters.is_discounted !== undefined) {
      modifiedQuery = modifiedQuery.gte('discounted_until', new Date().toISOString());
    }

    if (filters.is_tobacco !== undefined) {
      modifiedQuery = modifiedQuery.eq('is_tobacco', filters.is_tobacco);
    }

    // Apply price range filters
    if (filters.minPrice !== undefined) {
      if (customerType === 'wholesale') {
        modifiedQuery = modifiedQuery.gte('wholesale_price', filters.minPrice);
      } else {
        modifiedQuery = modifiedQuery.gte('retail_price', filters.minPrice);
      }
    }

    if (filters.maxPrice !== undefined) {
      if (customerType === 'wholesale') {
        modifiedQuery = modifiedQuery.lte('wholesale_price', filters.maxPrice);
      } else {
        modifiedQuery = modifiedQuery.lte('retail_price', filters.maxPrice);
      }
    }

    return modifiedQuery;
  });
};
