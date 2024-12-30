'use server';

import { headers } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

import { RecoverPasswordType } from '../schemas/forgot-password';

export const forgotPasswordAction = async (data: RecoverPasswordType) => {
  const appHeaders = await headers();
  const origin = appHeaders.get('origin');

  const email = data.email;
  const supabase = createClient();

  if (!email) {
    return {
      error: 'Email is required',
      data: null,
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    return {
      error: 'Failed to reset password',
      data: null,
    };
  }

  return {
    data: 'Check your email for a link to reset your password.',
    error: null,
  };
};
