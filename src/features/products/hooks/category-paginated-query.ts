/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { applyCategoryFilters } from '../utils/applyCategoryFilters';

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    total: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export const usePaginedCategories = (
  filters: CategoryFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
) => {
  return useQuery({
    queryKey: ['categories', JSON.stringify(filters), pagination.page, pagination.pageSize],
    queryFn: () => getPaginatedCategories(filters, pagination),
    enabled: true,
    placeholderData: keepPreviousData,
  });
};

export interface CategoryFilters {
  search?: string;
  searchFields?: ('name' | 'description')[];
  sortBy?: 'product_count' | 'name' | 'created_at' | 'sales';
  sortOrder?: 'asc' | 'desc';
}

export const getPaginatedCategories = async (
  filters: CategoryFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
): Promise<PaginatedResponse<any>> => {
  const supabase = createClient();
  const { page = 1, pageSize = 10 } = pagination;

  let countQuery = supabase
    .from('categories_sales_and_products_count')
    .select('*', { count: 'exact', head: true });

  let query = supabase.from('categories_sales_and_products_count').select('*');

  [countQuery, query] = applyCategoryFilters([countQuery, query], filters);

  const { count: total } = await countQuery;

  if (total === null) {
    throw new Error('Failed to get total count');
  }

  const offset = (page - 1) * pageSize;

  // Apply pagination and ordering
  query = query.range(offset, offset + pageSize - 1).order(filters.sortBy || 'created_at', {
    ascending: filters.sortOrder === 'asc',
  });

  // Execute the query
  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to retrieve categories: ${error.message}`);
  }

  // Calculate pagination metadata
  const totalPages = Math.ceil(total / pageSize);
  const hasMore = page < totalPages;

  return {
    data: data || [],
    metadata: {
      total,
      pageSize,
      currentPage: page,
      totalPages,
      hasMore,
    },
  };
};
