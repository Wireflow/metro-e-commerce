import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

import { CartItem } from '../../store/useCartStore';
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
    onMutate: async newItem => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']) ?? [];

      // Create updated cart data
      const updatedCart = previousCart.map(cartItem => {
        if (cartItem.id === newItem.id) {
          return {
            ...cartItem,
            quantity: newItem.quantity,
          };
        }
        return cartItem;
      });

      // If quantity is 0 or less, remove the item
      if (newItem.quantity <= 0) {
        const filteredCart = updatedCart.filter(item => item.id !== newItem.id);
        queryClient.setQueryData(['cart'], filteredCart);
      } else {
        // Otherwise update the quantity
        queryClient.setQueryData(['cart'], updatedCart);
      }

      return { previousCart };
    },
    onError: (error, item, context) => {
      // Revert to the previous state if there was an error
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
      toast.error(error.message ?? 'Failed to update quantity');
    },

    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart', 'item'] });
      queryClient.invalidateQueries({ queryKey: ['cart', 'summary'] });
    },
  });
};
