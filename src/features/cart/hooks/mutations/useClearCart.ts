import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

export const useClearCart = () => {
  const queryClient = useQueryClient();

  const { user } = useUser();
  return useMutation({
    mutationKey: ['clear-cart'],
    mutationFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .match({ customer_id: user?.id });

      if (error) {
        throw new Error('Failed to clear cart');
      }

      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
