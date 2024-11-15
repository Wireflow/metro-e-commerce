'use server';

import { createClient } from '@/utils/supabase/server';

type Filters = {
  salespersonId?: string;
};

export const getOrders = async (filters?: Filters) => {
  const supabase = createClient();

  // Start the query
  let query = supabase.from('orders').select('*');

  if (filters?.salespersonId) {
    query = query.eq('salesperson_id', filters.salespersonId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to retrieve orders: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data;
};
