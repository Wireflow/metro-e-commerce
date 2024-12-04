'use client';

import AddressCard from '@/features/checkout/components/addresses/AddressCard';
import { useUser } from '@/hooks/useUser';

import AddressesCardContainer from '../components/AddressesCardContainer';
import PaymentOptionsContainer from '../components/PaymentOptionsContainer';
import { useCustomerBillingAddressClient } from '../server/useCustomerBillingAddressClient';
import { useCustomerDeliveryAddressClient } from '../server/useCustomerDeliveryAddressClient';

const CardsAddressesPage = () => {
  const { metadata } = useUser();
  const { data: billingAddress } = useCustomerBillingAddressClient({ customerId: metadata?.id });
  const { data: deliveryAddress } = useCustomerDeliveryAddressClient({ customerId: metadata?.id });

  if (!billingAddress || !deliveryAddress) return null;

  return (
    <div className="flex flex-col gap-5">
      <PaymentOptionsContainer />
      <AddressesCardContainer address={billingAddress} title="Billing Addresses" />
      <AddressCard
        address={deliveryAddress}
        options={{ showOptions: false }}
        placeholderTitle="Delivery Address"
      />
    </div>
  );
};

export default CardsAddressesPage;
