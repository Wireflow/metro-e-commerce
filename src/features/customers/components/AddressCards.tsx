import { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { formatPhoneNumber } from '@/utils/utils';

type Props = {
  address: string;
  phone: string;
  email: string;
  title: string;
  action?: ReactNode;
  name: string;
};

const AddressCards = ({ address, phone, email, title, action, name }: Props) => {
  return (
    <Card className="">
      <div className="border-b p-5 text-lg font-semibold">{title}</div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm capitalize text-neutral-600 sm:w-64">
              {address ? address : 'No billing address available'}
            </p>
          </div>
          <div>
            {' '}
            <p className="text-sm">
              Phone: <span className="text-neutral-600">+1 {formatPhoneNumber(phone)}</span>
            </p>
            <p className="text-sm">
              Email: <span className="text-neutral-600">{email}</span>
            </p>
          </div>
        </div>
        {action && action}
      </div>
    </Card>
  );
};

export default AddressCards;
