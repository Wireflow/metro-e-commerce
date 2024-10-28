'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';

const SignOutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = () => {
    supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <Button onClick={handleSignOut}>Sign out</Button>;
      <Button onClick={() => router.push('/admin')}>Admin Dashboard</Button>
      <Button onClick={() => router.push('/admin/sign-in')}>Admin Signin</Button>
      <Button onClick={() => router.push('/customers/sign-in')}>Customers Signin</Button>
    </>
  );
};

export default SignOutButton;
