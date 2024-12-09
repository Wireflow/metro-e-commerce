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
      const searchFields = filters.searchFields || ['business_name'];
      const searchConditions = [];

      if (searchFields.includes('business_name')) {
        // For joined tables, we need to use the proper filter syntax
        searchConditions.push(`business_name.ilike.%${filters.search}%`);
      }

      // Apply all search conditions with OR
      if (searchConditions.length > 0) {
        modifiedQuery = modifiedQuery.or(searchConditions.join(','));
      }
    }
    if (filters.orderNumber !== undefined) {
      // For exact matches on order number
      modifiedQuery = modifiedQuery.eq('order_number', filters.orderNumber);
    }

    if (filters.customerId !== undefined) {
      modifiedQuery = modifiedQuery.eq('customer_id', filters.customerId);
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

    if (filters.showFailed === false) {
      modifiedQuery = modifiedQuery.neq('status', 'created');
    }

    return modifiedQuery;
  });
};
