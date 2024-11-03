'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const getLatestOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order:order_id(*)')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching latest orders:', error);
    throw new Error('Failed to fetch latest orders');
  }
  return data;
};
