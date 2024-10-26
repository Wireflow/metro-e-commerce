import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/types/supabase/database';

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export const getSession = async () => {
  const supabase = createClient();

  return await supabase.auth.getSession();
};
