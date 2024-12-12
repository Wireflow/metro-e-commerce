/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { Product } from '../schemas/products';
import { applyProductFilters } from '../utils/applyProductFilters';
import { ProductFilters } from './product-query-hooks';

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

export const usePaginatedProducts = (
  filters: ProductFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(filters), pagination.page, pagination.pageSize],
    queryFn: () => getPaginatedProducts(filters, pagination),
    enabled: enabled,
    placeholderData: keepPreviousData,
  });
};

export const getPaginatedProducts = async (
  filters: ProductFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
): Promise<PaginatedResponse<Product>> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { page = 1, pageSize = 10 } = pagination;

  let countQuery = supabase.from('products').select('id', { count: 'exact', head: true });

  // Base query
  let query = supabase.from('products').select(`
      *,
      images:product_images(*),
      barcodes:barcodes(*),
      sales:lifetime_product_sales!inner(sales)
    `);

  // Apply filters
  [countQuery, query] = applyProductFilters(
    [countQuery, query],
    filters,
    user?.user_metadata?.customer_type
  );

  // Get total count
  const { count: total } = await countQuery;

  if (total === null) {
    throw new Error('Failed to get total count');
  }

  const offset = (page - 1) * pageSize;

  // Apply sorting
  if (filters.sortBy === 'retail_price') {
    if (user?.user_metadata?.customer_type === 'wholesale') {
      query = query.order('wholesale_price', { ascending: filters.sortOrder === 'asc' });
    } else {
      query = query.order('retail_price', { ascending: filters.sortOrder === 'asc' });
    }
  } else if (filters.sortBy === 'discounted_until') {
    query = query
      .gte('discounted_until', new Date().toISOString())
      .order('discounted_until', { ascending: true });
  } else if (filters.sortBy === 'sales') {
    query = query.order('sales', { ascending: true, referencedTable: 'lifetime_product_sales' });
  } else {
    query = query.order(filters.sortBy || 'created_at', {
      ascending: filters.sortOrder === 'asc',
    });
  }

  // Apply pagination after sorting
  query = query.range(offset, offset + pageSize - 1);

  // Execute the query
  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to retrieve products: ${error.message}`);
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
