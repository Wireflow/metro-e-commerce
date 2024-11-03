'use client';

import { Package } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import { Row } from '@/types/supabase/table';
import { formatCurrency } from '@/utils/utils';

import CustomerProfile from '../components/CustomerProfile';
import { useApproveCustomer } from '../hooks/customer-mutuations-hooks';
import { Customer } from '../schemas/customer';

type Props = {
  customer: Customer;
  orders: Row<'orders'>[];
};

const CustomerDetailsPage = ({ customer }: Props) => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Customers', href: '/admin/customers' },
    { label: customer.business_name ?? '', href: `/admin/customers/${customer.id}` },
  ];

  const { mutate, isPending } = useApproveCustomer();

  return (
    <AnimatedDiv>
      <PageHeader
        title={'Product Details'}
        description="View & edit product details"
        breadcrumbs={breadcrumbs}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <CustomerProfile
          customer={customer}
          onApprove={() => mutate({ id: customer?.id ?? '', approved: true })}
          isMutating={isPending}
        />
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <AnalyticCard
            title="Total Spent"
            className="flex-1"
            value={formatCurrency(customer.total_spent ?? 0)}
            variant="minimal"
            icon={Package}
          />
          <AnalyticCard
            title="Orders"
            className="flex-1 lg:flex-[0.7]"
            value={customer.order_count ?? 0}
            variant="minimal"
            icon={Package}
          />
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default CustomerDetailsPage;
