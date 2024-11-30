'use client';

import Container from '@/components/layout/Container';
import { Separator } from '@/components/ui/separator';
import CartTotals from '@/features/cart/components/CartTotals';
import { useCartSummary } from '@/features/cart/hooks/queries/useCartSummary';
import { useUser } from '@/hooks/useUser';

import OrderNotes from '../components/order/OrderNotes';
import PaymentOptions from '../components/payments/PaymentOptions';
import { usePaymentMethods } from '../hooks/queries/usePaymentMethods';

type Props = {};

const CheckoutPage = (props: Props) => {
  const { user } = useUser();

  const { data: summary } = useCartSummary();

  // Payment
  const { data: paymentMethods } = usePaymentMethods();

  return (
    <Container className="flex flex-col items-start gap-4 md:gap-8 lg:flex-row">
      <div className="w-full flex-1 space-y-6">
        <PaymentOptions payments={paymentMethods ?? []} />
        <Separator />
        <OrderNotes />
      </div>
      <div className="w-full md:w-auto">
        <CartTotals />
      </div>
    </Container>
  );
};

export default CheckoutPage;
