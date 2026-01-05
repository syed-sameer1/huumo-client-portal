import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PurchaseOrders } from '@/types/purchaseOrders';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { SortableHeader } from './SortableHeader';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
} from '@/components/ui/table';

export const tableColumns: ColumnDef<PurchaseOrders>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
  },

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
    accessorKey: 'vendor',
    header: ({ column }) => <SortableHeader column={column} title="Vendor" />,
  },

  {
    accessorKey: 'email',
    header: 'Email Address',
    cell: ({ row }) => {
      const email = row.original.email;

      if (!email) {
        return (
          <span className="text-red-500 flex items-center gap-1">
            ⦿ Missing email ·
            <button className="text-green-600 underline">Add</button>
          </span>
        );
      }

      return email;
    },
  },

  {
    accessorKey: 'quantity',
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
  },

  {
    accessorKey: 'value',
    header: ({ column }) => <SortableHeader column={column} title="PO Value" />,
    cell: ({ getValue }) => `$${getValue<number>()?.toFixed(2)}`,
  },

  {
    accessorKey: 'orderDate',
    header: ({ column }) => (
      <SortableHeader column={column} title="Order Date" />
    ),
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <Badge variant="secondary">{getValue<string>()}</Badge>
    ),
  },
];

export const TableHeader = ({ table }) => {
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
