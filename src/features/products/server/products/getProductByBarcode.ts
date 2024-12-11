'use server';

import { createClient } from '@/utils/supabase/server';

import { Product } from '../../schemas/products';

export const getProductByBarcode = async (sku: string | null) => {
  const supabase = createClient();

  if (!sku) {
    throw new Error('SKU is required');
  }

  const trimmedSku = sku.replace(/^0+/, '');

  const { data: barcode, error: barcodeError } = await supabase
    .from('barcodes')
    .select('product_id')
    .or(`barcode.ilike.%${sku}%,barcode.ilike.%${trimmedSku}%`);

  if (barcodeError) {
    throw new Error('Barcode not found');
  }

  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*), barcodes:barcodes(id, barcode)')
    .eq('id', barcode[0].product_id)
    .single();

  if (error) {
    throw new Error('Failed to find product');
  }

  if (!data) {
    throw new Error('Product not found');
  }

  return data as Product;
};
