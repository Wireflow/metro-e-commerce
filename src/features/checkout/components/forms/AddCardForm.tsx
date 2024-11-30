import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useCreateCard } from '../../hooks/mutations/useCreateCard';
import { CreateCardSchema, CreateCardType } from '../../schemas/create-card';

type Props = {
  onSuccess?: () => void;
  setOpen?: (open: boolean) => void;
};

const AddCardForm = ({ onSuccess, setOpen }: Props) => {
  const { mutate: createCard, isPending } = useCreateCard();

  const form = useForm<CreateCardType>({
    resolver: zodResolver(CreateCardSchema),
    defaultValues: {
      cardholder: '',
      number: '',
      expiration: '',
      cvc: '',
    },
    mode: 'onChange',
  });

  const isDirty = form.formState.isDirty;

  const onSubmit = (data: CreateCardType) => {
    if (!isDirty || !form.formState.isValid) return;

    createCard(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <div className="max-h-[calc(100vh-220px)] w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              className="w-full"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Expire Date"
                name="expiration"
                placeholder="ex. 12/20"
                control={form.control}
                className="w-full"
              />
              <InputField
                label="CVC"
                name="cvc"
                placeholder="ex. 123"
                control={form.control}
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
