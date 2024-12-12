import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

import { useDefaultCart } from '../queries/useDefaultCart';

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { data: cartData, error: cartError } = useDefaultCart();

  const { user } = useUser();
  return useMutation({
    mutationKey: ['clear-cart'],
    mutationFn: async () => {
      const supabase = createClient();

      if (cartError) {
        throw new Error('Error fetching cart');
      }

      if (!cartData) {
        throw new Error('No cart found');
      }

      const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .match({ customer_id: user?.id, cart_id: cartData.id });

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
