import { redirect } from 'next/navigation';

import { getUser } from '@/utils/supabase/server';

import { getAdminUserById } from './getAdminUserById';

export async function validateAdminAccess() {
  const {
    data: { user },
    error: sessionError,
  } = await getUser();

  if (!user || sessionError) {
    redirect('/');
  }

  const { data: adminUser, error: adminError } = await getAdminUserById(user.id);

  if (adminError || !adminUser || user.user_metadata.role !== 'admin') {
    // Optionally log unauthorized access attempts
    console.warn('Unauthorized admin access attempt:', {
      userId: user.id,
      role: user.user_metadata.role,
    });
    redirect('/');
  }

  return { user, adminUser };
}
