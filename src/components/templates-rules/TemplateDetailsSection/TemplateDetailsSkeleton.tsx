'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { TemplateDetailHeader } from './TemplateDetailHeader';

interface TemplateDetailsSkeletonProps {
  templateId: string;
}

export const TemplateDetailsSkeleton = ({
  templateId,
}: TemplateDetailsSkeletonProps) => {
  return (
    <div className="space-y-10" aria-busy aria-label="Loading template details">
      <TemplateDetailHeader
        templateId={templateId}
        title={<Skeleton className="h-8 w-64 max-w-full" />}
      />
      <div className="m-auto max-w-[900px] space-y-[20px] rounded-[8px] border border-[#E4E4E7] p-[16px]">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-full max-w-md" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-12" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        </div>
      </div>
    </div>
  );
};
