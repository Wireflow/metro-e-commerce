'use server';

import { createClient } from '@/utils/supabase/server';

export const getBranchSettings = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return { success: false, error: userError.message };
  }

  if (!user?.user_metadata?.branch_id) {
    return { success: false, error: "Couldn't retrieve branch settings" };
  }

  const { data: branch, error } = await supabase
    .from('branch_settings')
    .select('*')
    .eq('branch_id', user?.user_metadata.branch_id)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: branch };
};
