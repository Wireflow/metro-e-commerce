import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ProductToast from '@/components/toasts/ProductToast';
import { createClient } from '@/utils/supabase/client';

import { CartItem } from '../../store/useCartStore';
import { useDefaultCart } from '../queries/useDefaultCart';

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { data: cartData } = useDefaultCart();

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

      if (!cartData) {
        throw new Error('No cart found');
      }

      const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .match({ product_id: productId, customer_id: user?.id, cart_id: cartData.id });

      if (error) {
        throw new Error('Failed to remove product from cart');
      }

      return data;
    },
    onMutate: async productId => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']) ?? [];

      // Optimistically remove the item from the cart
      const updatedCart = previousCart.filter(item => item.product_id !== productId);
      queryClient.setQueryData(['cart'], updatedCart);

      return { previousCart };
    },
    onError: (error, _, context) => {
      // Revert to the previous state if there was an error
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
      toast.error(error.message ?? 'Failed to remove product from cart');
    },
    onSuccess: () => {
      toast.custom(
        () => {
          return <ProductToast variant="removed" />;
        },
        { duration: 3000, className: 'bg-white rounded-lg shadow-lg p-4 w-full' }
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart', 'item'] });
      queryClient.invalidateQueries({ queryKey: ['cart', 'summary'] });
    },
  });
};
