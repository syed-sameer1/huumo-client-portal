'use client';

import { Table } from '@/components/ui/table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { tableColumns, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { useState } from 'react';
import { useUsersData } from '@/hooks/client';
import { PAGE_SIZE } from '@/hooks/purchaseOrders';
import { DataTablePagination } from '@/components/TablePagination';
import { useRouter, useSearchParams } from 'next/navigation';

export const RolesTable = () => {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page') ?? 1) - 1;
  const router = useRouter();

  const [page, setPage] = useState(initialPage);
  const { data, isLoading } = useUsersData(page + 1);

  const table = useReactTable({
    data: isLoading ? [] : data?.users ?? [],
    columns: tableColumns,
    pageCount: Math.ceil((data?.totalUsers ?? 0) / PAGE_SIZE),
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

      router.push(`?page=${next.pageIndex + 1}`, { scroll: true });
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader table={table} />
        <TableBody table={table} />
        <DataTablePagination table={table} total={data?.totalUsers ?? 0} />
      </Table>
    </div>
  );
};

