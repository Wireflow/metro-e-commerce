import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddCardFormDialog from '@/features/checkout/components/forms/AddCardFormDialog';
import PaymentsList from '@/features/checkout/components/payments/PaymentsList';
import { usePaymentMethods } from '@/features/checkout/hooks/queries/usePaymentMethods';

const PaymentOptionsContainer = () => {
  const { data: payments } = usePaymentMethods();
  return (
    <Card className="flex w-full flex-col gap-5 shadow-none">
      <CardHeader className="flex w-full flex-row items-center justify-between border-b p-4">
        <div>
          <CardTitle className="font-medium capitalize">Payment Option</CardTitle>
        </div>
        <div>
          <AddCardFormDialog
            trigger={
              <div className="flex cursor-pointer items-center font-semibold text-primary hover:text-theme-sky-blue">
                Add Card <ArrowRight className="ml-1 h-5 w-5" />
              </div>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <PaymentsList payments={payments ?? []} />
      </CardContent>
    </Card>
  );
};

export default PaymentOptionsContainer;
