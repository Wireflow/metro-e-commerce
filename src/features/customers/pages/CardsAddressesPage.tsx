'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { AddressParams, formatAddress, formatPhoneNumber } from '@/utils/utils';

import AddressCards from '../components/AddressCards';
import { useCustomerAddressClient } from '../server/useCustomerDeliveryAddressClient';

type Props = {};

const CardsAddressesPage = (props: Props) => {
  const { metadata } = useUser();
  const { data: address } = useCustomerAddressClient({ customerId: metadata?.id });
  const fullName = metadata?.first_name + ' ' + metadata?.last_name;

  const billingAddress = address?.find(address => address.type === 'billing');
  const deliveryAddress = address?.find(address => address.type === 'delivery');

  if (!address) return null;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <AddressCards
        title="Billing Address"
        name={fullName}
        address={
          billingAddress
            ? formatAddress(billingAddress as AddressParams)
            : 'No billing address available'
        }
        phone={formatPhoneNumber(metadata?.phone)}
        email={metadata?.email}
        action={
          <Link className="" href={'/customer/settings'}>
            <Button variant={'outline-primary'}>Edit Billing address</Button>
          </Link>
        }
      />
      <AddressCards
        title="Delivery Address"
        name={fullName}
        address={
          deliveryAddress
            ? formatAddress(deliveryAddress as AddressParams)
            : 'No Delivery address available'
        }
        phone={formatPhoneNumber(metadata?.phone)}
        email={metadata?.email}
        action={
          <Link className="" href={'/customer/settings'}>
            <Button variant={'outline-primary'}>Edit Delivery address</Button>
          </Link>
        }
      />
    </div>
  );
};

export default CardsAddressesPage;
