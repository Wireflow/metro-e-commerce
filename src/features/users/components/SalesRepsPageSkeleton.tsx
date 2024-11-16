'use client';

import PageHeader from '@/components/layout/PageHeader';
import TableSkeleton from '@/features/products/components/TableSkeleton';

const breadcrumbs = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Sales Reps', href: '/admin/users/sales' },
];

const SalesRepsPageSkeleton = () => {
  return (
    <div>
      <PageHeader
        title="Sales Reps"
        description="Manage your sales reps"
        breadcrumbs={breadcrumbs}
      />

      <TableSkeleton />
    </div>
  );
};

export default SalesRepsPageSkeleton;
