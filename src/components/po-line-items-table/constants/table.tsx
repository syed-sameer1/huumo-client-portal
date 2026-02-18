import { SortableHeader } from '@/components/purchase-orders/PurchaseOrdersTable/SortableHeader';
import { ColumnDef } from '@tanstack/react-table';
import { POLineItems } from '../types';

export const tableColumns: ColumnDef<POLineItems>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return row.original.lineItem;
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
    cell: ({ row }) => {
      return row.original.quantity;
    },
  },
  {
    accessorKey: 'confirmedQuantity',
    header: ({ column }) => (
      <SortableHeader column={column} title="Confirmed Qty" />
    ),
    cell: ({ row }) => {
      return row.original.confirmedQuantity;
    },
  },
  {
    accessorKey: 'pendingQuantity',
    header: ({ column }) => (
      <SortableHeader column={column} title="Remaining Qty" />
    ),
    cell: ({ row }) => {
      return row.original.pendingQuantity;
    },
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <SortableHeader column={column} title="Value" />,
    cell: ({ getValue }) => `$${Number(getValue<number>())?.toFixed(2)}`,
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <SortableHeader column={column} title="Due Date" />,
    cell: ({ getValue }) => {
      return getValue();
    },
  },
];
