'use server';

import { createClient } from '@/utils/supabase/server';

export const getSalespersonCustomers = async (salespersonId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('customers_with_address')
    .select('*')
    .eq('belongs_to', 'independent')
    .eq('independent_sales_id', salespersonId);

  if (error) {
    throw new Error('Failed to find customer');
  }

  if (!data) {
    throw new Error('Customer not found');
  }

  return data;
};
