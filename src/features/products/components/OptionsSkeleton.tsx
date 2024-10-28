import { Skeleton } from '@/components/ui/skeleton';

const OptionsSkeleton = () => {
  return (
    <div className="max-w-screen mb-4 flex gap-2 overflow-y-auto no-scrollbar md:max-w-none">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="min-w-[200px] rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
};

export default OptionsSkeleton;
