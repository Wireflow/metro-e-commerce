'use server';

import { createClient } from '@/utils/supabase/server';

import { Category } from '../../schemas/category';

export const getCategoryById = async (categoryId: string) => {
  const supabase = createClient();

  // The view includes all columns from categories (c.*) plus additional aggregated fields
  const { data, error } = await supabase
    .from('categories_sales_and_products_count')
    .select(
      `
      *,
      sub_categories:categories_sales_and_products_count(
        id,
        name,
        image_url
      )
    `
    )
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
