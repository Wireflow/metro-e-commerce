'use client';

import PageHeader from '@/components/layout/PageHeader';

import UsersList from '../components/UsersList';
import { useSalesReps } from '../hooks/queries/useSalesReps';

const SalesRepsPage = () => {
  const { data: users, isLoading } = useSalesReps();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Sales Reps', href: '/admin/users/sales' },
  ];

  return (
    <div>
      <PageHeader
        title="Sales Reps"
        description="Manage your sales reps"
        breadcrumbs={breadcrumbs}
      />
      <UsersList users={users ?? []} />
    </div>
  );
};

export default SalesRepsPage;
