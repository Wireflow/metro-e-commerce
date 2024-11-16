import AnimatedDiv from '@/components/animation/AnimatedDiv';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => (
  <AnimatedDiv>
    <div className="space-y-4">
      <Skeleton className="h-8 w-[250px]" />
      <div className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  </AnimatedDiv>
);

export default LoadingSkeleton;
