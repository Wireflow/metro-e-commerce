'use server';

import { createClient } from '@/utils/supabase/server';

export type ProductSales = {
  sales: number;
  total_sales_value: number;
};

export const getProductSalesById = async (productId: string) => {
  const supabase = createClient();

  const { data } = await supabase
    .from('product_sales_analytics')
    .select('*')
    .eq('product_id', productId)
    .single();

  return data as ProductSales;
};
