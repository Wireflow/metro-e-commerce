'use client';
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';

type Props = {};

const CustomerDashboardPage = (props: Props) => {
  const { metadata } = useUser();

  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold capitalize">Hello, {metadata.business_name}</p>
        <p className="max-w-screen-md">
          From your account dashboard. you can easily check & view your{' '}
          <Link className="text-theme-sky-blue" href={'/customer/history'}>
            Recent Orders
          </Link>
          Recent Orders, manage your{' '}
          <Link className="text-theme-sky-blue" href={'/customer/cards-address'}>
            Shipping and Billing Addresses
          </Link>
          Shipping and Billing Addresses and edit your Password and{' '}
          <Link className="text-theme-sky-blue" href={'/settings'}>
            Account Details.
          </Link>
          Account Details.
        </p>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
