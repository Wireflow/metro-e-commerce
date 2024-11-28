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
    <Card>
      <div className="border-b p-5 text-lg font-semibold">Billing Address</div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-lg font-semibold">
              {metadata?.first_name + ' ' + metadata?.last_name}
            </p>
            <p className="text-md capitalize text-neutral-600">{address} </p>
          </div>
        </div>
        <div>
          {' '}
          <p>
            Phone: <span className="text-neutral-600">+1 {formatPhoneNumber(metadata?.phone)}</span>
          </p>
          <p>
            Email: <span className="text-neutral-600">{metadata?.email}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CustomerBillingAddress;
