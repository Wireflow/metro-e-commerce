import ServerAuthWrapper from '@/components/protected/ServerAuthWrapper';
import AdminSignInPage from '@/features/auth/pages/AdminSignInPage';

const AdminSignIn = async () => {
  return (
    <ServerAuthWrapper authorizedRedirect={'/'}>
      <AdminSignInPage />
    </ServerAuthWrapper>
  );
};

export default AdminSignIn;
