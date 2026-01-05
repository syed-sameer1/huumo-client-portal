'use client';

import { Table } from '@/components/ui/table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { tableColumns, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { mockData } from '@/constants/purchaseOrderMockData';

export const PurchaseOrdersTable = () => {
  const table = useReactTable({
    data: mockData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader table={table} />
        <TableBody table={table} />
      </Table>
    </div>
  );
};
