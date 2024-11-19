'use client';

import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const BestDealsSkeleton = ({ className }: Props) => {
  return (
    <Container className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" /> {/* Title */}
        <Skeleton className="h-6 w-40" /> {/* Browse All Button */}
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 md:grid-cols-12">
        {/* Featured Product Skeleton */}
        <div className="bg-card md:col-span-4">
          <div className="flex h-full flex-col justify-between gap-4 p-4">
            <div className="relative flex-1">
              {/* Badges */}
              <div className="absolute right-0 top-0 z-10 flex flex-col gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              {/* Featured Image */}
              <Skeleton className="aspect-square w-full" />
            </div>

            <div className="flex flex-col gap-3">
              {/* Title and Price */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="bg-card md:col-span-8">
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
            {/* Generate 8 product card skeletons */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-4 p-4">
                <Skeleton className="aspect-square w-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BestDealsSkeleton;
