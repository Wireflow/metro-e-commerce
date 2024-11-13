'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const getSalesPersonOrders = async () => {
  try {
    const query = supabase.from('orders').select('*, salesperson:salesperson_id');

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching saleperson orders :', error);
      throw new Error('Failed to fetch salesperson orders data');
    }

    return data;
  } catch (error) {
    console.error('Error in getSalesPersonOrders:', error);
    throw new Error('Failed to fetch salesperson orders data');
  }
};
