'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';

import { useForgotPassword } from '../hooks/mutations/useForgotPassword';
import { RecoverPasswordSchema, RecoverPasswordType } from '../schemas/forgot-password';

const ForgotPasswordPage = () => {
  const { isAuthenticated } = useUser();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const isSales = searchParams.get('sales') === 'true';
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const form = useForm<RecoverPasswordType>({
    resolver: zodResolver(RecoverPasswordSchema),
    defaultValues: {
      email: email ?? '',
    },
  });

  const onSubmit = (data: RecoverPasswordType) => {
    forgotPassword(data);
  };

  return (
    <div className={cn({ 'flex min-h-[calc(100vh-250px)] items-center justify-center': isSales })}>
      <Form {...form}>
        <form
          className="mx-auto flex w-full min-w-64 max-w-64 flex-col gap-2 text-foreground [&>input]:mb-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="text-center">
            <h1 className="text-2xl font-medium">Reset Password</h1>
            {isAuthenticated ? (
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

          {isSuccess ? (
            <div className="mt-8 text-center text-sm text-neutral-600">
              Check your email for a link to reset your password. If it doesn&apos;t appear within a
              few minutes, check your spam folder.
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder='e.g. "you@example.com"'
                disabled={isPending}
              />

              <Button size={'lg'} disabled={isPending}>
                {isPending ? 'Sending...' : 'Reset Password'}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
