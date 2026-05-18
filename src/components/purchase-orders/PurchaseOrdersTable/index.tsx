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
import { usePurchaseOrders } from '@/hooks/purchaseOrders';
import { useCallback, useMemo, useState } from 'react';
import { type PurchaseOrdersParams } from '@/service/purchaseOrders/purchaseOrders';
import { NoResultFound } from '@/components/no-results-found';
import type { PurchaseOrders } from '@/types/purchaseOrders';
import { PAGE_SIZE_OPTIONS } from './constants';
import { DataTablePagination } from '@/components/TablePagination';

interface PurchaseOrdersTableProps {
  filterParams?: Omit<PurchaseOrdersParams, 'limit' | 'pageNumber'>;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (
    selection: RowSelectionState,
    selectedRows: PurchaseOrders[],
  ) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

export const PurchaseOrdersTable = ({
  filterParams,
  rowSelection,
  onRowSelectionChange,
  pageSize,
  onPageSizeChange,
}: PurchaseOrdersTableProps) => {
  const [page, setPage] = useState(0);
  const { data, isPending, isFetching } = usePurchaseOrders(
    page + 1,
    filterParams,
    pageSize,
  );

  const purchaseOrders = useMemo(
    () => (isPending ? [] : (data?.purchaseOrders ?? [])),
    [isPending, data?.purchaseOrders],
  );

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (updater) => {
      const next =
        typeof updater === 'function' ? updater(rowSelection) : updater;
      const selectedRows = purchaseOrders.filter((row) => next[String(row.id)]);
      onRowSelectionChange(next, selectedRows);
    },
    [rowSelection, purchaseOrders, onRowSelectionChange],
  );

  const table = useReactTable({
    data: purchaseOrders,
    columns: tableColumns,
    pageCount: Math.ceil((data?.totalPurchaseOrders ?? 0) / pageSize),
    state: {
      pagination: {
        pageIndex: page,
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
          ? updater({ pageIndex: page, pageSize })
          : updater;

      if (next.pageSize !== pageSize) {
        onPageSizeChange(next.pageSize);
        setPage(0);
      } else {
        setPage(next.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data?.totalPurchaseOrders) {
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
        total={data?.totalPurchaseOrders ?? 0}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};
