'use client';

import { Table } from '@/components/ui/table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
  TableCell,
  TableBody as ShadcnTableBody,
} from '@/components/ui/table';
import { SortableHeader } from '@/components/purchase-orders/PurchaseOrdersTable/SortableHeader';
import type { TemplateRow } from './types';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const tableColumns: ColumnDef<TemplateRow>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Template" />,
    cell: ({ row }) => (
      <div className="text-foreground font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <SortableHeader column={column} title="Type" />,
    cell: ({ row }) => (
      <div className="text-foreground font-medium">{row.original.type}</div>
    ),
  },
  {
    accessorKey: 'followUpFrequency',
    header: ({ column }) => (
      <SortableHeader column={column} title="Follow-up Frequency" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.original.followUpFrequency}
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => (
      <div className="text-foreground font-medium">
        {row.original.updatedAt}
      </div>
    ),
  },
  {
    id: 'action',
    header: ({ column }) => <SortableHeader column={column} title="Action" />,
    cell: ({ row }) => (
      <TableCell data-no-row-click>
        <Button variant="ghost" size="icon">
          <Link href={`/templates-rules/edit/${row.original.id}`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    ),
  },
];

interface TemplatesTableProps {
  data: TemplateRow[];
}

export const TemplatesTable = ({ data }: TemplatesTableProps) => {
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <ShadcnTableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="h-12">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </ShadcnTableHeader>
        <ShadcnTableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="even:bg-[#20A6650D]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4">
                    <Link
                      href={`/templates-rules/${row.original.id}`}
                      className="hover:underline text-primary"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
        </ShadcnTableBody>
      </Table>
    </div>
  );
};
