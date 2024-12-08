'use server';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export type Salesperson = Pick<Row<'users'>, 'first_name' | 'last_name' | 'id' | 'role'>;

export const getSalespersons = async () => {
  try {
    const query = supabase
      .from('users')
      .select(
        `
        first_name,
        last_name,
        id,
        role
      `
      )
      .or('role.eq.sales,role.eq.independent_sales');

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching saleperson:', error);
      throw new Error('Failed to fetch salesperson data');
    }

    return data as Salesperson[];
  } catch (error) {
    console.error('Error in getSalespersons:', error);
    throw new Error('Failed to fetch salesperson data');
  }
};
