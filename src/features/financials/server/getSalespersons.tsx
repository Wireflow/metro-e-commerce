'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const getSalespersons = async () => {
  try {
    const query = supabase.from('users').select('*').eq('role', 'sales');

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching saleperson :', error);
      throw new Error('Failed to fetch salesperson data');
    }

    return data;
  } catch (error) {
    console.error('Error in getSalespersons:', error);
    throw new Error('Failed to fetch salesperson data');
  }
};
