'use server';

import { createClient } from '@/utils/supabase/server';

export const getPayments = async (id: string) => {
  const supabase = createClient();

  // Start the query
  const query = supabase.from('order_payments').select('*').eq('id', id);

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to retrieve payments: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data;
};
