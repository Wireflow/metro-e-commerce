import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCustomerBillingAddressClient } from '@/features/customers/server/useCustomerBillingAddressClient';
import { useUser } from '@/hooks/useUser';
import { Row } from '@/types/supabase/table';
import { formatCardNumber, formatExpiration } from '@/utils/utils';

import { useCreateCard } from '../../hooks/mutations/useCreateCard';
import { CreateCardSchema, CreateCardType } from '../../schemas/create-card';
import AddressesList from '../addresses/AddressesList';

type Props = {
  onSuccess?: () => void;
  setOpen?: (open: boolean) => void;
};

const AddCardForm = ({ onSuccess, setOpen }: Props) => {
  const { mutate: createCard, isPending } = useCreateCard();
  const { user } = useUser();
  const { data: addresses } = useCustomerBillingAddressClient({ customerId: user?.id ?? '' });
  const [selectedAddress, setSelectedAddress] = useState<Row<'addresses'> | null>(null);

  const form = useForm<CreateCardType>({
    resolver: zodResolver(CreateCardSchema),
    defaultValues: {
      cardholder: '',
      number: '',
      expiration: '',
      cvc: '',
      billing_address_id: addresses && addresses.length > 0 ? addresses[0]?.id : '',
    },
    mode: 'onChange',
  });

  const isDirty = form.formState.isDirty;

  const onSubmit = (data: CreateCardType) => {
    createCard(data, {
      onSuccess: () => {
        form.reset({
          cardholder: '',
          number: '',
          expiration: '',
          cvc: '',
          billing_address_id: addresses && addresses.length > 0 ? addresses[0]?.id : '',
        });
        onSuccess?.();
      },
    });
  };

  const { field: numberField } = useController({
    control: form.control,
    name: 'number',
  });

  const { field: expirationField } = useController({
    control: form.control,
    name: 'expiration',
  });

  const handleSelectAddress = (address: Row<'addresses'> | null) => {
    if (!address) return;

    setSelectedAddress(address);
    form.setValue('billing_address_id', address?.id);
  };

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
      form.setValue('billing_address_id', addresses[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses, form]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <AddressesList
              addresses={addresses ?? []}
              containerClassName="grid grid-cols-1  md:grid-cols-3"
              selected={selectedAddress}
              onSelect={handleSelectAddress}
              cardOptions={{
                showTitle: false,
                showSelection: true,
                showName: true,
                showAction: false,
                showOptions: false,
              }}
            />
          </div>
          <div className="grid gap-4">
            <InputField
              label="Name on Card"
              name="cardholder"
              placeholder="John Doe"
              control={form.control}
              className="w-full"
            />
            <InputField
              label="Card Number"
              name="number"
              placeholder="ex 1234 5678 9012 3456"
              control={form.control}
              value={formatCardNumber(numberField.value)}
              onChange={e => {
                const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 16);
                numberField.onChange(formattedValue);
              }}
              className="w-full"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Expire Date"
                name="expiration"
                placeholder="ex. 12/20"
                control={form.control}
                value={formatExpiration(expirationField.value)}
                onChange={e => {
                  const formattedValue = e.target.value.replace(/\D/g, '').slice(0, 4);
                  expirationField.onChange(formattedValue);
                }}
                className="w-full"
              />
              <InputField
                label="CVC"
                name="cvc"
                placeholder="ex. 123"
                control={form.control}
                onChange={e => form.setValue('cvc', e.target.value.replace(/\D/g, '').slice(0, 3))}
                className="w-full"
              />
            </div>
          </div>

          <div className="sticky bottom-0 mt-6 flex justify-end gap-3 border-t bg-white pt-4">
            <Button
              onClick={() => {
                form.reset();
                setOpen?.(false);
              }}
              type="button"
              variant={'outline'}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isDirty || isPending} className="px-3 sm:px-4">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                'Add Card'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCardForm;
