import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/utils/supabase/client';

export const useDefaultCart = () => {
  return useQuery({
    queryKey: ['cart', 'default'],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('carts')
        .select('id')
        .eq('is_default', true)
        .single();

      if (error) {
        throw new Error('Error fetching cart');
      }

      if (!data) {
        throw new Error('No cart found');
      }

      return data;
    },
  });
};
