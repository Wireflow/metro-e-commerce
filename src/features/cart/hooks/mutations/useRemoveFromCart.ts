import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

import { useCartStore } from '../../store/useCartStore';

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return useMutation({
    mutationKey: ['cart', 'remove'],
    mutationFn: async (productId: string) => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Unauthorized');
      }

      if (!productId) {
        throw new Error('No cart item id provided');
      }

      const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .match({ product_id: productId, customer_id: user?.id });

      if (error) {
        throw new Error('Failed to remove product from cart');
      }

      removeFromCart(productId);

      return data;
    },
    onSuccess: () => {
      toast.success('Removed product from cart');
    },
    onError: error => {
      toast.error(error.message ?? 'Failed to remove product from cart');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'item'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
