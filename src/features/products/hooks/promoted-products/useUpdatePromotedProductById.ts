import { useMutation } from '@tanstack/react-query';

import { Update } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

export const useUpdatePromotedProductById = (promotedProductId: number) => {
  return useMutation({
    mutationKey: ['products', 'promoted', 'update'],
    mutationFn: async (newData: Update<'promoted_products'>) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('promoted_products')
        .update(newData)
        .eq('id', promotedProductId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
