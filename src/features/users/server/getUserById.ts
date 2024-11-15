'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const getUserById = async (userId: string) => {
  if (!userId) {
    throw new Error('User not found!');
  }

  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

  if (error) {
    console.error(error);
    throw "Couldn't find user";
  }

  return data;
};
