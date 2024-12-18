'use client';

import { Package } from 'lucide-react';

import AnalyticCard from '@/components/AnalyticCard';
import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import OrdersList from '@/features/orders/components/OrdersList';
import { Order } from '@/features/orders/schemas/orders';
import { formatCurrency } from '@/utils/utils';

import CustomerProfile from '../components/CustomerProfile';
import {
  useApproveCustomer,
  useApproveCustomerTobacco,
  useBlockCustomer,
  useResetApprovalDocuments,
} from '../hooks/customer-mutuations-hooks';
import { Customer } from '../schemas/customer';

type Props = {
  customer: Customer;
  orders: Order[];
};

const CustomerDetailsPage = ({ customer, orders }: Props) => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Customers', href: '/admin/customers' },
    { label: customer.business_name ?? '', href: `/admin/customers/${customer.id}` },
  ];

  const { mutate, isPending } = useApproveCustomer();
  const { mutate: blockMutate, isPending: isBlockPending } = useBlockCustomer();
  const { mutate: resetDocuments, isPending: isResetDocumentsPending } =
    useResetApprovalDocuments();
  const { mutate: approveTobaccoMutate, isPending: isApproveTobaccoPending } =
    useApproveCustomerTobacco();

  return (
    <AnimatedDiv>
      <PageHeader
        title={'Product Details'}
        description="View & edit product details"
        breadcrumbs={breadcrumbs}
        className="flex-none"
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Left Column */}
        <div className="flex min-h-0 flex-col gap-6 overflow-auto">
          <CustomerProfile
            customer={customer}
            onApprove={() => mutate({ id: customer?.id ?? '', approved: !customer?.approved })}
            onBlock={() => blockMutate({ id: customer?.id ?? '', blocked: !customer?.blocked })}
            onResetDocuments={() => resetDocuments({ id: customer?.id ?? '' })}
            onApproveTobacco={() =>
              approveTobaccoMutate({
                id: customer?.id ?? '',
                approved: !customer?.approved_tobacco,
              })
            }
            isMutating={
              isPending || isBlockPending || isApproveTobaccoPending || isResetDocumentsPending
            }
          />
        </div>

        {/* Right Column */}
        <div className="flex min-h-0 flex-col gap-6">
          {/* Analytics Cards */}
          <div className="flex w-full flex-none flex-col gap-4 md:flex-row">
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

          {/* Orders List Card */}
          <div className="flex-1 overflow-auto">
            <OrdersList orders={orders} disabledFields={['customer', 'payment']} />
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default CustomerDetailsPage;
