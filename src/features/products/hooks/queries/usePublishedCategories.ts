import { useQuery } from '@tanstack/react-query';

import { METRO_BRANCH_ID } from '@/data/constants';
import { createClient } from '@/utils/supabase/client';

export const usePublishedCategories = () => {
  return useQuery({
    queryKey: ['categories', 'published'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('branch_id', METRO_BRANCH_ID)
        .eq('published', true)
        .order('is_featured', { ascending: true });

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
