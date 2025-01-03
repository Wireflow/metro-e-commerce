'use client';

import { ArrowRight, Edit } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import WithAuth from '@/features/auth/components/WithAuth';
import { useIsEditMode } from '@/features/promotions/hooks/useIsEditMode';
import { getEditModeUrl } from '@/lib/editRouting';

import { usePublishedCategories } from '../../hooks/queries/usePublishedCategories';
import CategoryCard from '../CategoryCard';

const ShopCategories = () => {
  const isInEditMode = useIsEditMode();
  const searchParams = useSearchParams();

  const { data: categories, isLoading } = usePublishedCategories();

  return (
    <Container className="relative">
      <div className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-center text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Shop by Category
          </h2>
          <Link href={getEditModeUrl('/categories', searchParams)}>
            <Button className="w-fit text-theme-sky-blue" variant={'link'}>
              <span className="hidden sm:block">Shop All Categories</span>{' '}
              <span className="block sm:hidden">Shop All</span>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <div className="relative mx-auto w-full p-4">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {isLoading
                ? Array.from([1, 2, 3, 4, 5, 6, 7, 8])?.map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="max-w-[150px] pl-2 sm:basis-1/5 md:max-w-none md:basis-1/4 md:pl-4 lg:basis-1/5 xl:basis-1/6"
                    >
                      <div className="p-1">
                        <Skeleton className="h-[158px] w-[134px] md:h-[240px] md:w-[210px]" />
                      </div>
                    </CarouselItem>
                  ))
                : categories &&
                  categories.length > 0 &&
                  categories?.map(category => (
                    <CarouselItem
                      key={category.id}
                      className="max-w-[150px] pl-2 sm:basis-1/5 md:max-w-none md:basis-1/4 md:pl-4 lg:basis-1/5 xl:basis-1/6"
                    >
                      <CategoryCard category={category} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-5 border-0 bg-black text-white" />
            <CarouselNext className="absolute -right-5 border-0 bg-black text-white" />
          </Carousel>
        </div>
      </div>

      {isInEditMode && (
        <WithAuth rules={{ requiredRole: 'admin' }}>
          <div className="absolute inset-0 flex items-center justify-center rounded-[2px] bg-black/50 transition-opacity">
            <Link href="/admin/categories">
              <Button variant="secondary" size="lg" className="w-fit gap-2">
                <Edit className="h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
          </div>
        </WithAuth>
      )}
    </Container>
  );
};

export default ShopCategories;
