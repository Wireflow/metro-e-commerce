'use client';

import { Users } from 'lucide-react';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import InfoCard from '@/components/InfoCard';
import PageHeader from '@/components/layout/PageHeader';
import Pagination from '@/components/Pagination';

import CustomerFiltersSheet from '../components/CustomerFilterSheet';
import CustomerPageSkeleton from '../components/CustomerPageSkeleton';
import CustomersList from '../components/CustomersList';
import { usePaginatedCustomers } from '../hooks/customer-paginated-query';
import { useCustomerFiltersStore } from '../store/useCustomerFilters';

const AllCustomersPage = () => {
  const filters = useCustomerFiltersStore(state => state.filters);
  const { page, pageSize } = useCustomerFiltersStore(state => state.pagination);
  const setPagination = useCustomerFiltersStore(state => state.setPagination);

  const { data: customers, isLoading } = usePaginatedCustomers(filters, {
    page,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage, pageSize });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <CustomerPageSkeleton />;

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Customers', href: '/admin/customers' },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title="Customers"
        description="View and manage all customers"
        breadcrumbs={breadcrumbs}
      />

      <div className="flex justify-between">
        <div className="mb-4 grid w-full grid-cols-2 flex-wrap gap-4 md:flex">
          <InfoCard
            title="Total Customers"
            className="w-full md:w-auto"
            value={customers?.metadata.total}
            icon={<Users className="h-4 w-4" />}
          />
        </div>
        <div className="flex flex-col items-start justify-between md:flex-row">
          <div className="md:seld-auto self-end">
            <CustomerFiltersSheet />
          </div>
        </div>
      </div>
      <CustomersList customers={customers?.data ?? []} />

      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalPages={customers?.metadata.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </AnimatedDiv>
  );
};

export default AllCustomersPage;
