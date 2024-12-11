'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { SignInSchema, SignInType } from '../../schemas/sign-in';
import { signInAdminAction } from '../../server/signInAdminAction';

const AdminSignInForm = () => {
  const router = useRouter();

  const { execute, isExecuting } = useAction(signInAdminAction, {
    onSuccess: ({ data }) => {
      if (!data?.success) {
        toast.error(data?.message || 'An error occurred during sign in');
        return;
      }
      toast.success('Signed in successfully');
      router.push('/');
    },
    onError: () => {
      toast.error('An unexpected error occurred');
    },
  });

  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInType) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <InputField control={form.control} name="email" label="Email" type="email" />
          <InputField
            control={form.control}
            name="password"
            label={
              <div className="flex justify-between">
                <p>Password</p>
                <Link className="text-xs text-foreground underline" href="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            }
            type="password"
          />
          <Button type="submit" disabled={isExecuting} className="w-full" size={'lg'}>
            {isExecuting ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminSignInForm;
