import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDeleteFromWishList } from '@/features/wishlist/hooks/mutations/useDeleteFromWishlist';
import { Row } from '@/types/supabase/table';
import { createClient } from '@/utils/supabase/client';

import { useDefaultCart } from '../queries/useDefaultCart';

export const useAddToCart = () => {
  const { mutateAsync: removeFromWishlist } = useDeleteFromWishList({ disableToast: true });
  const { data: cartData, error: cartError } = useDefaultCart();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cart', 'add'],
    mutationFn: async (item: Pick<Row<'cart_items'>, 'product_id' | 'quantity'>) => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Unauthorized');
      }

      let isNewItem: boolean = false;

      if (cartError) {
        throw new Error('Error fetching cart');
      }

      if (!cartData) {
        throw new Error('No cart found');
      }

      const { data: cartItem, error: cartItemError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .match({ product_id: item.product_id, customer_id: user?.id, cart_id: cartData.id })
        .single();

      if (cartItemError && cartItemError?.code !== 'PGRST116') {
        throw new Error('Failed to find product in cart');
      }

      if (cartItem) {
        const { data, error } = await supabase
          .from('cart_items')
          .update({
            quantity: 1 + (cartItem?.quantity ?? 0),
          })
          .eq('id', cartItem.id)
          .select('*')
          .single();

        if (error) {
          throw new Error(error.message ?? 'Failed to update product in cart');
        }

        return { data, isNewItem };
      }

      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          product_id: item.product_id,
          customer_id: user?.id,
          quantity: item.quantity ?? 1,
          cart_id: cartData.id,
        })
        .select('*')
        .single();

      if (error) {
        throw new Error('Failed to add product to cart');
      }

      removeFromWishlist(item.product_id);

      isNewItem = true;

      return { data, isNewItem };
    },
    onSuccess: result => {
      toast.success(result.isNewItem ? 'Product added to cart' : 'Product quantity increased');
    },
    onError: error => {
      toast.error(error.message ?? 'Failed to add product to cart');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'item'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart', 'summary'] });
    },
  });
};
