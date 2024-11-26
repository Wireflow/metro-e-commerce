import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import WishlistToast from '@/components/toasts/WishlistToast';
import { createClient } from '@/utils/supabase/client';

type Params = {
  disableToast?: boolean;
};

export const useDeleteFromWishList = (params?: Params) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['wishlist', 'delete'],
    mutationFn: async (productId: string) => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Unauthorized');
      }

      const { data, error } = await supabase
        .from('wishlist_items')
        .delete()
        .match({ product_id: productId, customer_id: user?.id });

      if (error) {
        throw error;
      }
      return data;
    },

    onSuccess: () => {
      if (!params?.disableToast) {
        toast.custom(() => <WishlistToast variant="removed" />, {
          duration: 3000,
          className: 'bg-white rounded-lg shadow-lg p-4 w-full',
        });
      }
    },
    onError: error => {
      if (!params?.disableToast) {
        toast.custom(
          () => (
            <WishlistToast
              variant="warning"
              description={error.message ?? 'Failed to remove product from wishlist'}
            />
          ),
          {
            duration: 3000,
            className: 'bg-white rounded-lg shadow-lg p-4 w-full',
          }
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
