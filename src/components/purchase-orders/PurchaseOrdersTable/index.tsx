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
import { PAGE_SIZE, usePurchaseOrders } from '@/hooks/purchaseOrders';
import { useState } from 'react';
import { DataTablePagination } from './TablePagination';
import { type PurchaseOrdersParams } from '@/service/purchaseOrders/purchaseOrders';
import { NoResultFound } from '@/components/no-results-found';

interface PurchaseOrdersTableProps {
  filterParams?: Omit<PurchaseOrdersParams, 'limit' | 'pageNumber'>;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
}

export const PurchaseOrdersTable = ({
  filterParams,
  rowSelection,
  onRowSelectionChange,
}: PurchaseOrdersTableProps) => {
  const [page, setPage] = useState(0);
  const { data, isPending, isFetching } = usePurchaseOrders(
    page + 1,
    filterParams,
  );
  const table = useReactTable({
    data: isPending ? [] : (data?.purchaseOrders ?? []),
    columns: tableColumns,
    pageCount: Math.ceil((data?.totalPurchaseOrders ?? 0) / PAGE_SIZE),
    state: {
      pagination: {
        pageIndex: page,
        pageSize: PAGE_SIZE,
      },
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange,
    getRowId: (row) => String(row.id),
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex: page, pageSize: PAGE_SIZE })
          : updater;

      setPage(next.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data?.totalPurchaseOrders) {
    return <NoResultFound />;
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader table={table} />
        <TableBody table={table} isLoading={isFetching} />
      </Table>
      <DataTablePagination
        table={table}
        total={data?.totalPurchaseOrders ?? 0}
      />
    </div>
  );
};
