'use client';

import { Download, Filter, Plus } from 'lucide-react';
import Link from 'next/link';

import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';

import OptionsSkeleton from '../OptionsSkeleton';
import TableSkeleton from '../TableSkeleton';

const ProductsPageSkeleton = () => {
  return (
    <div>
      <PageHeader
        title="Products"
        description="View all products"
        actions={
          <div className="flex gap-3">
            <Button variant={'outline'} disabled>
              <Download className="h-5 w-5" /> Export
            </Button>
            <Link href={'/admin/products/add'}>
              <Button variant={'black'}>
                <Plus className="h-5 w-5" /> Add Product
              </Button>
            </Link>
          </div>
        }
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

export default ProductsPageSkeleton;
