import {
  DataTablePaginationSkeleton,
  DataTableSkeletonTable,
} from '@/components/data-table/DataTableSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { SKELETON_ROW_COUNT } from './constants';
import { rolesColumnWidthStyle } from '../RolesTable/columnLayout';
import { tableColumns } from '../RolesTable/TableHeader';

export const RolesSkeleton = () => {
  return (
    <div className="min-w-0 space-y-4">
      <Skeleton className="h-5 w-full max-w-2xl rounded-md" />
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 w-full">
        <Skeleton className="h-10 w-[100px] shrink-0 rounded-md" />
        <Skeleton className="h-10 w-full max-w-md flex-1 rounded-md" />
      </div>

      <div className="w-full min-w-0 max-w-full">
        <DataTableSkeletonTable
          rowCount={SKELETON_ROW_COUNT}
          columns={tableColumns}
          getColumnWidthStyle={rolesColumnWidthStyle}
        />
      </div>

      <DataTablePaginationSkeleton />
    </div>
  );
};
