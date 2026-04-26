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
      <div className="flex items-center justify-between gap-3 w-full">
        <Skeleton className="h-[40px] w-[320px] rounded-md" />
        <Skeleton className="w-[100px] h-[35px] rounded-md" />
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
