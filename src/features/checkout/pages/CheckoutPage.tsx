'use client';

import Container from '@/components/layout/Container';
import { Separator } from '@/components/ui/separator';
import { useCartSummary } from '@/features/cart/hooks/queries/useCartSummary';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useCurrentBranch } from '@/hooks/queries/useCurrentBranch';
import { useStoreStatus } from '@/hooks/useStoreStatus';

import OrderNotes from '../components/order/OrderNotes';
import PaymentOptions from '../components/payments/PaymentOptions';
import CheckoutSummary from '../components/summary/CheckoutSummary';
import FulfillmentSummary from '../components/summary/FulfillmentSummary';
import { useDeliveryAddress } from '../hooks/queries/useDeliveryAddress';
import { usePaymentMethods } from '../hooks/queries/usePaymentMethods';

const CheckoutPage = () => {
  const { data: paymentMethods } = usePaymentMethods();
  const { formattedAddress: deliveryAddress } = useDeliveryAddress();
  const { formattedAddress: pickupAddress } = useCurrentBranch();
  const { isOrderingAllowed } = useStoreStatus();
  const { data: summary, isLoading } = useCartSummary();

  const { orderType, cart, setNotes, notes, paymentOption, setPaymentOption } = useCartStore();

  const loaded = !!deliveryAddress && !!pickupAddress && orderType;

  return (
    <Container className="flex flex-col items-start gap-4 md:gap-8 lg:flex-row">
      <div className="w-full flex-1 space-y-6">
        {loaded && (
          <FulfillmentSummary
            deliveryAddress={deliveryAddress}
            pickupAddress={pickupAddress}
            orderType={orderType}
          />
        )}
        <PaymentOptions
          payments={paymentMethods ?? []}
          onPaymentOptionChange={setPaymentOption}
          paymentOption={paymentOption}
          orderType={orderType}
        />
        <Separator />
        <OrderNotes onNotesChange={setNotes} notes={notes} />
      </div>
      <div className="w-full flex-1 md:w-auto md:max-w-[400px]">
        {summary && (
          <CheckoutSummary
            isOrderingAllowed={isOrderingAllowed}
            cart={cart}
            summary={summary}
            loading={isLoading}
            orderType={orderType}
          />
        )}
      </div>
    </Container>
  );
};

export default CheckoutPage;
