'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    throw new Error('Failed to retrieve categories!');
  }

  if (!data) {
    throw new Error('No data returned');
  }

  return data;
};
