import { createClient } from '@/utils/supabase/server';

import { Product } from '../../schemas/products';

export const getProductById = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*), barcodes:barcodes(id, barcode)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Failed to find product');
  }

  if (!data) {
    throw new Error('Product not found');
  }

  return data as Product;
};
