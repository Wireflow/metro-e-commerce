'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button, ButtonProps } from '@/components/ui/button';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore';
import { createClient } from '@/utils/supabase/client';

import { signOut } from '../server/signOut';

const SignOutButton = ({ children, ...props }: Omit<ButtonProps, 'onClick'>) => {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const clearCart = useCartStore(state => state.clearCart);
  const clearWishlist = useWishlistStore(state => state.clearWishlist);

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      await supabase.auth.signOut();

      queryClient.clear();
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      clearCart();
      clearWishlist();

      toast.success('You have been signed out successfully.');

      router.push('/customers/sign-in');
    } catch (error) {
      toast.error('Failed to sign out.');
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button {...props} onClick={handleSignOut}>
      {children ?? 'Sign Out'}
    </Button>
  );
};

export default SignOutButton;
