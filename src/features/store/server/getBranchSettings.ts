'use server';

import { METRO_BRANCH_ID } from '@/data/constants';
import { createClient } from '@/utils/supabase/server';

export const getBranchSettings = async () => {
  const supabase = createClient();

  const { data: branch, error } = await supabase
    .from('branch_settings')
    .select('*')
    .eq('branch_id', METRO_BRANCH_ID)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: branch };
};
