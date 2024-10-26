import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import RegisterForm from '../components/forms/RegisterForm';

const RegisterPage = () => {
  return (
    <Card className="w-full md:max-w-[500px]">
      <CardHeader>
        <CardTitle>Register Account</CardTitle>
        <CardDescription>Start your business with us!</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
