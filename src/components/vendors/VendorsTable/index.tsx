'use client';

import { Table } from '@/components/ui/table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { tableColumns, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { useVendorsData } from '@/hooks/vendors';
import { DataTablePagination } from '@/components/purchase-orders/PurchaseOrdersTable/TablePagination';
import { NoResultFound } from '@/components/no-results-found';
import type { VendorFiltersState } from '@/components/vendors/VendorFilters';
import { hasVendorSearchOrFilters } from '@/components/vendors/VendorFilters/constants';
import { PAGE_SIZE_OPTIONS } from './constants';

interface VendorsTableProps {
  filters: VendorFiltersState;
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const VendorsTable = ({
  filters,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: VendorsTableProps) => {
  const { data, isLoading } = useVendorsData(pageIndex + 1, filters, pageSize);

  const vendors = isLoading ? [] : (data?.vendors ?? []);

  const table = useReactTable({
    data: vendors,
    columns: tableColumns,
    pageCount: Math.max(1, Math.ceil((data?.totalVendors ?? 0) / pageSize)),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
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
    <div className="overflow-hidden">
      <Table className="border">
        <TableHeader table={table} />
        <TableBody table={table} />
      </Table>
      <DataTablePagination
        table={table}
        total={data?.totalVendors ?? 0}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  );
};
