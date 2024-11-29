'use client';

import Container from '@/components/layout/Container';
import { useCartSummary } from '@/features/cart/hooks/queries/useCartSummary';
import { useCustomerBillingAddressClient } from '@/features/customers/server/useCustomerBillingAddressClient';
import { useUser } from '@/hooks/useUser';

import BillingAddresses from '../components/BillingAddresses';

type Props = {};

const CheckoutPage = (props: Props) => {
  const { user } = useUser();

  const { data: summary } = useCartSummary();
  const { data: billingAddresses } = useCustomerBillingAddressClient({
    customerId: user?.id ?? '',
  });

  return (
    <Container>
      <BillingAddresses addresses={billingAddresses ?? []} />
    </Container>
  );
};

export default CheckoutPage;
