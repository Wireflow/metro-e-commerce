import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useUpdateSalesPassword } from '../../hooks/mutations/useUpdateSalesPassword';
import { UpdatePasswordSchema, UpdatePasswordType } from '../../schemas/create-user';

type Props = {
  onSuccess?: () => void;
};

const ChangeSalesPassword = ({ onSuccess }: Props) => {
  const { mutate: updatePassword, isPending } = useUpdateSalesPassword();

  const form = useForm<UpdatePasswordType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: UpdatePasswordType) => {
    updatePassword(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <InputField
          control={form.control}
          name="password"
          placeholder="Password"
          label="New Password"
          type="password"
        />
        <InputField
          control={form.control}
          name="confirmPassword"
          placeholder="Confirm password"
          label="Confirm New Password"
          type="password"
        />
        <Button
          type="submit"
          variant={'black'}
          size={'lg'}
          className="w-full md:w-auto"
          disabled={isPending || !form.formState.isValid}
        >
          Confirm Sales Rep
        </Button>
      </form>
    </Form>
  );
};

export default ChangeSalesPassword;
