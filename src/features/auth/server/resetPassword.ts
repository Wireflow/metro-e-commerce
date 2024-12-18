// server/resetPassword.ts
'use server';

import { createClient } from '@/utils/supabase/server';

import { ResetPasswordType } from '../schemas/reset-password';

export const resetPasswordAction = async (data: ResetPasswordType) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!data.password) {
    return {
      error: 'Password is required',
      data: null,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) {
    return {
      error: error.message,
      data: null,
    };
  }

  if (
    user.data.user?.user_metadata.role === 'sales' ||
    user.data.user?.user_metadata.role === 'independent_sales'
  ) {
    await supabase.auth.signOut();
  }

  return {
    data: 'Password updated successfully',
    error: null,
  };
};
