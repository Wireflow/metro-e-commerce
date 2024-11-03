import { Filter } from 'lucide-react';

import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import OptionsSkeleton from '@/features/products/components/OptionsSkeleton';
import TableSkeleton from '@/features/products/components/TableSkeleton';

const CategoriesPageSkeleton = () => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Categories', href: '/admin/categories/all' },
  ];
  return (
    <div>
      <PageHeader
        title="Categories"
        description="View all your categories"
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

export default CategoriesPageSkeleton;
