'use server';

import { createClient, getUser } from '@/utils/supabase/server';

import { CreateUserType } from '../schemas/create-user';

export const createUser = async (data: CreateUserType) => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await getUser();

  if (error) {
    return { success: false, error: 'Unauthorized' };
  }

  const role = user?.user_metadata.role;
  const branchId = user?.user_metadata.branch_id;

  if (role !== 'admin' || !branchId) {
    return { success: false, error: 'Unauthorized' };
  }

  if (!['sales', 'independent_sales'].includes(data.role)) {
    return { success: false, error: 'Unauthorized' };
  }

  const { data: newUser, error: userError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      branch_id: branchId,
      role: data.role,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
    },
  });

  if (userError) {
    return { success: false, error: userError.message };
  }

  return { success: true, data: newUser };
};
