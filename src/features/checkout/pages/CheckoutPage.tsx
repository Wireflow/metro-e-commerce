'use client';

import { useRouter } from 'next/navigation';

import Container from '@/components/layout/Container';
import { Separator } from '@/components/ui/separator';
import { useCartSummary } from '@/features/cart/hooks/queries/useCartSummary';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useCurrentBranch } from '@/hooks/queries/useCurrentBranch';
import { useStoreStatus } from '@/hooks/useStoreStatus';

import OrderNotes from '../components/order/OrderNotes';
import PaymentOptions from '../components/payments/PaymentOptions';
import CheckoutPageSkeleton from '../components/skeletons/CheckoutPageSkeleton';
import CheckoutSummary from '../components/summary/CheckoutSummary';
import FulfillmentSummary from '../components/summary/FulfillmentSummary';
import { useDeliveryAddress } from '../hooks/queries/useDeliveryAddress';
import { usePaymentMethods } from '../hooks/queries/usePaymentMethods';

const CheckoutPage = () => {
  const router = useRouter();
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = usePaymentMethods();
  const { formattedAddress: deliveryAddress, isLoading: isLoadingDeliveryAddress } =
    useDeliveryAddress();
  const { formattedAddress: pickupAddress, isLoading: isLoadingPickupAddress } = useCurrentBranch();
  const { isOrderingAllowed } = useStoreStatus();
  const { data: summary, isLoading } = useCartSummary();

  const { orderType, cart, setNotes, notes, paymentOption, setPaymentOption } = useCartStore();

  const loaded = !!deliveryAddress && !!pickupAddress && orderType;

  if (isLoadingPaymentMethods || isLoadingDeliveryAddress || isLoadingPickupAddress) {
    return <CheckoutPageSkeleton />;
  }

  if (!summary?.cart_items.length) {
    router.push('/');
  }

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
      <div className="w-full flex-1 lg:w-auto lg:max-w-[400px]">
        {summary && (
          <CheckoutSummary
            isOrderingAllowed={isOrderingAllowed}
            cart={cart}
            notes={notes}
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
