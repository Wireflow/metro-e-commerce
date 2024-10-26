import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import SignInForm from '../components/forms/SignInForm';

const SignInPage = () => {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
};

export default SignInPage;
