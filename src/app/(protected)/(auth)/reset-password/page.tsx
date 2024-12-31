'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useResetPassword } from '@/features/auth/hooks/mutations/useResetPassword';
import { ResetPasswordSchema, ResetPasswordType } from '@/features/auth/schemas/reset-password';
import { cn } from '@/lib/utils';

export default function ResetPassword() {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const isSales = useSearchParams().get('sales') === 'true';

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordType) => {
    resetPassword(data);
  };

  return (
    <div
      className={cn('grid place-items-center py-16', {
        'h-screen': isSales,
      })}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col gap-4 p-4"
        >
          <div className="space-y-2">
            <h1 className="text-2xl font-medium">Change Password</h1>
            <p className="text-sm text-foreground/60">Please enter your new password below.</p>
          </div>

          <div className="space-y-4">
            <InputField
              control={form.control}
              name="password"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              disabled={isPending}
            />

            <InputField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              disabled={isPending}
            />
          </div>

          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? 'Changing password...' : 'Set New Password'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
