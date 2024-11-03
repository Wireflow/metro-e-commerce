import { createClient } from '@/utils/supabase/server';

export const getCustomerById = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('customers_with_address')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Failed to find customer');
  }

  if (!data) {
    throw new Error('Customer not found');
  }

  return data;
};
