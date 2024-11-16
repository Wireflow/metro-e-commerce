import { createClient } from '@/utils/supabase/server';

export const getManufacturers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('category_manufacturers').select('*').limit(10);
  if (error) {
    throw new Error('Failed to find Manufacturuers');
  }
  if (!data) {
    throw new Error('Manufacturers not found');
  }
  return data;
};
