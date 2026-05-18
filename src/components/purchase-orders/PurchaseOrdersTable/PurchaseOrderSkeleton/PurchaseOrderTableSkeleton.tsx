import { TableBody } from '@/components/ui/table';
import { tableColumns } from '../TableHeader';
import { SKELETON_ROW_COUNT } from './constants';
import { purchaseOrderColumnWidthStyle } from '../columnLayout';
import { DataTableSkeletonRows } from '@/components/data-table/DataTableSkeleton';
import type { PurchaseOrders } from '@/types/purchaseOrders';
import type { ColumnDef } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

export type PurchaseOrderTableSkeletonProps = {
  rowCount?: number;
  columns?: ColumnDef<PurchaseOrders, unknown>[];
  getColumnWidthStyle?: (
    col: ColumnDef<PurchaseOrders, unknown>,
  ) => CSSProperties | undefined;
};

export const PurchaseOrderTableSkeleton = ({
  rowCount = SKELETON_ROW_COUNT,
  columns = tableColumns,
  getColumnWidthStyle = purchaseOrderColumnWidthStyle,
}: PurchaseOrderTableSkeletonProps = {}) => {
  return (
    <TableBody>
      <DataTableSkeletonRows
        rowCount={rowCount}
        columns={columns}
        getColumnWidthStyle={getColumnWidthStyle}
      />
    </TableBody>
  );
};
