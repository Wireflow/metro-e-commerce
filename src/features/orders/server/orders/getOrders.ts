'use server';

import { createClient } from '@/utils/supabase/server';

export const getOrders = async () => {
  const supabase = createClient();

  // Start the query
  const query = supabase.from('orders').select('*');

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to retrieve orders: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data;
};
