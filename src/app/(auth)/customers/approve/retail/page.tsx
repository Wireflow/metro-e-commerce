import { redirect } from 'next/navigation';

import ApproveRetailPage from '@/features/auth/pages/ApproveRetailPage';
import { getUser } from '@/utils/supabase/server';

const ApproveRetail = async () => {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    redirect('/customers/sign-in');
  }

  if (user?.user_metadata?.approved) {
    redirect('/customer/dashboard');
  }

  return <ApproveRetailPage />;
};

export default ApproveRetail;
