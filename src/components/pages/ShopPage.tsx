'use client';

import { useMemo } from 'react';

import FilteredProducts from '@/features/products/components/shop/FilteredProducts';
import ProductFilters from '@/features/products/components/shop/ProductFilters';
import ProductTopFilters from '@/features/products/components/shop/ProductTopFilters';
import ShopActiveFilters from '@/features/products/components/shop/ShopActiveFilters';
import { usePaginatedProducts } from '@/features/products/hooks/product-paginated-query';
import { useShopFilters } from '@/features/products/hooks/useShopFilters';
import PromoCard from '@/features/promotions/components/PromoCard';
import { usePromotedProducts } from '@/features/promotions/hooks/queries/usePromotedProducts';
import { useWishList } from '@/features/wishlist/hooks/queries/wishlist-query-hooks';
import { useIsMobile } from '@/hooks/use-mobile';

import BreadCrumbQuickUI from '../layout/BreadCrumbQuickUI';
import Container from '../layout/Container';
import Pagination from '../Pagination';
import { Separator } from '../ui/separator';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
];

const ShopPage = () => {
  useWishList();
  const isMobile = useIsMobile();
  const { data: promotions } = usePromotedProducts([8]);

  const promotion = useMemo(() => {
    if (!promotions?.length || !promotions[0]?.product) {
      return null;
    }
    return promotions[0];
  }, [promotions]);

  const {
    filters,
    categoryId,
    priceRange,
    searchQuery,
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
    selectedManufacturers,
  } = useShopFilters();

  const { data: productPages, isLoading } = usePaginatedProducts(
    {
      ...filters,
      sortOrder: 'asc',
    },
    { page, pageSize }
  );

  const products = productPages?.data;
  const metadata = productPages?.metadata;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategory = (categoryId: string | null) => {
    setCategoryId(categoryId);
    setPage(1);
  };

  return (
    <div>
      <div className="bg-gray-200">
        <Container className="flex items-center">
          <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
        </Container>
      </div>
      <Container className="mt-2 flex gap-8 md:mt-8">
        {!isMobile ? (
          <aside className="md:w-[250px] md:flex-shrink-0">
            <ProductFilters
              setSelectedManufacturers={setSelectedManufacturers}
              setCategoryId={setCategory}
              setPriceRange={setPriceRange}
              categoryId={categoryId}
              priceRange={priceRange}
              manfacturers={selectedManufacturers}
            />
            <Separator className="mt-6" />
            {promotion && (
              <div className="mt-6">
                <PromoCard
                  promotedProduct={promotion}
                  product={promotion?.product}
                  label={promotion.label ?? 'Promotion'}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col items-center">
                    <PromoCard.Label />
                    <PromoCard.Title />
                  </div>
                  <PromoCard.Image object="contain" />
                  <div className="flex flex-col items-center">
                    <PromoCard.Price />
                    <PromoCard.Description />
                  </div>
                  <PromoCard.Action className="w-full" />
                </PromoCard>
              </div>
            )}
          </aside>
        ) : null}
        <main className="w-full flex-1">
          <div className="mb-4 w-full">
            <ProductTopFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSortBy={setSortBy}
              sortBy={sortBy}
              sortOptions={sortOptions}
            />
          </div>
          <div className="mb-4">
            <ShopActiveFilters resultsCount={products?.length ?? 0} />
          </div>
          <FilteredProducts products={products ?? []} loading={isLoading} />
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={metadata?.totalPages ?? 1}
              onPageChange={handlePageChange}
              variant="round"
            />
          </div>
        </main>
      </Container>
    </div>
  );
};

export default ShopPage;
