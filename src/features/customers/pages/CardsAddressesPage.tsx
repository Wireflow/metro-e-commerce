'use client';

import Link from 'next/link';

import { Animate } from '@/components/animation/Animate';
import { Button } from '@/components/ui/button';
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
    <div>
      <Animate className="flex flex-col gap-5" type="bounce">
        <PaymentOptionsContainer />

        <AddressesCardContainer address={billingAddress} title="Billing Addresses" />

        <AddressCard
          placeholderTitle="Delivery Address"
          action={
            <Link className="text-primary" href="/customer/settings">
              <Button variant="outline-primary">
                <span className="hidden md:inline">Edit Delivery Address</span>
              </Button>
            </Link>
          }
          options={{ showAction: true, showOptions: false }}
          address={deliveryAddress}
        />
      </Animate>
    </div>
  );
};

export default CardsAddressesPage;
