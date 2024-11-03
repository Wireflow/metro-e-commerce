'use server';

import { Order } from '@/features/orders/schemas/orders';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const getLatestOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, customer:customers(*), payment:order_payments(*)')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching latest orders:', error);
    throw new Error('Failed to fetch latest orders');
  }

  if (!data) {
    throw new Error('Failed to fetch latest orders');
  }

  return data as Order[];
};
