import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useChangePassword } from '../../hooks/mutations/useChangePassword';
import { ChangePasswordSchema, ChangePasswordType } from '../../schema/change-password';

type Props = {
  onSuccess?: () => void;
};

const ChangePasswordForm = ({ onSuccess }: Props) => {
  const { mutate: changePassword, isPending } = useChangePassword();
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
    mode: 'onChange',
  });

  const isDirty = form.formState.isDirty;

  const onSubmit = (data: ChangePasswordType) => {
    if (!isDirty || !form.formState.isValid) return;

    changePassword(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="-mb-7 flex flex-col gap-1">
            <InputField
              label="Old Password"
              name="old_password"
              type="password"
              placeholder="Enter current password"
              control={form.control}
              className="w-full"
            />
            <Link
              href={'/customers/forgot-password'}
              className="mt-1 flex justify-end text-sm text-primary"
            >
              <p className="text-sm">Forgot Password?</p>
            </Link>
          </div>
          <InputField
            label="New Password"
            name="new_password"
            type="password"
            placeholder="Enter new password"
            control={form.control}
            className="w-full"
          />
          <InputField
            label="Confirm Password"
            name="confirm_password"
            type="password"
            placeholder="Confirm new password"
            control={form.control}
            className="w-full"
          />
          <div className="mt-6 flex justify-end gap-3 border-t bg-white pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={!isDirty || isPending}
              className="px-3 sm:px-4"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || isPending || !form.formState.isValid}
              className="px-3 sm:px-4"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
