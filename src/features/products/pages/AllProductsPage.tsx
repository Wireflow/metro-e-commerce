'use client';

import Link from 'next/link';

import { Download, Plus } from 'lucide-react';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import PageHeader from '@/components/layout/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';

import ProductsPageSkeleton from '../components/products/AllProductsSkeleton';
import ExportProducts from '../components/products/ExportProducts';
import ProductFiltersSheet from '../components/products/ProductFiltersSheet';
import ProductList from '../components/products/ProductList';
import ProductsAnalytics from '../components/products/ProductsAnalytics';
import { usePaginatedProducts } from '../hooks/product-paginated-query';
import { useAnalytics } from '../hooks/product-query-hooks';
import { useProductFiltersStore } from '../store/useProductFilters';

const AllProductsPage = () => {
  const filters = useProductFiltersStore(state => state.filters);
  const { page, pageSize } = useProductFiltersStore(state => state.pagination);
  const setPagination = useProductFiltersStore(state => state.setPagination);

  const { data: analytics, isLoading: isLoadingAnalytics } = useAnalytics();
  const { data: productsData, isLoading: isLoadingProducts } = usePaginatedProducts(filters, {
    page,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage, pageSize });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoadingAnalytics || isLoadingProducts) return <ProductsPageSkeleton />;

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Products', href: '/admin/products/all' },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title="Products"
        description="View all products"
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex gap-3">
            <ExportProducts products={productsData?.data ?? []}>
              <Button variant={'outline'}>
                <Download className="h-5 w-5" /> Export
              </Button>
            </ExportProducts>
            <Link href={'/admin/products/add'}>
              <Button variant={'black'}>
                <Plus className="h-5 w-5" /> Add Product
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex flex-col items-start justify-between md:flex-row">
        {analytics && <ProductsAnalytics analytics={analytics} />}
        <div className="md:seld-auto self-end">
          <ProductFiltersSheet />
        </div>
      </div>

      <ProductList products={productsData?.data ?? []} />

      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalPages={productsData?.metadata.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </AnimatedDiv>
  );
};

export default AllProductsPage;
