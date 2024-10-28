import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="rounded-lg bg-white">
      {/* Table Header */}
      <div className="border-b p-4">
        <div className="grid grid-cols-6 gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Table Rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b p-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
