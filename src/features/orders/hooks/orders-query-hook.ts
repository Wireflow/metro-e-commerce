import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

import { Order } from '../schemas/orders';
import { getOrderById } from '../server/orders/getOrderById';
import { getOrders } from '../server/orders/getOrders';
import { applyOrdersFilters } from '../utils/applyOrdersFilters';

export const useOrders = ({ enabled = true }) => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    enabled,
  });
};

export interface OrdersFilters {
  search?: string;
  searchFields?: 'business_name'[];
  orderNumber?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'order_number' | 'total_amount' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  status?: 'pending' | 'cancelled' | 'completed' | 'refunded' | 'confirmed' | 'preparing';
  customerId?: string;
  showFailed?: boolean;
}

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

export const usePaginatedOrders = (
  filters: OrdersFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['orders', JSON.stringify(filters), pagination.page, pagination.pageSize],
    queryFn: () => getPaginatedOrders(filters, pagination),
    enabled,
    placeholderData: keepPreviousData,
    retry: false,
  });
};

export const getPaginatedOrders = async (
  filters: OrdersFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<PaginatedResponse<Order>> => {
  const supabase = createClient();
  const { page = 1, pageSize = 10 } = pagination;

  let countQuery = supabase
    .from('orders_with_customer')
    .select('*', { count: 'exact', head: true });

  let query = supabase.from('orders_with_customer').select(`
      *, 
      customer:customers(*), 
      payment:order_payments(*),
      salesperson:users(*)
    `);

  [countQuery, query] = applyOrdersFilters([countQuery, query], filters);

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
    throw new Error(`Failed to retrieve orders: ${error.message}`);
  }

  // Calculate pagination metadata
  const totalPages = Math.ceil(total / pageSize);
  const hasMore = page < totalPages;

  return {
    data: (data as Order[]) || [],
    metadata: {
      total,
      pageSize,
      currentPage: page,
      totalPages,
      hasMore,
    },
  };
};

export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
  });
};
