'use server';

import { revalidatePath } from 'next/cache';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

export const updateCustomer = async (data: Update<'customers'>) => {
  const supabase = createClient();

  if (!data.id) {
    return { success: false, error: 'Customer is required' };
  }

  const { data: customer, error } = await supabase
    .from('customers')
    .update({
      ...data,
    })
    .eq('id', data.id)
    .select('business_name');

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/customers');
  revalidatePath(`/admin/customers/${data.id}`);

  return { success: true, data: customer };
};
