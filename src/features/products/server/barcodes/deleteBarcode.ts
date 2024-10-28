'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';

export const deleteBarcode = async (barcodeId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('barcodes').delete().eq('id', barcodeId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/products/[id]');

  return { success: true, data };
};
