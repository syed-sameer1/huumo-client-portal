'use client';

import { Table } from '@/components/ui/table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { tableColumns, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { PAGE_SIZE, usePurchaseOrders } from '@/hooks/purchaseOrders';
import { useState } from 'react';
import { DataTablePagination } from './TablePagination';

export const PurchaseOrdersTable = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = usePurchaseOrders(page + 1);

  const table = useReactTable({
    data: isLoading ? [] : (data?.data?.purchaseOrders ?? []),
    columns: tableColumns,
    pageCount: Math.ceil((data?.data?.totalPurchaseOrders ?? 0) / PAGE_SIZE),
    state: {
      pagination: {
        pageIndex: page,
        pageSize: PAGE_SIZE,
      },
    },
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

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader table={table} />
        <TableBody table={table} isLoading={isLoading} />
      </Table>
      <DataTablePagination
        table={table}
        total={data?.data?.totalPurchaseOrders ?? 0}
      />
    </div>
  );
};
