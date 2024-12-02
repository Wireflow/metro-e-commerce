import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useParentCategories = () => {
  return useQuery({
    queryKey: ['categories', 'parent'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase.from('parent_categories').select('*').limit(10);

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
    retry: false,
  });
};
