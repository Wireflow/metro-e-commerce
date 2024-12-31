'use client';
import SocialMediaLinks from '@/features/store/components/website-controls/SocialMediaLinks';

import AdminInfo from '../AdminInfo';
import UpdateAdminPinForm from '../forms/UpdateAdminPinForm';

type Props = {};

const AdminSettingPage = (props: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <AdminInfo />
      <SocialMediaLinks />
    </div>
  );
};

export default AdminSettingPage;
