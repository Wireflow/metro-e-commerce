'use server';

import { actionClient } from '@/lib/safe-action';
import { createClient } from '@/utils/supabase/server';

import { SignInSchema } from '../schemas/sign-in';

export const signInAction = actionClient.schema(SignInSchema).action(async ({ parsedInput }) => {
  const supabase = createClient();

  const { email, password } = parsedInput;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
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

  if (customer.blocked) {
    await supabase.auth.signOut();
    return { success: false, message: 'Your account has been blocked' };
  }

  if (customer.is_new_user) {
    return {
      success: true,
      redirect: '/reset-password',
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    };
  }

  // Check if customer needs to complete tax ID verification
  if (!customer.approved && (!customer.tax_id || !customer.tax_id_image_url)) {
    return {
      success: true,
      redirect: '/customers/approve/retail',
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    };
  }

  // Return success with user data
  return {
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  };
});
