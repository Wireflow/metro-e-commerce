'use server';

import { createClient } from '@/utils/supabase/server';

import { Product } from '../../schemas/products';

export const getCategoryFeaturedProducts = async (categoryId: string, limit: number = 3) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(`products`)
    .select('*, images:product_images(*), barcodes:barcodes(barcode, id)')
    .eq('category_id', categoryId)
    .eq('is_featured', true)
    .order('id', { ascending: false })
    .limit(limit)
    .returns<Product[]>();

  if (error) {
    throw new Error('Failed to retrieve featured products!');
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data ?? [];
};
