'use server';

import { createClient } from '@/utils/supabase/server';

export const getAdminUserById = async (id: string) => {
  const supabase = createClient();

  return await supabase.from('admin_users').select('*').eq('id', id).single();
};
