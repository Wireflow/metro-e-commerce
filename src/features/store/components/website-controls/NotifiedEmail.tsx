import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useBranch } from '@/hooks/queries/useMetro';
import { Row } from '@/types/supabase/table';

import { useUpdateBranch } from '../../hooks/mutations/useUpdateBranch';
import { NotifiedEmailSchema } from '../../schemas/notified-email';

const NotifiedEmail = () => {
  const { branch } = useBranch();
  const { mutate: updateBranch, isPending, error } = useUpdateBranch();

  const form = useForm<Omit<Row<'branches'>, 'branch_id'>>({
    resolver: zodResolver(NotifiedEmailSchema),
    defaultValues: {
      orders_notified_email: branch?.orders_notified_email ?? '',
    },
    mode: 'onChange',
  });

  const hasChanges = form.formState.isDirty;

  const handleSave = (data: Omit<Row<'branches'>, 'branch_id'>) => {
    updateBranch({
      orders_notified_email: data.orders_notified_email,
    });
  };

  useEffect(() => {
    if (branch) {
      form.reset({
        orders_notified_email: branch?.orders_notified_email ?? '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch]);

  return (
    <Form {...form}>
      <Card className="shadow-none">
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-lg sm:text-xl">Order Notification</CardTitle>
              <CardDescription>
                This email will get notified when a customer places an order
              </CardDescription>
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
              <div className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
                {hasChanges && 'You have unsaved changes'}
              </div>
              <Button
                onClick={form.handleSubmit(handleSave)}
                disabled={!hasChanges || isPending}
                variant="black"
                className="w-full hover:bg-gray-800 sm:w-auto"
              >
                {isPending ? 'Saving...' : hasChanges ? 'Save Changes' : 'Saved'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <div className="flex-1 space-y-2">
              <div className="flex flex-col gap-4">
                <InputField
                  label="Order Notification Email"
                  name="orders_notified_email"
                  placeholder="Email address"
                  description="Enter a reliable email address to get notified when a customer places an order"
                  control={form.control}
                />
              </div>
              {error && <div className="text-sm text-red-500">{error.message}</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default NotifiedEmail;
