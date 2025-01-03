'use client';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';

import AddSalesRepFormDialog from '../components/AddSalesRepFormDialog';
import SalesRepsPageSkeleton from '../components/SalesRepsPageSkeleton';
import UsersList from '../components/UsersList';
import { useSalesReps } from '../hooks/queries/useSalesReps';

const SalesRepsPage = () => {
  const { data: users, isLoading } = useSalesReps();

  if (isLoading) {
    return <SalesRepsPageSkeleton />;
  }

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Sales Reps', href: '/admin/users/sales' },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title="Sales Reps"
        description="Manage your sales reps"
        breadcrumbs={breadcrumbs}
        actions={<AddSalesRepFormDialog />}
      />
      <UsersList users={users ?? []} />
    </AnimatedDiv>
  );
};

export default SalesRepsPage;
