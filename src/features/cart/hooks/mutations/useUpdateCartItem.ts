import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

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

      const { data, error } = await supabase
        .from('cart_items')
        .update({
          quantity: item?.quantity ?? 0,
        })
        .eq('id', item.id)
        .select('*')
        .single();

      if (error) {
        throw new Error('Failed to add product to cart');
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
    },
  });
};
