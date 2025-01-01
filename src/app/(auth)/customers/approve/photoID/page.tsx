import { redirect } from 'next/navigation';

import ApprovePhotoIdPage from '@/features/auth/pages/ApprovePhotoIdPage';
import { getUser } from '@/utils/supabase/server';

type Props = {};

const page = async (props: Props) => {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    redirect('/customers/sign-in');
  }

  if (user?.user_metadata?.approved) {
    redirect('/customer/dashboard');
  }
  return <ApprovePhotoIdPage />;
};

export default page;
