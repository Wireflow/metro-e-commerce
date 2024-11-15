'use server';

import { createClient } from '@/utils/supabase/server';

import { Order } from '../../schemas/orders';

type Filters = {
  salespersonId?: string;
  include: {
    customer: boolean;
    payment: boolean;
  };
};

export const getOrdersDetails = async (filters?: Filters): Promise<Order[] | void> => {
  const supabase = createClient();

  // Start building the query
  let query = supabase.from('orders_with_customer').select(buildSelectString(filters?.include));

  // Apply salesperson filter if provided
  if (filters?.salespersonId) {
    query = query.eq('salesperson_id', filters.salespersonId);
  }

  // Execute the query
  const { data, error } = await query.returns<Order[]>();

  if (error) {
    throw new Error(`Failed to retrieve orders: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  return data;
};

// Helper function to build the select string based on includes
function buildSelectString(include?: Filters['include']): string {
  const parts = ['*'];

  if (include?.customer) {
    parts.push('customer:customers(*)');
  }

  if (include?.payment) {
    parts.push('payment:order_payments(*)');
  }

  return parts.join(', ');
}
