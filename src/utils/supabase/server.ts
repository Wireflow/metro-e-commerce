import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import { Database } from '@/types/supabase/database';

export const createClient = () => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
    {
      cookies: {
        async getAll() {
          const cookieStore = await cookies();
          return cookieStore.getAll();
        },
        async setAll(cookieList) {
          try {
            const cookieStore = await cookies();
            for (const cookie of cookieList) {
              cookieStore.set(cookie.name, cookie.value, cookie.options);
            }
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.error(error);
          }
        },
      },
    }
  );
};

export const getUser = async () => {
  const supabase = createClient();
  return await supabase.auth.getUser();
};

export const getSession = async () => {
  const supabase = createClient();
  return await supabase.auth.getSession();
};
