'use server';

import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/utils/supabase/server';

import { SignInSchema } from '../schemas/sign-in';

export const signInAction = actionClient.schema(SignInSchema).action(async ({ parsedInput }) => {
  const supabase = createClient();

  const { email, password } = parsedInput;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Return only the message from the error
    return { success: false, message: error.message };
  }

  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (customerError) {
    await supabase.auth.signOut();
    return { success: false, message: 'Customer not found' };
  }

  if (!customer.approved) {
    await supabase.auth.signOut();
    return { success: false, message: 'Your account is pending approval' };
  }

  if (customer.blocked) {
    await supabase.auth.signOut();
    return { success: false, message: 'Your account has been blocked' };
  }

  // Return only necessary data that's serializable
  return {
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  };
});
