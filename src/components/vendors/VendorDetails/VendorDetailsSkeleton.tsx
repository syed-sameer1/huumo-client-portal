import { Skeleton } from '@/components/ui/skeleton';

export function VendorDetailsSkeleton() {
  return (
    <div
      className="space-y-6 overflow-y-auto py-4"
      aria-busy
      aria-label="Loading vendor details"
    >
      <div className="flex w-fit items-center gap-3">
        <Skeleton className="h-6 w-11 rounded-full" />
        <Skeleton className="h-5 w-28" />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-56 max-w-full" />
        </div>
        <div className="space-y-2 text-right">
          <Skeleton className="ml-auto h-5 w-28" />
          <Skeleton className="ml-auto h-4 w-24" />
        </div>
      </div>

      {[1, 2, 3].map((group) => (
        <div key={group} className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <div className="flex gap-3">
            <Skeleton className="h-[88px] flex-1 rounded-[6px]" />
            <Skeleton className="h-[88px] flex-1 rounded-[6px]" />
          </div>
        </div>
      ))}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-52 max-w-[70%]" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
        <div className="overflow-hidden rounded-md border">
          <div className="flex gap-4 border-b bg-muted/30 px-4 py-3">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          {[1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="flex gap-4 border-b px-4 py-4 last:border-b-0 even:bg-[#20A6650D]"
            >
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
