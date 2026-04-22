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
import { purchaseOrderColumnWidthStyle } from './columnLayout';

export function EmailCell({ row }: { row: PurchaseOrders }) {
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
    meta: { width: 48 },
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="data-[state=checked]:bg-[#FAFAFA] data-[state=checked]:text-[#20A665] data-[state=checked]:border-[#A1A1AA]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        className="data-[state=checked]:bg-[#E0FEED] data-[state=checked]:text-[#20A665] data-[state=checked]:border-[#A1A1AA]"
      />
    ),
    enableSorting: false,
  },

  {
    accessorKey: 'poNumber',
    meta: { width: 128 },
    header: ({ column }) => (
      <SortableHeader column={column} title="PO Number" />
    ),
    cell: ({ row }) => {
      return row.original.poNumber;
    },
  },
  {
    accessorKey: 'vendorName',
    meta: { width: 168 },
    header: ({ column }) => <SortableHeader column={column} title="Vendor" />,
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '')}</span>
    ),
  },
  {
    accessorKey: 'site',
    meta: { width: 104 },
    header: ({ column }) => <SortableHeader column={column} title="Site" />,
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '-')}</span>
    ),
  },
  {
    accessorKey: 'buyer',
    meta: { width: 112 },
    header: ({ column }) => <SortableHeader column={column} title="Buyer" />,
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '-')}</span>
    ),
  },
  {
    accessorKey: 'account',
    meta: { width: 112 },
    header: ({ column }) => <SortableHeader column={column} title="Account" />,
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '-')}</span>
    ),
  },
  {
    accessorKey: 'vendorEmail',
    meta: { width: 220 },
    header: 'Email Address',
    cell: ({ row }) => <EmailCell row={row.original} />,
  },
  {
    accessorKey: 'poValue',
    meta: { width: 104 },
    header: ({ column }) => <SortableHeader column={column} title="PO Value" />,
    cell: ({ getValue }) => `$${Number(getValue<number>())?.toFixed(2)}`,
  },

  {
    accessorKey: 'orderDate',
    meta: { width: 116 },
    header: ({ column }) => (
      <SortableHeader column={column} title="Order Date" />
    ),
  },
  {
    accessorKey: 'dueDate',
    meta: { width: 116 },
    header: 'Deliver',
  },
  {
    accessorKey: 'dueIn',
    meta: { width: 88 },
    header: ({ column }) => <SortableHeader column={column} title="Due In" />,
    cell: ({ getValue }) => {
      return getValue() ? String(getValue()) : '-';
    },
  },
  {
    accessorKey: 'overdueBy',
    meta: { width: 108 },
    header: ({ column }) => (
      <SortableHeader column={column} title="Overdue By" />
    ),
    cell: ({ getValue }) => {
      return getValue() ? String(getValue()) : '-';
    },
  },
  {
    accessorKey: 'lastUpdate',
    meta: { width: 124 },
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Update" />
    ),
  },
  {
    accessorKey: 'status',
    meta: { width: 148 },
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
              <TableHead
                key={header.id}
                className="h-12"
                style={purchaseOrderColumnWidthStyle(header.column.columnDef)}
              >
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
