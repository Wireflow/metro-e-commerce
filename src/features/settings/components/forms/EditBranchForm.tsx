import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useBranch } from '@/hooks/queries/useMetro';

import { useUpdateBranch } from '../../hooks/mutations/useUpdateBranch';
import { branchSchema, BranchSchemaType } from '../../schema/update-branch';

type Props = {
  setOpen: (open: boolean) => void;
};

const BranchForm = ({ setOpen }: Props) => {
  const { mutate: updateBranchAction, isPending } = useUpdateBranch();
  const { branch } = useBranch();

  const form = useForm<BranchSchemaType>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: branch?.name ?? '',
      phone: branch?.phone ?? '',
      email: branch?.email ?? '',
      orders_notified_email: branch?.orders_notified_email ?? '',
      address: branch?.address ?? '',
      city: branch?.city ?? '',
      state: branch?.state ?? '',
      zip_code: branch?.zip_code ?? '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: BranchSchemaType) => {
    updateBranchAction(
      { ...data, branchId: branch?.id as string },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex-1 p-4">
          {/* Business Info Row */}
          <div className="mb-4 flex flex-row gap-4">
            <div className="flex-1">
              <InputField label="Business Name" name="name" control={form.control} />
            </div>
            <div className="flex-1">
              <InputField label="Phone" name="phone" control={form.control} />
            </div>
          </div>
          {/* Email Row */}
          <div className="mb-4 flex flex-row gap-4">
            <div className="flex-1">
              <InputField label="Email" name="email" control={form.control} />
            </div>
            <div className="flex-1">
              <InputField
                label="Orders Notified Email"
                name="orders_notified_email"
                control={form.control}
              />
            </div>
          </div>
          {/* Address Row */}
          <div className="mb-4">
            <InputField label="Address" name="address" control={form.control} />
          </div>
          {/* City/State/Zip Row */}
          <div className="mb-4 flex flex-row gap-4">
            <div className="flex-1">
              <InputField label="City" name="city" control={form.control} />
            </div>
            <div className="flex-1">
              <InputField label="State" name="state" control={form.control} />
            </div>
            <div className="flex-1">
              <InputField label="Zip Code" name="zip_code" control={form.control} />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-4">
            <Button
              type="button"
              variant={'ghost'}
              disabled={isPending}
              className="mt-4"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" variant={'black'} disabled={isPending} className="mt-4">
              Update Business Info
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BranchForm;
