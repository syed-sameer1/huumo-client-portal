import {
  DataTablePaginationSkeleton,
  DataTableSkeletonTable,
} from '@/components/data-table/DataTableSkeleton';
import { SKELETON_ROW_COUNT } from '../constants';
import { tableColumns } from '../TableHeader';
import { vendorColumnWidthStyle } from '../columnLayout';
import { FiltersSkeleton } from '@/components/loading-skeletons/FiltersSkeleton';

export const VendorsSkeleton = () => {
  return (
    <div className="min-w-0 space-y-6">
      <FiltersSkeleton />
      <div className="w-full min-w-0 max-w-full">
        <DataTableSkeletonTable
          rowCount={SKELETON_ROW_COUNT}
          columns={tableColumns}
          getColumnWidthStyle={vendorColumnWidthStyle}
        />
      </div>
      <DataTablePaginationSkeleton />
    </div>
  );
};
