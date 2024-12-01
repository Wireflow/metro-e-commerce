'use client';
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';

import CustomerAccountDetails from '../components/CustomerAccountDetails';
import CustomerOrdersHistoryTable from '../components/CustomerOrdersHistoryTable';

const CustomerDashboardPage = () => {
  const { metadata } = useUser();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold capitalize">Hello, {metadata.business_name}</p>
        <p className="text-sm lg:w-[440px]">
          From your account dashboard. you can easily check & view your{' '}
          <Link className="text-theme-sky-blue" href={'/customer/history'}>
            Recent Orders
          </Link>
          , manage your{' '}
          <Link className="text-theme-sky-blue" href={'/customer/cards-address'}>
            Shipping and Billing Addresses
          </Link>{' '}
          and edit your Password and{' '}
          <Link className="text-theme-sky-blue" href={'/settings'}>
            Account Details.
          </Link>
        </p>
      </div>
      <CustomerAccountDetails />
      <CustomerOrdersHistoryTable limit={5} action={true} TableName="Recent Orders" />
    </div>
  );
};

export default CustomerDashboardPage;
