import { Skeleton } from '../ui/skeleton';

export const FiltersSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Skeleton className="h-10 w-full max-w-md rounded-md" />
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>
    </div>
  );
};
