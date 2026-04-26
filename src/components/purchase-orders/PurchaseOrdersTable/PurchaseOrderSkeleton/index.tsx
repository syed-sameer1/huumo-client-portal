'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { tableColumns } from '../TableHeader';
import { purchaseOrderColumnWidthStyle } from '../columnLayout';
import { SKELETON_ROW_COUNT } from './constants';
import {
  DataTablePaginationSkeleton,
  DataTableSkeletonTable,
} from '@/components/data-table/DataTableSkeleton';
import type { PurchaseOrders } from '@/types/purchaseOrders';
import type { ColumnDef } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import { FiltersSkeleton } from '@/components/loading-skeletons/FiltersSkeleton';

export type PurchaseOrdersSkeletonProps = {
  skeletonRowCount?: number;
  columns?: ColumnDef<PurchaseOrders, unknown>[];
  getColumnWidthStyle?: (
    col: ColumnDef<PurchaseOrders, unknown>,
  ) => CSSProperties | undefined;
};

export const PurchaseOrdersSkeleton = ({
  skeletonRowCount = SKELETON_ROW_COUNT,
  columns = tableColumns,
  getColumnWidthStyle = purchaseOrderColumnWidthStyle,
}: PurchaseOrdersSkeletonProps = {}) => {
  return (
    <div className="min-w-0 space-y-4">
      <Skeleton className="h-5 w-full max-w-2xl rounded-md" />
      <Skeleton className="h-12 w-full max-w-xl rounded-md" />
      <FiltersSkeleton />

      <div className="w-full min-w-0 max-w-full">
        <DataTableSkeletonTable
          rowCount={skeletonRowCount}
          columns={columns}
          getColumnWidthStyle={getColumnWidthStyle}
        />
      </div>

      <DataTablePaginationSkeleton />
    </div>
  );
};
