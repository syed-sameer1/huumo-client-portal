'use client';

import { Table } from '@/components/ui/table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { tableColumns, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { useState } from 'react';
import { useUsersData } from '@/hooks/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataTablePagination } from '@/components/TablePagination';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from './constants';

export const RolesTable = () => {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page') ?? 1) - 1;
  const router = useRouter();

  const [page, setPage] = useState(initialPage);
  const { data, isLoading } = useUsersData(page + 1);

  const table = useReactTable({
    data: isLoading ? [] : (data?.users ?? []),
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
    <div className="w-full min-w-0 max-w-full">
      <Table className="w-full">
        <TableHeader table={table} />
        <TableBody table={table} />
      </Table>
      <DataTablePagination
        table={table}
        total={data?.totalUsers ?? 0}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};
