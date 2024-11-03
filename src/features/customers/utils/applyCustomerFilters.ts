/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { CustomerFilters } from '../hooks/customer-paginated-query';

export const applyCustomerFilters = (
  queries: PostgrestFilterBuilder<any, any, any>[],
  filters: CustomerFilters
) => {
  return queries.map(query => {
    let modifiedQuery = query;

    // Apply text search across specified fields
    if (filters?.search && filters?.search?.length > 0) {
      const searchFields = filters.searchFields || [];
      const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.search}%`);
      modifiedQuery = modifiedQuery.or(searchConditions.join(','));
    }

    // Apply boolean filters
    if (filters.approved !== undefined) {
      modifiedQuery = modifiedQuery.eq('approved', filters.approved);
    }

    if (filters.blocked !== undefined) {
      modifiedQuery = modifiedQuery.eq('blocked', filters.blocked);
    }

    // Apply category filter
    if (filters.customer_type) {
      modifiedQuery = modifiedQuery.eq('customer_type', filters.customer_type);
    }

    return modifiedQuery;
  });
};
