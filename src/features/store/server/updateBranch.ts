'use server';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/server';

export const updateBranch = async (data: Omit<Update<'branches'>, 'branch_id'>) => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return { success: false, error: userError.message };
  }

  if (!user?.user_metadata?.branch_id) {
    return { success: false, error: "Couldn't update branch" };
  }

  if (user?.user_metadata?.role !== 'admin') {
    return { success: false, error: 'Unauthorized' };
  }

  const { data: branch, error } = await supabase
    .from('branches')
    .update(data)
    .eq('id', user?.user_metadata.branch_id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: branch };
};
