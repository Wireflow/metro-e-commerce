import Container from '@/components/layout/Container';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const CheckoutPageSkeleton = () => {
  return (
    <Container className="flex flex-col items-start gap-4 md:gap-8 lg:flex-row">
      <div className="w-full flex-1 space-y-6">
        <div>
          <p className="mb-4 font-semibold md:text-lg">Fulfillment Details</p>
          <Skeleton className="h-[322px] w-full rounded-[2px] shadow-none" />
        </div>

        <div>
          <p className="mb-4 font-semibold md:text-lg">Choose Payment </p>
          <Skeleton className="h-[322px] w-full rounded-[2px] shadow-none" />
        </div>

        <div>
          <p className="mb-4 font-semibold md:text-lg">Additional Information </p>
          <Skeleton className="h-[322px] w-full rounded-[2px] shadow-none" />
        </div>
        <Separator />
      </div>
      <div className="w-full flex-1 lg:w-auto lg:max-w-[400px]">
        <Skeleton className="h-[350px] w-[350px] rounded-[2px] shadow-none" />
      </div>
    </Container>
  );
};

export default CheckoutPageSkeleton;
