'use server';

import { Insert } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const createBarcode = async (data: Insert<'barcodes'>) => {
  const { data: barcode, error } = await supabase
    .from('barcodes')
    .insert({
      ...data,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: barcode };
};

export const createBarcodes = async (data: Insert<'barcodes'>[]) => {
  const responses = await Promise.all(data.map(barcode => createBarcode(barcode)));
  return responses.filter(response => response.success);
};
