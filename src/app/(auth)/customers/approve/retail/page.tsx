import { redirect } from 'next/navigation';

import ApproveRetailPage from '@/features/auth/pages/ApproveRetailPage';
import { getUser } from '@/utils/supabase/server';

const ApproveRetail = async () => {
  const {
    data: { user },
  } = await getUser();

  if (user?.user_metadata?.approved) {
    redirect('/customer/dashboard');
  }

  return <ApproveRetailPage />;
};

export default ApproveRetail;
