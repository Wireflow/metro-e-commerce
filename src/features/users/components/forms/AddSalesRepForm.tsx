import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { SelectField } from '@/components/form/SelectField';
import { SelectOptions } from '@/components/quick/Select';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useCreateSalesRep } from '../../hooks/mutations/useCreateSalesRep';
import { CreateUserSchema, CreateUserType } from '../../schemas/create-user';

type Props = {
  onSuccess?: () => void;
};

const AddSalesRepForm = ({ onSuccess }: Props) => {
  const { mutate: createSalesRep, isPending } = useCreateSalesRep();

  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: undefined,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: CreateUserType) => {
    createSalesRep(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const roleOptions: SelectOptions[] = [
    { value: 'sales', label: 'Wholesale Sales Rep' },
    { value: 'independent_sales', label: 'Independent Sales Rep' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            control={form.control}
            name="firstName"
            placeholder="First Name"
            label="First Name"
            type="text"
          />
          <InputField
            control={form.control}
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            type="text"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            control={form.control}
            name="phone"
            placeholder="Phone"
            label="Phone"
            type="tel"
          />
          <SelectField
            control={form.control}
            options={roleOptions}
            name="role"
            label="Role"
            placeholder="Select Role"
          />
        </div>
        <InputField
          control={form.control}
          name="email"
          placeholder="Email"
          label="Email"
          type="email"
        />
        <div className="flex items-center gap-2">
          <Info color="red" size={20} />
          <p className="text-xs">
            Sales representative will be receieve an email with a temporary password
          </p>
        </div>
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

export default AddSalesRepForm;
