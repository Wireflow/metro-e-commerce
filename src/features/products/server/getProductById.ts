import { createClient } from '@/utils/supabase/server';

export const getProductById = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('products').select('*').eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
