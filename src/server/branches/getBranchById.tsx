'use server';

import { createClient } from '@/utils/supabase/server';

export const getBranchById = async (id: string) => {
  const supabase = createClient();
  return await supabase.from('branches').select('*').eq('id', id).single();
};
