import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { POStatus, PurchaseOrders } from '@/types/purchaseOrders';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { SortableHeader } from './SortableHeader';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
} from '@/components/ui/table';
import { PurchaseOrdersTableType } from './types';
import { StatusActionDropdown } from './StatusActionDropdown';
import { EditVendorModal } from '@/components/vendors/EditVendorModal';

function EmailCell({ row }: { row: PurchaseOrders }) {
  const [open, setOpen] = useState(false);
  const email = row.vendorEmail;

  if (!email) {
    const onClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };
    return (
      <>
        <span className="text-red-500 flex items-center gap-1">
          ⦿ Missing email ·
          <button
            type="button"
            className="text-green-600 underline"
            onClick={onClick}
          >
            Add
          </button>
        </span>
        <EditVendorModal
          open={open}
          onClose={() => setOpen(false)}
          vendorName={row.vendorName}
          email={email}
          vendorId={row.vendorId}
        />
      </>
    );
  }

  return <>{email}</>;
}

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
        onClick={(e) => e.stopPropagation()}
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
    accessorKey: 'vendorName',
    header: ({ column }) => <SortableHeader column={column} title="Vendor" />,
  },
  {
    accessorKey: 'site',
    header: ({ column }) => <SortableHeader column={column} title="Site" />,
  },
  {
    accessorKey: 'vendorEmail',
    header: 'Email Address',
    cell: ({ row }) => <EmailCell row={row.original} />,
  },

  {
    accessorKey: 'quantity',
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
  },

  {
    accessorKey: 'poValue',
    header: ({ column }) => <SortableHeader column={column} title="PO Value" />,
    cell: ({ getValue }) => `$${Number(getValue<number>())?.toFixed(2)}`,
  },

  {
    accessorKey: 'orderDate',
    header: ({ column }) => (
      <SortableHeader column={column} title="Order Date" />
    ),
  },
  {
    accessorKey: 'dueDate',
    header: 'Deliver',
  },
  {
    accessorKey: 'dueIn',
    header: ({ column }) => <SortableHeader column={column} title="Due In" />,
    cell: ({ getValue }) => {
      return getValue() ? String(getValue()) : '-';
    },
  },
  {
    accessorKey: 'overdueBy',
    header: ({ column }) => (
      <SortableHeader column={column} title="Overdue By" />
    ),
  },
  {
    accessorKey: 'lastUpdate',
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Update" />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <StatusActionDropdown statusValue={getValue() as POStatus} />
    ),
  },
];

export const TableHeader = ({ table }: { table: PurchaseOrdersTableType }) => {
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
