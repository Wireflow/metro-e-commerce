'use server';

import { revalidatePath } from 'next/cache';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const updateCustomer = async (data: Update<'customers'>) => {
  if (!data.id) {
    return { success: false, error: 'Customer is required' };
  }

  const { data: product, error } = await supabase
    .from('customers')
    .update({
      ...data,
    })
    .eq('id', data.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/customers');
  revalidatePath(`/admin/customers/${data.id}`);

  return { success: true, data: product };
};
