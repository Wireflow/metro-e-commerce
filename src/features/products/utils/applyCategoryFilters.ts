/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

import { CategoryFilters } from '../hooks/category-paginated-query';

export const applyCategoryFilters = (
  queries: PostgrestFilterBuilder<any, any, any>[],
  filters: CategoryFilters
) => {
  return queries.map(query => {
    let modifiedQuery = query;

    // Apply text search across specified fields
    if (filters?.search && filters?.search?.length > 0) {
      const searchFields = filters.searchFields || ['name', 'description'];
      const searchConditions = searchFields.map(field => `${field}.ilike.%${filters.search}%`);
      modifiedQuery = modifiedQuery.or(searchConditions.join(','));
    }

    return modifiedQuery;
  });
};
