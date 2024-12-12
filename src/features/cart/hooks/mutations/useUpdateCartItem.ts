import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

import { useDefaultCart } from '../queries/useDefaultCart';

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { data: cartData, error: cartError } = useDefaultCart();

  return useMutation({
    mutationKey: ['cart', 'update'],
    mutationFn: async (item: Pick<Row<'cart_items'>, 'product_id' | 'quantity' | 'id'>) => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Unauthorized');
      }

      if (!item.id) {
        throw new Error('No cart item id provided');
      }

      if (item.quantity <= 0) {
        const { error } = await supabase.from('cart_items').delete().eq('id', item.id);

        if (error) throw error;

        return null;
      }

      if (!cartData) {
        throw new Error('No cart found');
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({
          quantity: item?.quantity ?? 0,
        })
        .match({ id: item.id, cart_id: cartData.id })
        .select('*')
        .single();

      if (error) {
        throw new Error(error.message ?? 'Failed to add product to cart');
      }

      return data;
    },
    onSuccess: () => {
      toast.success('Updated quantity to cart');
    },
    onError: error => {
      toast.error(error.message ?? 'Failed to add quanttiy to cart');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'item'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
