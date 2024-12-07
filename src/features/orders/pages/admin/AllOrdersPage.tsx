'use client';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import Pagination from '@/components/Pagination';

import ActiveFilters from '../../components/ActiveFilters';
import AllOrdersSkeleton from '../../components/AllOrdersSkeleton';
import ExportAllOrders from '../../components/ExportAllOrders';
import OrderFiltersSheet from '../../components/OrderFilterSheet';
import OrdersList from '../../components/OrdersList';
import { usePaginatedOrders } from '../../hooks/orders-query-hook';
import { useOrdersFiltersStore } from '../../store/useOrdersFilters';

const AllOrdersPage = () => {
  const filters = useOrdersFiltersStore(state => state.filters);
  const { page, pageSize } = useOrdersFiltersStore(state => state.pagination);
  const setPagination = useOrdersFiltersStore(state => state.setPagination);

  const { data: ordersData, isLoading: isLoadingOrders } = usePaginatedOrders(filters, {
    page,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage, pageSize });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoadingOrders) return <AllOrdersSkeleton />;

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Orders', href: '/admin/orders/all' },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title="Orders"
        description="View all orders"
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex flex-wrap gap-4">
            <ExportAllOrders>Export All</ExportAllOrders>
            <OrderFiltersSheet />
          </div>
        }
      />

      <ActiveFilters />
      <OrdersList orders={ordersData?.data ?? []} />
      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalPages={ordersData?.metadata.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </AnimatedDiv>
  );
};

export default AllOrdersPage;
