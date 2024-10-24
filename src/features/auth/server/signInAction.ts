'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const signInAction = async () => {
  const result = await supabase.auth.signUp({
    email: 'independentsales@gmail.com',
    password: 'nader2002',
    options: {
      data: {
        first_name: 'Independent Sales',
        last_name: 'Abdulrub',
        role: 'independent_sales',
        branch_id: '91fa325f-48ad-4957-b16d-80f608e4c5db',
        email: 'indpendentsales@gmail.com',
      },
    },
  });

  return result;
};
