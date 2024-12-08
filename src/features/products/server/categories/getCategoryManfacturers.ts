'use server';

import { createClient } from '@/utils/supabase/server';

export const getCategoryManfacturers = async (categoryId: string, limit: number = 10) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('category_manufacturers')
    .select('*')
    .eq('category_id', categoryId)
    .limit(limit);

  if (error) {
    throw new Error('Failed to retrieve manufacturersa');
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data ?? [];
};
