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
      const searchFields = filters.searchFields || ['order_number'];
      const searchConditions = [];

      if (searchFields.includes('customer.business_name')) {
        // For joined tables, we need to use the proper filter syntax
        searchConditions.push(`customers.business_name.ilike.%${filters.search}%`);
      }

      if (searchFields.includes('order_number')) {
        // For exact matches on order number
        searchConditions.push(`order_number.eq.${filters.search}`);
      }

      // Apply all search conditions with OR
      if (searchConditions.length > 0) {
        modifiedQuery = modifiedQuery.or(searchConditions.join(','));
      }
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
