import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table,
} from '@tanstack/react-table';
import { mockData } from './mockData';
import { SortableHeader } from '@/components/purchase-orders/PurchaseOrdersTable/SortableHeader';
import { formatDate } from '@/lib/date';
import { OrderStatusChip } from '@/components/OrderStatusChip';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableCell,
  Table as ShadcnTable,
} from '@/components/ui/table';
import { POStatus } from '@/types/purchaseOrders';

type POLinkedItemsType = {
  id: number;
  poNumber: string;
  poValue: number;
  orderDate: string;
  status: POStatus;
};

export type LinkedPOItemsType = Table<POLinkedItemsType>;

export const tableColumns: ColumnDef<POLinkedItemsType>[] = [
  {
    accessorKey: 'poNumber',
    header: ({ column }) => (
      <SortableHeader column={column} title="PO Number" />
    ),
    cell: ({ row }) => {
      return row.original.poNumber;
    },
  },
  {
    accessorKey: 'poValue',
    cell: ({ row }) => {
      return `$${row.original.poValue}`;
    },
    header: ({ column }) => <SortableHeader column={column} title="PO Value" />,
  },
  {
    accessorKey: 'orderDate',
    cell: ({ row }) => {
      return formatDate(row.original.orderDate);
    },
    header: ({ column }) => (
      <SortableHeader column={column} title="Order Date" />
    ),
  },
  {
    id: 'status',
    cell: ({ row }) => {
      return <OrderStatusChip status={row.original.status} />;
    },
    header: 'Status',
  },
];

const TableHeader = ({ table }: { table: LinkedPOItemsType }) => {
  return (
    <ShadcnTableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id} className="h-12">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </ShadcnTableHeader>
  );
};

const TableBody = ({ table }: { table: LinkedPOItemsType }) => {
  return (
    <ShadcnTableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="py-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export const POLinkedItems = () => {
  const table = useReactTable({
    data: mockData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-hidden rounded-md border">
      <ShadcnTable>
        <TableHeader table={table} />
        <TableBody table={table} />
      </ShadcnTable>
    </div>
  );
};
