import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AddressCard from '@/features/checkout/components/addresses/AddressCard';
import { useUser } from '@/hooks/useUser';

import { useCustomerBillingAddressClient } from '../server/useCustomerBillingAddressClient';

const CustomerBillingAddress = () => {
  const { metadata } = useUser();
  const { data, isLoading } = useCustomerBillingAddressClient({ customerId: metadata?.id });

  if (isLoading) {
    return <Skeleton className="h-full" />;
  }
  if (!data) {
    return <div>No billing address found</div>;
  }

  return (
    <AddressCard
      action={
        <Link className="mt-3 justify-self-end" href={'/customer/cards-address'}>
          <Button variant={'outline-primary'}>View All Addresses</Button>
        </Link>
      }
      options={{ showOptions: false, showName: true, showAction: true }}
      placeholderTitle="Billing Address"
      address={data[0]}
    />
  );
};

export default CustomerBillingAddress;
