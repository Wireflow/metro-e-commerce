/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { OrdersFilters } from '../hooks/orders-query-hook';

export const applyOrdersFilters = (
  queries: PostgrestFilterBuilder<any, any, any>[],
  dirtyFilters: OrdersFilters
) => {
  // Clean the filters by removing undefined and 'undefined' string values
  const filters = Object.entries(dirtyFilters).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== 'undefined' && value !== '') {
      acc[key as keyof OrdersFilters] = value;
    }
    return acc;
  }, {} as OrdersFilters);

  return queries.map(query => {
    let modifiedQuery = query;

    // Apply text search across specified fields
    if (filters.search && filters.search.length > 0) {
      const searchFields = filters.searchFields || ['business_name'];
      const searchConditions = [];

      if (searchFields.includes('business_name')) {
        searchConditions.push(`business_name.ilike.%${filters.search}%`);
      }

      if (searchConditions.length > 0) {
        modifiedQuery = modifiedQuery.or(searchConditions.join(','));
      }
    }

    // Apply other filters only if they exist in the cleaned filters object
    if ('orderNumber' in filters) {
      modifiedQuery = modifiedQuery.eq('order_number', filters.orderNumber);
    }

    if ('customerId' in filters) {
      modifiedQuery = modifiedQuery.eq('customer_id', filters.customerId);
    }

    if ('minPrice' in filters) {
      modifiedQuery = modifiedQuery.gte('total_amount', filters.minPrice);
    }

    if ('maxPrice' in filters) {
      modifiedQuery = modifiedQuery.lte('total_amount', filters.maxPrice);
    }

    if ('orderType' in filters) {
      if (filters.orderType === 'return') {
        modifiedQuery = modifiedQuery.eq('order_category', 'return');
      } else {
        modifiedQuery = modifiedQuery.eq('type', filters.orderType);
      }
    }

    if ('status' in filters) {
      modifiedQuery = modifiedQuery.eq('status', filters.status);
    }

    if ('showFailed' in filters && filters.showFailed === false) {
      modifiedQuery = modifiedQuery.neq('status', 'created');
    }

    return modifiedQuery;
  });
};
