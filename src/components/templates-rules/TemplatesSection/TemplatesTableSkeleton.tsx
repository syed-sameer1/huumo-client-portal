'use client';

import { DataTableSkeletonTable } from '@/components/data-table/DataTableSkeleton';
import { tableColumns } from './TemplatesTable';

const SKELETON_ROW_COUNT = 4;

export const TemplatesTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-md border">
      <DataTableSkeletonTable
        rowCount={SKELETON_ROW_COUNT}
        columns={tableColumns}
        getColumnWidthStyle={() => undefined}
        tableClassName="w-full border-collapse"
      />
    </div>
  );
};
