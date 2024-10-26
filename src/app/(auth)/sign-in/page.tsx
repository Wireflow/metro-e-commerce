import ServerAuthWrapper from '@/components/protected/ServerAuthWrapper';
import SignInPage from '@/features/auth/pages/SignInPage';

const SignIn = async () => {
  return (
    <ServerAuthWrapper authorizedRedirect={'/'}>
      <SignInPage />
    </ServerAuthWrapper>
  );
};

export default SignIn;
