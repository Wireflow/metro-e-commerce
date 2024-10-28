'use server';

import { createClient } from '@/utils/supabase/server';

export type ProductAnalytics = {
  total_products_count: number;
  in_stock_count: number;
  out_of_stock_count: number;
  published_products_count: number;
  unpublished_products_count: number;
};

export const getProductsAnalytics = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from('product_analytics').select('*').single();

  if (error) {
    throw new Error('Failed to retrieve products analytics!');
  }

  if (!data) {
    throw new Error('No data returned from analytics');
  }

  return data as ProductAnalytics;
};
