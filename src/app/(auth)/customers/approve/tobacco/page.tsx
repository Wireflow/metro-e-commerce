import { redirect } from 'next/navigation';

import ApproveTobaccoPage from '@/features/auth/pages/ApproveTobaccoPage';
import { getUser } from '@/utils/supabase/server';

const ApproveTobacco = async () => {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    redirect('/customers/sign-in');
  }

  if (user?.user_metadata?.approved_tobacco) {
    redirect('/customer/dashboard');
  }

  return <ApproveTobaccoPage />;
};

export default ApproveTobacco;
