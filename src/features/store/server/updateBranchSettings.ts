'use server';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

export const updateBranchSettings = async (data: Omit<Update<'branch_settings'>, 'branch_id'>) => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return { success: false, error: userError.message };
  }

  if (!user?.user_metadata?.branch_id) {
    return { success: false, error: "Couldn't update branch settings" };
  }

  const { data: branch, error } = await supabase
    .from('branch_settings')
    .update(data)
    .eq('branch_id', user?.user_metadata.branch_id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: branch };
};
