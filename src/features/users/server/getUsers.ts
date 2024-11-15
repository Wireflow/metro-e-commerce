'use server';

import { Enum } from '@/types/supabase/enum';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const getUsers = async (roles?: Enum<'user_role'>[]) => {
  let query = supabase.from('users').select('*');

  if (roles && roles.length > 0) {
    query = query.in('role', roles);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
};
