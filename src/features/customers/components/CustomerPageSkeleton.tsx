import { Filter } from 'lucide-react';

import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import OptionsSkeleton from '@/features/products/components/OptionsSkeleton';
import TableSkeleton from '@/features/products/components/TableSkeleton';

const CustomerPageSkeleton = () => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Customers', href: '/admin/customers' },
  ];

  return (
    <div>
      <PageHeader
        title="Customers"
        description="View and manage all customers"
        breadcrumbs={breadcrumbs}
      />

      <div className="flex items-start justify-between">
        <OptionsSkeleton />

        <div>
          <Button variant={'minimal'} disabled>
            <Filter className="h-5 w-5" /> Filter Records
          </Button>
        </div>
      </div>

      <TableSkeleton />
    </div>
  );
};

export default CustomerPageSkeleton;
