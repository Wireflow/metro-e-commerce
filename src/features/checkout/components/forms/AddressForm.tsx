import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { SelectField } from '@/components/form/SelectField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { STATES } from '@/data/constants';
import { Enum } from '@/types/supabase/enum';

import { useCreateAddress } from '../../hooks/mutations/useCreateAddress';
import { CreateAddressSchema, CreateAddressType } from '../../schemas/create-address';

type Props = {
  type: Enum<'address_type'>;
  onSuccess?: () => void;
};

const AddressForm = ({ type, onSuccess }: Props) => {
  const { mutate: createAddress, isPending } = useCreateAddress();

  const form = useForm<CreateAddressType>({
    resolver: zodResolver(CreateAddressSchema),
    defaultValues: {
      name: '',
      street: '',
      city: '',
      state: '',
      zip_code: '',
      country: 'United States',
      type: type ?? 'billing',
    },
    mode: 'onChange',
  });

  const isDirty = form.formState.isDirty;

  const onSubmit = (data: CreateAddressType) => {
    if (!isDirty || !form.formState.isValid) return;

    createAddress(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <div className="max-h-[calc(100vh-220px)] w-full overflow-y-auto px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <h3 className="mb-3 text-base font-semibold sm:text-lg">Personal Information</h3>
              <InputField
                label="Full Name"
                name="name"
                placeholder="John Doe"
                control={form.control}
                className="w-full"
              />
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold sm:text-lg">Address</h3>
              <InputField
                label="Street Address"
                name="street"
                placeholder="123 Main St"
                control={form.control}
                className="w-full"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <InputField
                  label="City"
                  name="city"
                  placeholder="Lincoln Park"
                  control={form.control}
                  className="w-full"
                />
              </div>
              <div>
                <SelectField
                  name="state"
                  placeholder="MI"
                  label="State/Province"
                  control={form.control}
                  options={STATES}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <InputField
                  label="Postal Code"
                  name="zip_code"
                  placeholder="10001"
                  control={form.control}
                  className="w-full"
                />
              </div>
              <div>
                <InputField
                  label="Country"
                  name="country"
                  placeholder="United States"
                  control={form.control}
                  className="w-full"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 mt-6 flex justify-end gap-3 border-t bg-white pt-4">
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
                'Save Address'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
