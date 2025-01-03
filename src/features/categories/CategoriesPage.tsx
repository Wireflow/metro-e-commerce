'use client';
import SubscribeToNewsLetter from '@/components/landing/subscribe/SubscribeToNewsLetter';
import BreadCrumbQuickUI from '@/components/layout/BreadCrumbQuickUI';
import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';

import CategoryPageCard from '../products/components/CategoryPageCard';
import { useCategories } from '../products/hooks/category-query-hooks';

type Props = {};

const CategoriesPage = (props: Props) => {
  const { data: categories, isLoading } = useCategories();
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop by Category', href: '/categories' },
  ];

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-[50px] w-full rounded-[4px]" />
        <Container className="grid w-full gap-4 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full rounded-[4px]" />
          ))}
        </Container>
      </div>
    );
  }

  return (
    <>
      <BreadCrumbQuickUI breadcrumbs={breadcrumbs} />
      <Container className="grid grid-cols-2 gap-4 py-10 md:grid-cols-3 lg:grid-cols-4">
        {categories?.map((category, index) => {
          return <CategoryPageCard className="w-full" key={index} category={category} />;
        })}
      </Container>
      <SubscribeToNewsLetter />
    </>
  );
};

export default CategoriesPage;
