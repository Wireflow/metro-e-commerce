import { createClient } from '@/utils/supabase/server';

import { Category } from '../../schemas/category';

export const getCategoryById = async (categoryId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('categories_sales_and_products_count')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (error) {
    throw new Error('Failed to find category');
  }

  if (!data) {
    throw new Error('category not found');
  }

  return data as Category;
};
