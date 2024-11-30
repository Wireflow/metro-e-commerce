import { ReactNode } from 'react';

import { formatPhoneNumber } from '@/utils/utils';

type Props = {
  title: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  action?: ReactNode;
};

const OrderAddresses = ({ title, name, address, phone, email, action }: Props) => {
  return (
    <div className="flex flex-col gap-5 border-b border-gray-200 py-5 lg:px-5 xl:border-b-0 xl:border-r">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm">{address}</p>
        <p className="text-sm font-semibold">
          Phone Number: {''}
          <span className="font-normal text-neutral-500"> +1 {formatPhoneNumber(phone)}</span>
        </p>
        <p className="text-sm font-semibold">
          Email: <span className="font-normal text-neutral-500">{email}</span>
        </p>
      </div>
      {action && action}
    </div>
  );
};

export default OrderAddresses;
