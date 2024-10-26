import ServerAuthWrapper from '@/components/protected/ServerAuthWrapper';
import RegisterPage from '@/features/auth/pages/RegisterPage';

const Register = () => {
  return <ServerAuthWrapper authorizedRedirect={'/'}>{<RegisterPage />}</ServerAuthWrapper>;
};

export default Register;
