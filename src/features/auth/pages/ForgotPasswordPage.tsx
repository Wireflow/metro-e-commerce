'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/useUser';

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  const { metadata } = useUser();
  const LoggedIn = metadata?.id;
  return (
    <div>
      <form className="mx-auto flex w-full min-w-64 max-w-64 flex-1 flex-col justify-center gap-2 text-foreground [&>input]:mb-6">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          {LoggedIn ? (
            <p className="text-sm text-secondary-foreground">Need to recover your password?</p>
          ) : (
            <p className="text-sm text-secondary-foreground">
              Already have an account?{' '}
              <Link className="text-primary underline" href="/sign-in">
                Sign in
              </Link>
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Button
            // formAction={forgotPasswordAction}
            size={'lg'}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
