import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddCardFormDialog from '@/features/checkout/components/forms/AddCardFormDialog';
import PaymentsList from '@/features/checkout/components/payments/PaymentsList';
import { usePaymentMethods } from '@/features/checkout/hooks/queries/usePaymentMethods';

const PaymentOptionsContainer = () => {
  const { data: payments } = usePaymentMethods();
  return (
    <Card className="flex w-full flex-col gap-5 shadow-none">
      <CardHeader className="flex w-full flex-row items-center justify-between border-b px-6 py-2">
        <div>
          <CardTitle className="font-medium capitalize">Your Cards</CardTitle>
        </div>
        <div>
          <AddCardFormDialog
            trigger={
              <Button variant={'ghost'} className="px-1 text-primary">
                Add Card <ArrowRight className="h-5 w-5" />
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {payments && payments.length > 0 ? (
          <PaymentsList payments={payments ?? []} />
        ) : (
          <p className="text-sm text-gray-500">You don&apos;t have any cards added</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentOptionsContainer;
