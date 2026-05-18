'use client';

import { Table } from '@/components/ui/table';
import {
  getCoreRowModel,
  type OnChangeFn,
  type RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { tableColumns, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { useVendorsData } from '@/hooks/vendors';
import { useCallback } from 'react';
import { NoResultFound } from '@/components/no-results-found';
import type { VendorFiltersState } from '@/components/vendors/VendorFilters';
import { hasVendorSearchOrFilters } from '@/components/vendors/VendorFilters/constants';
import { PAGE_SIZE_OPTIONS } from './constants';
import type { VendorData } from '@/types/vendors';
import { DataTablePagination } from '@/components/TablePagination';

interface VendorsTableProps {
  filters: VendorFiltersState;
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (
    selection: RowSelectionState,
    selectedRows: VendorData[],
  ) => void;
}

export const VendorsTable = ({
  filters,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
  rowSelection,
  onRowSelectionChange,
}: VendorsTableProps) => {
  const { data, isLoading, isFetching } = useVendorsData(
    pageIndex + 1,
    filters,
    pageSize,
  );

  const vendors = data?.vendors ?? [];

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (updater) => {
      const next =
        typeof updater === 'function' ? updater(rowSelection) : updater;
      const selectedRows = vendors.filter((row) => next[String(row.id)]);
      onRowSelectionChange(next, selectedRows);
    },
    [rowSelection, vendors, onRowSelectionChange],
  );

  const table = useReactTable({
    data: vendors,
    columns: tableColumns,
    pageCount: Math.max(1, Math.ceil((data?.totalVendors ?? 0) / pageSize)),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: handleRowSelectionChange,
    getRowId: (row) => String(row.id),
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;

      if (next.pageSize !== pageSize) {
        onPageSizeChange(next.pageSize);
      } else {
        onPageChange(next.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const noResultsWithFilters =
    !isLoading &&
    hasVendorSearchOrFilters(filters) &&
    (data?.totalVendors ?? 0) === 0;

  if (noResultsWithFilters) {
    return <NoResultFound />;
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <Table className="table-fixed w-max min-w-full border-collapse border">
        <TableHeader table={table} />
        <TableBody table={table} isLoading={isFetching} />
      </Table>
      <DataTablePagination
        table={table}
        total={data?.totalVendors ?? 0}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};
