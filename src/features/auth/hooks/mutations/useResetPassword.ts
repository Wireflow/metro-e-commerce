// hooks/mutations/useResetPassword.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useCartStore } from '@/features/cart/store/useCartStore';
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore';
import { createClient } from '@/utils/supabase/client';

import { ResetPasswordType } from '../../schemas/reset-password';
import { resetPasswordAction } from '../../server/resetPassword';
import { signOut } from '../../server/signOut';

export const useResetPassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearCart = useCartStore(state => state.clearCart);
  const clearWishlist = useWishlistStore(state => state.clearWishlist);

  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (data: ResetPasswordType) => {
      const supabase = createClient();
      const { error, data: result } = await resetPasswordAction(data);

      if (error) {
        throw new Error(error);
      }

      if (result?.signUserOut) {
        await signOut();
        await supabase.auth.signOut();

        queryClient.clear();
        queryClient.setQueryData(['user'], null);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        clearCart();
        clearWishlist();

        router.push('/customers/sign-in');
      }

      return result;
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
      router.push('/customers/sign-in');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
