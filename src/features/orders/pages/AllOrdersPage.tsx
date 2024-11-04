'use client';

import { Download } from 'lucide-react';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import ProductsPageSkeleton from '@/features/products/components/products/AllProductsSkeleton';
import ExportProducts from '@/features/products/components/products/ExportProducts';

import ActiveFilters from '../components/ActiveFilters';
import OrderFiltersSheet from '../components/OrderFilterSheet';
import OrdersList from '../components/OrdersList';
import { usePaginatedOrders } from '../hooks/orders-query-hook';
import { useOrdersFiltersStore } from '../store/useOrdersFilters';

const AllOrdersPage = () => {
  const filters = useOrdersFiltersStore(state => state.filters);
  const { page, pageSize } = useOrdersFiltersStore(state => state.pagination);
  const setPagination = useOrdersFiltersStore(state => state.setPagination);

  // const { data: analytics, isLoading: isLoadingAnalytics } = useAnalytics();
  const { data: ordersData, isLoading: isLoadingOrders } = usePaginatedOrders(filters, {
    page,
    pageSize,
  });

  // console.log(ordersData?.data.map(order => order.customer?.business_name));
  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage, pageSize });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoadingOrders) return <ProductsPageSkeleton />;

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
          <div className="flex gap-3">
            <ExportProducts products={ordersData?.data ?? []}>
              <Button variant={'outline'}>
                <Download className="h-5 w-5" /> Export
              </Button>
            </ExportProducts>
          </div>
        }
      />

      <div className="flex flex-col items-start justify-end md:flex-row">
        <div className="md:seld-auto self-end">
          <OrderFiltersSheet />
        </div>
      </div>
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
