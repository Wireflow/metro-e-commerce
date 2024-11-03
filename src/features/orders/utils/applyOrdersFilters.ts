/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { OrdersFilters } from '../hooks/orders-query-hook';

export const applyOrdersFilters = (
  queries: PostgrestFilterBuilder<any, any, any>[],
  filters: OrdersFilters
) => {
  return queries.map(query => {
    let modifiedQuery = query;

    // Apply text search across specified fields
    if (filters?.search && filters?.search?.length > 0) {
      const searchFields = filters.searchFields || ['customer_name', 'order_number'];
      const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.search}%`);
      modifiedQuery = modifiedQuery.or(searchConditions.join(','));
    }

    // Apply price range filters
    if (filters.minPrice !== undefined) {
      modifiedQuery = modifiedQuery.gte('total_amount', filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      modifiedQuery = modifiedQuery.lte('total_amount', filters.maxPrice);
    }

    if (filters.status !== undefined) {
      modifiedQuery = modifiedQuery.eq('status', filters.status);
    }

    return modifiedQuery;
  });
};
