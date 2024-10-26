import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import { Database } from '@/types/supabase/database';

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
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
