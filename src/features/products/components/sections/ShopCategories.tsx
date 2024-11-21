'use client';

import Link from 'next/link';

import { Edit } from 'lucide-react';

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

import { usePublishedCategories } from '../../hooks/queries/usePublishedCategories';
import { Category } from '../../schemas/category';
import CategoryCard from '../CategoryCard';

const ShopCategories = () => {
  const isInEditMode = useIsEditMode();
  const { data: categories, isLoading } = usePublishedCategories();

  return (
    <Container className="relative">
      <div className="relative">
        <h2 className="mb-6 text-center text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
          Shop by Category
        </h2>

        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
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
                : categories?.map((category: Category) => (
                    <CarouselItem
                      key={category.id}
                      className="max-w-[150px] pl-2 sm:basis-1/3 md:max-w-none md:basis-1/4 md:pl-4 lg:basis-1/5 xl:basis-1/6"
                    >
                      <div className="p-1 transition-transform duration-200 ease-in-out hover:scale-105">
                        <CategoryCard category={category} />
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>

            <div className="absolute -left-4 -right-4 top-0 hidden h-full md:flex">
              <CarouselPrevious
                className="absolute -left-4 top-1/2 -translate-y-1/2 translate-x-4 shadow-lg"
                variant="black"
              />
              <CarouselNext
                className="absolute -right-4 top-1/2 -translate-x-4 -translate-y-1/2 shadow-lg"
                variant="black"
              />
            </div>

            <div className="mt-4 flex justify-center gap-2 md:hidden">
              <div className="h-1.5 w-8 rounded-full bg-primary/20">
                <div className="h-full w-1/3 rounded-full bg-primary transition-all"></div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      {isInEditMode && (
        <WithAuth rules={{ requiredRole: 'admin' }}>
          <div className="absolute inset-0 flex items-center justify-center rounded-[2px] bg-black/50 transition-opacity">
            <Link href={`/admin/categories`}>
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
