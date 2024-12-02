import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useSubCategories = (parentCategoryId: string) => {
  return useQuery({
    queryKey: ['categories', 'sub', parentCategoryId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_category_id', parentCategoryId)
        .order('name');

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
    // Only run the query if we have a parent ID
    enabled: !!parentCategoryId,
    retry: false,
  });
};
