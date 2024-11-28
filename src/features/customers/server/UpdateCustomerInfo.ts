'use server';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

export const updateCustomerInfo = async (data: Update<'customers'>) => {
  const supabase = createClient();

  if (!data.id) {
    return { success: false, error: 'Customer is required' };
  }

  const { data: customer, error } = await supabase
    .from('customers')
    .update({
      ...data,
    })
    .eq('id', data.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: customer };
};
