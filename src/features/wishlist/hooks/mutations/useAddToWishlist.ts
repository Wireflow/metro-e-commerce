import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createClient } from '@/utils/supabase/client';

export const useAddToWishlist = () => {
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
      toast.success('Product added to wishlist');
    },
    onError: error => {
      if (error.cause === '23505') {
        toast.warning('Product already in wishlist');
        return;
      }
      toast.error(error.message ?? 'Failed to add product to wishlist');
    },
  });
};
