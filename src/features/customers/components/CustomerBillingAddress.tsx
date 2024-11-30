import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { formatPhoneNumber } from '@/utils/utils';

import { useCustomerBillingAddressClient } from '../server/useCustomerBillingAddressClient';

type Props = {};

const CustomerBillingAddress = (props: Props) => {
  const { metadata } = useUser();
  const { data } = useCustomerBillingAddressClient({ customerId: metadata?.id });
  const address =
    data?.street +
    ', ' +
    data?.city +
    ', ' +
    data?.state +
    ' ' +
    data?.zip_code +
    ' ' +
    data?.country;
  return (
    <Card className="">
      <div className="border-b p-5 text-lg font-semibold">Billing Address</div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">
              {metadata?.first_name + ' ' + metadata?.last_name}
            </p>
            <p className="text-sm capitalize text-neutral-600">
              {address ? address : 'No billing address available'}
            </p>
          </div>
          <div>
            {' '}
            <p className="text-sm">
              Phone:{' '}
              <span className="text-neutral-600">+1 {formatPhoneNumber(metadata?.phone)}</span>
            </p>
            <p className="text-sm">
              Email: <span className="text-neutral-600">{metadata?.email}</span>
            </p>
          </div>
        </div>
        <div>
          <Link className="" href={'/customer/settings'}>
            <Button variant={'outline-primary'}>Edit Billing address</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CustomerBillingAddress;
