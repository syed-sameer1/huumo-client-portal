'use client';

import type { CSSProperties } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getDataTableColumnKey } from './columnKey';

export type DataTableSkeletonProps<TData> = {
  rowCount: number;
  columns: ColumnDef<TData, unknown>[];
  getColumnWidthStyle: (
    col: ColumnDef<TData, unknown>,
  ) => CSSProperties | undefined;
};

export function DataTableSkeletonHeader<TData>({
  columns,
  getColumnWidthStyle,
}: Pick<DataTableSkeletonProps<TData>, 'columns' | 'getColumnWidthStyle'>) {
  return (
    <TableRow>
      {columns.map((col, i) => (
        <TableHead
          key={getDataTableColumnKey(col, i)}
          className="h-12"
          style={getColumnWidthStyle(col)}
        >
          <Skeleton className="h-4 w-20 max-w-[90%]" />
        </TableHead>
      ))}
    </TableRow>
  );
}

export function DataTableSkeletonRows<TData>({
  rowCount,
  columns,
  getColumnWidthStyle,
}: DataTableSkeletonProps<TData>) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="even:bg-[#20A6650D]">
          {columns.map((col, i) => (
            <TableCell
              key={`${getDataTableColumnKey(col, i)}-${rowIndex}`}
              className="py-4"
              style={getColumnWidthStyle(col)}
            >
              <Skeleton className="h-4 w-full max-w-full rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function DataTablePaginationSkeleton() {
  return (
    <div className="mt-6 flex flex-col items-end gap-4 py-4 sm:flex-row sm:justify-end">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-[72px] rounded-md" />
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-9 rounded-md" />
        ))}
      </div>
    </div>
  );
}

type FullTableSkeletonProps<TData> = DataTableSkeletonProps<TData> & {
  tableClassName?: string;
};

export function DataTableSkeletonTable<TData>({
  rowCount,
  columns,
  getColumnWidthStyle,
  tableClassName = 'table-fixed w-max min-w-full border-collapse border',
}: FullTableSkeletonProps<TData>) {
  return (
    <Table className={tableClassName}>
      <TableHeader>
        <DataTableSkeletonHeader
          columns={columns}
          getColumnWidthStyle={getColumnWidthStyle}
        />
      </TableHeader>
      <TableBody>
        <DataTableSkeletonRows
          rowCount={rowCount}
          columns={columns}
          getColumnWidthStyle={getColumnWidthStyle}
        />
      </TableBody>
    </Table>
  );
}
