'use client';

import { Table } from '@/components/ui/table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { tableColumns, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { DataTablePagination } from '@/components/TablePagination';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from './constants';
import { NoResultFound } from '@/components/no-results-found';
import type { RolesFiltersState } from '@/components/roles/RolesFilters/constants';
import { hasRolesSearchOrFilters } from '@/components/roles/RolesFilters/constants';
import type { User } from '@/service/users';

interface RolesTableProps {
  filters: RolesFiltersState;
  pageIndex: number;
  onPageChange: (pageIndex: number) => void;
  users: User[];
  totalUsers: number;
  isFetching: boolean;
}

export const RolesTable = ({
  filters,
  pageIndex,
  onPageChange,
  users,
  totalUsers,
  isFetching,
}: RolesTableProps) => {
  const table = useReactTable({
    data: users,
    columns: tableColumns,
    pageCount: Math.max(1, Math.ceil(totalUsers / PAGE_SIZE)),
    state: {
      pagination: {
        pageIndex,
        pageSize: PAGE_SIZE,
      },
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize: PAGE_SIZE })
          : updater;

      onPageChange(next.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const noResultsWithFilters =
    !isFetching && hasRolesSearchOrFilters(filters) && totalUsers === 0;

  if (noResultsWithFilters) {
    return <NoResultFound />;
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <Table className="table-fixed w-max min-w-full border-collapse border">
        <TableHeader table={table} />
        <TableBody table={table} isFetching={isFetching} />
      </Table>
      <DataTablePagination
        table={table}
        total={totalUsers}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};
