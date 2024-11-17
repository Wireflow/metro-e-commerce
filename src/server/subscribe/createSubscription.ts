import { createClient } from '@/utils/supabase/client';

export const createSubscription = async (email: string, branchId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('newsletter_emails')
    .insert({ email: email, branch_id: branchId })
    .select();
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error('No data returned from createSubscription');
  }
  return data;
};
