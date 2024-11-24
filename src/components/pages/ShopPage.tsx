'use client';

import FilteredProducts from '@/features/products/components/shop/FilteredProducts';
import ProductFilters from '@/features/products/components/shop/ProductFilters';
import ProductTopFilters from '@/features/products/components/shop/ProductTopFilters';
import { usePaginatedProducts } from '@/features/products/hooks/product-paginated-query';
import { useShopFilters } from '@/features/products/hooks/useShopFilters';

import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import Pagination from '../Pagination';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
];

const ShopPage = () => {
  const {
    filters,
    categoryId,
    priceRange,
    searchQuery,
    selectedManufacturers,
    sortBy,
    setCategoryId,
    setPriceRange,
    setSearchQuery,
    setSelectedManufacturers,
    setSortBy,
    sortOptions,
    setPage,
    page,
    pageSize,
  } = useShopFilters();

  const { data: productPages, isLoading } = usePaginatedProducts(filters, { page, pageSize });

  const products = productPages?.data;
  const metadata = productPages?.metadata;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="bg-gray-200">
        <Container className="flex items-center">
          <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
        </Container>
      </div>
      <Container className="mt-8 flex gap-8">
        <aside className="w-[250px] flex-shrink-0">
          <ProductFilters
            setSelectedManufacturers={setSelectedManufacturers}
            setCategoryId={setCategoryId}
            setPriceRange={setPriceRange}
            selectedManufacturers={selectedManufacturers}
            categoryId={categoryId}
            priceRange={priceRange}
          />
        </aside>
        <main className="flex-1">
          <div className="mb-4">
            <ProductTopFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSortBy={setSortBy}
              sortBy={sortBy}
              sortOptions={sortOptions}
            />
          </div>
          <FilteredProducts products={products ?? []} loading={isLoading} />
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={metadata?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </Container>
    </div>
  );
};

export default ShopPage;
