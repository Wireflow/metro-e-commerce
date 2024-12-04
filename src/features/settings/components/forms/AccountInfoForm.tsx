'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useUser } from '@/hooks/useUser';
import { formatPhoneNumber } from '@/utils/utils';

import { useUpdateAccountInfo } from '../../hooks/mutations/useUpdateAccountInfo';
import { updateAccountSchema, UpdateAccountType } from '../../schema/update-account';

type Props = {
  onSuccess?: () => void;
};

const AccountInfoForm = ({ onSuccess }: Props) => {
  const { mutate: updateAccount, isPending } = useUpdateAccountInfo();
  const { metadata } = useUser();

  const form = useForm<UpdateAccountType>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      first_name: metadata.first_name,
      last_name: metadata.last_name,
      phone: metadata.phone,
      email: metadata.email,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset({
      first_name: metadata.first_name,
      last_name: metadata.last_name,
      phone: metadata.phone,
      email: metadata.email,
    });
  }, [metadata, form]);

  const { field: numberField } = useController({
    control: form.control,
    name: 'phone',
  });

  const isDirty = form.formState.isDirty;

  const onSubmit = (data: UpdateAccountType) => {
    if (!isDirty || !form.formState.isValid) return;

    updateAccount(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="First Name"
                name="first_name"
                placeholder="John"
                control={form.control}
                className="w-full"
              />
              <InputField
                label="Last Name"
                name="last_name"
                placeholder="Doe"
                control={form.control}
                className="w-full"
              />
            </div>
            <InputField
              label="Phone Number"
              name="phone"
              placeholder="ex 1234 5678 9012 3456"
              control={form.control}
              value={formatPhoneNumber(numberField.value)}
              onChange={e => {
                const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 10);
                numberField.onChange(formattedValue);
              }}
              className="w-full"
            />
            <InputField
              label="Email"
              name="email"
              placeholder="johndoe@example.com"
              control={form.control}
              className="w-full"
            />
          </div>
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
    </div>
  );
};

export default AccountInfoForm;
