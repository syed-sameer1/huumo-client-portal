'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from '../ui/table';
import { POLineItemBody } from './POLineItemBody';
import { POLineItemHeader } from './POLineItemHeader';
import { tableColumns } from './constants/table';

export const POLineItemsTable = ({ data }) => {
  const table = useReactTable({
    data: data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <POLineItemHeader table={table} />
        <POLineItemBody table={table} />
      </Table>
    </div>
  );
};
