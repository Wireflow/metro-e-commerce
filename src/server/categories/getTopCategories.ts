import { createClient } from '@/utils/supabase/server';

export const getTopCategories = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories_sales_and_products_count')
    .select('*')
    .order('sales', { ascending: false })
    .limit(10);
  if (error) {
    throw new Error('Failed to find categories');
  }

  if (!data) {
    throw new Error('Categories not found');
  }
  return data;
};
