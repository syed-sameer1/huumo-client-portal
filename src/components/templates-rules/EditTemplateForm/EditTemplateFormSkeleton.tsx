'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const EditTemplateFormSkeleton = () => {
  return (
    <div className="space-y-10" aria-busy aria-label="Loading template editor">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
      <div className="m-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5 rounded-[8px] border border-[#E4E4E7] p-[16px]">
          <Skeleton className="h-6 w-40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-11 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="min-h-[280px] w-full" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};
