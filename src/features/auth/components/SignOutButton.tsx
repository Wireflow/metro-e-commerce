'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';

import { signOut } from '../server/signOut';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      await supabase.auth.signOut();

      queryClient.clear();
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });

      router.push('/customers/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleSignOut}>Sign out</Button>;
    </div>
  );
};

export default SignOutButton;
