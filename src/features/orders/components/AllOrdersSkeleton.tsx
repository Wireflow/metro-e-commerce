'use client';

import { Filter } from 'lucide-react';

import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import OptionsSkeleton from '@/features/products/components/OptionsSkeleton';
import TableSkeleton from '@/features/products/components/TableSkeleton';

const breadcrumbs = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Orders', href: '/admin/orders/all' },
];

const AllOrdersSkeleton = () => {
  return (
    <div>
      <PageHeader
        title="Orders"
        description="View all orders"
        breadcrumbs={breadcrumbs}
        // actions={
        //   <div className="flex gap-3">
        //     <ExportProducts products={ordersData?.data ?? []}>
        //       <Button variant={'outline'}>
        //         <Download className="h-5 w-5" /> Export
        //       </Button>
        //     </ExportProducts>
        //   </div>
        // }
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

export default AllOrdersSkeleton;
