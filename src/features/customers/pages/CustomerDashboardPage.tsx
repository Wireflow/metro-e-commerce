'use client';
import Link from 'next/link';

import { Animate } from '@/components/animation/Animate';
import { useUser } from '@/hooks/useUser';

import RequestTobaccoApproval from '../components/approval/RequestTobaccoApproval';
import CustomerAccountDetails from '../components/CustomerAccountDetails';
import CustomerOrdersHistoryTable from '../components/CustomerOrdersHistoryTable';
import PaymentOptionsContainer from '../components/PaymentOptionsContainer';
import { useCustomerOrdersClient } from '../server/getCustomerOrdersClient';

const CustomerDashboardPage = () => {
  const { metadata } = useUser();
  const { data: orders } = useCustomerOrdersClient({ customerId: metadata.id, limit: 3 });

  return (
    <div>
      <Animate className="flex flex-col gap-5" type="bounce">
        <RequestTobaccoApproval />
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
        <PaymentOptionsContainer />
        <CustomerOrdersHistoryTable orders={orders ?? []} action={true} TableName="Recent Orders" />
      </Animate>
    </div>
  );
};

export default CustomerDashboardPage;
