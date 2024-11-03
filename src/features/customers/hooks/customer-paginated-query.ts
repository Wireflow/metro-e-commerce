/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Enum } from '@/types/supabase/enum';
import { createClient } from '@/utils/supabase/client';

import { applyCustomerFilters } from '../utils/applyCustomerFilters';

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

export type CustomerSearchFields =
  | 'first_name'
  | 'last_name'
  | 'business_name'
  | 'phone'
  | 'tax_id'
  | 'tobacco_license'
  | 'email'
  | 'street'
  | 'zip_code'
  | 'city'
  | 'state';

export type CustomerSortFields =
  | 'approved'
  | 'blocked'
  | 'customer_type'
  | 'created_at'
  | 'updated_at';

export interface CustomerFilters {
  search?: string;
  searchFields?: CustomerSearchFields[];
  approved?: boolean;
  blocked?: string;
  customer_type?: Enum<'customer_type'>;
  sortBy?: CustomerSortFields;
  sortOrder?: 'asc' | 'desc';
}

export const usePaginatedCustomers = (
  filters: CustomerFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
) => {
  return useQuery({
    queryKey: ['customers', JSON.stringify(filters), pagination.page, pagination.pageSize],
    queryFn: () => getPaginatedCustomers(filters, pagination),
    enabled: true,
    placeholderData: keepPreviousData,
  });
};

export const getPaginatedCustomers = async (
  filters: CustomerFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
): Promise<PaginatedResponse<any>> => {
  const supabase = createClient();
  const { page = 1, pageSize = 10 } = pagination;

  let countQuery = supabase
    .from('customers_with_address')
    .select('*', { count: 'exact', head: true });

  let query = supabase.from('customers_with_address').select('*');

  [countQuery, query] = applyCustomerFilters([countQuery, query], filters);

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
    throw new Error(`Failed to retrieve customers: ${error.message}`);
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
