// External imports
import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';

import Conditional from '@/components/Conditional';
import SummaryRow from '@/components/SummaryRow';
// Internal UI component imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useStoreStatus } from '@/hooks/useStoreStatus';
// Utility imports
import { formatCurrency } from '@/utils/utils';

// Hook imports
import { useCartSummary } from '../hooks/queries/useCartSummary';
import { useCartStore } from '../store/useCartStore';

// Main Component
const CartTotals = () => {
  const router = useRouter();
  const { orderType } = useCartStore();
  const { isOrderingAllowed } = useStoreStatus();
  const { data: summary, isLoading, isFetching } = useCartSummary();

  if (isLoading) {
    return <Skeleton className="h-[350px] w-[350px] rounded-[2px] shadow-none" />;
  }

  const getTotal = () => {
    if (orderType === 'delivery') {
      return summary?.cart_total_with_delivery ?? 0;
    }

    return summary?.cart_total ?? 0;
  };

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Cart Totals</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <SummaryRow label="Subtotal" value={formatCurrency(summary?.subtotal ?? 0)} />
        <SummaryRow label="Discount" value={formatCurrency(summary?.total_discount ?? 0)} />
        <SummaryRow label="Shipping" value={formatCurrency(0)} />

        <SummaryRow label="Tax" value={formatCurrency(summary?.total_tax ?? 0)} />
        <Conditional condition={orderType === 'delivery'}>
          <SummaryRow
            label="Delivery Fee"
            value={formatCurrency(summary?.expected_delivery_fee ?? 0)}
          />
        </Conditional>
      </CardContent>

      <CardFooter className="flex w-full flex-col items-start gap-4 border-t border-gray-200 p-6">
        <div className="w-full space-y-1.5">
          <SummaryRow label="Quantity" value={String(summary?.total_quantity ?? 0)} />
          <SummaryRow label="Total" value={formatCurrency(getTotal() ?? 0)} />
        </div>
        <div className="space-y-2">
          <Button
            size="xl"
            className="w-full text-sm"
            onClick={() => router.push('/customer/checkout')}
            disabled={!summary || isFetching || !isOrderingAllowed}
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
