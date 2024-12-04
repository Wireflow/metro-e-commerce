import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import WishlistToast from '@/components/toasts/WishlistToast';
import { createClient } from '@/utils/supabase/client';

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['wishlist', 'add'],
    mutationFn: async (productId: string) => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Unauthorized');
      }

      if (user.user_metadata?.role === 'admin') {
        throw new Error('Admins cannot add products to wishlist');
      }

      const { data, error } = await supabase
        .from('wishlist_items')
        .insert({
          product_id: productId,
          customer_id: user?.id,
        })
        .select('*')
        .single();

      if (error?.code === '23505') {
        throw new Error('Product already in wishlist', { cause: '23505' });
      }

      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.custom(() => <WishlistToast variant="success" />, {
        duration: 3000,
        className: 'bg-white rounded-lg shadow-lg p-4 w-full',
      });
    },
    onError: error => {
      if (error.cause === '23505') {
        toast.custom(() => <WishlistToast variant="warning" />, {
          duration: 3000,
          className: 'bg-white rounded-lg shadow-lg p-4 w-full',
        });
        return;
      }

      toast.custom(
        () => (
          <WishlistToast
            variant="error"
            description={error.message ?? 'Failed to add product to wishlist'}
          />
        ),
        {
          duration: 3000,
          className: 'bg-white rounded-lg shadow-lg p-4 w-full',
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
