'use client';

import Link from 'next/link';

import { Plus } from 'lucide-react';

import AnimatedDiv from '@/components/animation/AnimatedDiv';
import InfoCard from '@/components/InfoCard';
import PageHeader from '@/components/layout/PageHeader';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';

import CategoryFiltersSheet from '../../components/categories/CategoryFiltersSheet';
import CategoryList from '../../components/categories/CategoryList';
import ProductsPageSkeleton from '../../components/products/AllProductsSkeleton';
import { usePaginedCategories } from '../../hooks/category-paginated-query';
import { useCategoryFiltersStore } from '../../store/useCategoryFilters';

const AllCategoriesPage = () => {
  const filters = useCategoryFiltersStore(state => state.filters);
  const { page, pageSize } = useCategoryFiltersStore(state => state.pagination);
  const setPagination = useCategoryFiltersStore(state => state.setPagination);

  const { data: categories, isLoading: isLoadingCategories } = usePaginedCategories(filters, {
    page,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage, pageSize });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoadingCategories) return <ProductsPageSkeleton />;

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Categories', href: '/admin/categories/all' },
  ];

  return (
    <AnimatedDiv>
      <PageHeader
        title="Categories"
        description="View all your categories"
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex gap-3">
            <Link href={'/admin/categories/add'}>
              <Button variant={'black'}>
                <Plus className="h-5 w-5" /> Add Category
              </Button>
            </Link>
          </div>
        }
      />
      <div className="flex items-start justify-between">
        <InfoCard title="Total Categories" value={categories?.metadata.total ?? 0} variant="info" />
        <div className="md:seld-auto self-end">
          <CategoryFiltersSheet />
        </div>
      </div>

      <CategoryList categories={categories?.data ?? []} />

      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalPages={categories?.metadata.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </AnimatedDiv>
  );
};

export default AllCategoriesPage;
