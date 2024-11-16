'use server';

import { METRO_BRANCH_ID } from '@/data/constants';
import { createClient } from '@/utils/supabase/server';

export const getBranch = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('id', METRO_BRANCH_ID)
    .single();

  if (error) {
    throw new Error('Failed to find branch');
  }

  if (!data) {
    throw new Error('Branch not found');
  }

  return data;
};
