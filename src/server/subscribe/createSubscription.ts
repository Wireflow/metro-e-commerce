import { createClient } from '@/utils/supabase/client';

export const createSubscription = async (email: string, branchId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('newsletter_emails')
    .insert({ email: email, branch_id: branchId });

  if (error?.code === '23505') {
    throw new Error('Email already subscribed');
  }

  if (error) {
    throw new Error('Failed to subscribe to newsletter');
  }

  return data;
};
