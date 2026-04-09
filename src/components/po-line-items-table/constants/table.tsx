import { SortableHeader } from '@/components/purchase-orders/PurchaseOrdersTable/SortableHeader';
import { ColumnDef } from '@tanstack/react-table';
import { POLineItems } from '../types';
import { StatusActionDropdown } from '@/components/purchase-orders/PurchaseOrdersTable/StatusActionDropdown';
import { POStatus } from '@/types/purchaseOrders';

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
      return row.original.confirmedQuantity
        ? row.original.confirmedQuantity
        : '-';
    },
  },
  {
    accessorKey: 'pendingQuantity',
    header: ({ column }) => (
      <SortableHeader column={column} title="Remaining Qty" />
    ),
    cell: ({ row }) => {
      return row.original.pendingQuantity ? row.original.pendingQuantity : '-';
    },
  },
  {
    accessorKey: 'unitCost',
    header: ({ column }) => <SortableHeader column={column} title="Value" />,
    cell: ({ getValue }) => {
      return getValue() ? `$${getValue()}` : '-';
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <SortableHeader column={column} title="Due Date" />,
    cell: ({ getValue }) => {
      return getValue() ? getValue() : '-';
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <StatusActionDropdown statusValue={getValue() as POStatus} />
    ),
  },
];
