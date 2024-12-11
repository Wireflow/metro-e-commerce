// External imports
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Conditional from '@/components/Conditional';
import QuickAlert from '@/components/quick/QuickAlert';
import SummaryRow from '@/components/SummaryRow';
// Internal UI component imports
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrderMinimum } from '@/hooks/useOrderMinimum';
import { useStoreStatus } from '@/hooks/useStoreStatus';
// Utility imports
import { formatCurrency } from '@/utils/utils';

// Hook imports
import { useCartSummary } from '../hooks/queries/useCartSummary';
import { useDeliveryPossible } from '../hooks/queries/useDeliveryPossible';
import { useCartStore } from '../store/useCartStore';

// Main Component
const CartTotals = () => {
  const router = useRouter();
  const { orderType } = useCartStore();
  const { meetsMinimum, reason } = useOrderMinimum();
  const { isPossible } = useDeliveryPossible();
  const { isOrderingAllowed } = useStoreStatus();
  const { data: summary, isLoading, isFetching } = useCartSummary();

  if (isLoading) {
    return <Skeleton className="h-[350px] w-[350px] rounded-[2px] shadow-none" />;
  }

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Cart Summary</CardTitle>
      </CardHeader>

      <CardFooter className="flex w-full flex-col items-start gap-4">
        <Conditional condition={!isPossible && orderType === 'delivery'}>
          <QuickAlert
            variant="destructive"
            title="You're too far for delivery"
            description="The business address is not available within our delivery radius"
          />
        </Conditional>
        <Conditional condition={!meetsMinimum}>
          <QuickAlert
            variant="destructive"
            title="Order Does Not Meet Minimum"
            description={reason ?? 'Order does not meet minimum'}
          />
        </Conditional>
        <Conditional condition={isOrderingAllowed && meetsMinimum}>
          <QuickAlert
            variant="success"
            title="Order Meets All Requirements"
            description="Proceed to checkout to complete your order"
          />
        </Conditional>
        <div className="w-full space-y-1.5">
          <SummaryRow
            label="Quantity"
            value={String(summary?.total_quantity ?? 0)}
            labelClassName="font-semibold text-black"
            valueClassName="font-semibold text-black"
          />
          <SummaryRow
            label="Subtotal"
            value={formatCurrency(summary?.subtotal ?? 0)}
            labelClassName="font-semibold text-black"
            valueClassName="font-semibold text-black"
          />
        </div>
        <div className="w-full space-y-2">
          <Button
            size="xl"
            className="w-full text-sm"
            onClick={() => router.push('/customer/checkout')}
            disabled={
              !summary ||
              isFetching ||
              !isOrderingAllowed ||
              !meetsMinimum ||
              (!isPossible && orderType === 'delivery')
            }
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button variant={'ghost'} disabled className="w-full capitalize">
            {orderType} Order
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CartTotals;
