import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { POStatus, PurchaseOrders } from '@/types/purchaseOrders';
import { Column, ColumnDef, flexRender, Table } from '@tanstack/react-table';
import { SortableHeader } from './SortableHeader';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
} from '@/components/ui/table';
import { PurchaseOrdersTableMeta, PurchaseOrdersTableType } from './types';
import type { PurchaseOrderSortField } from '../PurchaseOrdersFilters/constants';
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

function PoSortableHeader({
  column,
  table,
  title,
  sortField,
}: {
  column: Column<PurchaseOrders, unknown>;
  table: Table<PurchaseOrders>;
  title: string;
  sortField: PurchaseOrderSortField;
}) {
  const meta = table.options.meta as PurchaseOrdersTableMeta | undefined;
  if (meta?.onSortChange) {
    return (
      <SortableHeader
        column={column}
        title={title}
        sortField={sortField}
        sortBy={meta.sortBy}
        sortOrder={meta.sortOrder}
        onSortChange={meta.onSortChange}
      />
    );
  }
  return <SortableHeader column={column} title={title} />;
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
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="PO Number"
        sortField="poNumber"
      />
    ),
    cell: ({ row }) => {
      return row.original.poNumber;
    },
  },
  {
    accessorKey: 'vendorName',
    meta: { width: 168 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Vendor"
        sortField="vendorName"
      />
    ),
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '')}</span>
    ),
  },
  {
    accessorKey: 'site',
    meta: { width: 104 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Site"
        sortField="site"
      />
    ),
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '-')}</span>
    ),
  },
  {
    accessorKey: 'buyer',
    meta: { width: 112 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Buyer"
        sortField="buyer"
      />
    ),
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '-')}</span>
    ),
  },
  {
    accessorKey: 'account',
    meta: { width: 112 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Account"
        sortField="account"
      />
    ),
    cell: ({ getValue }) => (
      <span className="capitalize">{String(getValue() ?? '-')}</span>
    ),
  },
  {
    accessorKey: 'vendorEmail',
    meta: { width: 220 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Email Address"
        sortField="vendorEmail"
      />
    ),
    cell: ({ row }) => <EmailCell row={row.original} />,
  },
  {
    accessorKey: 'poValue',
    meta: { width: 104 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="PO Value"
        sortField="totalValue"
      />
    ),
    cell: ({ getValue }) => `$${Number(getValue<number>())?.toFixed(2)}`,
  },

  {
    accessorKey: 'orderDate',
    meta: { width: 116 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Order Date"
        sortField="orderDate"
      />
    ),
  },
  {
    accessorKey: 'dueDate',
    meta: { width: 116 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Deliver"
        sortField="dueDate"
      />
    ),
  },
  {
    accessorKey: 'dueIn',
    meta: { width: 88 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Due In"
        sortField="dueIn"
      />
    ),
    cell: ({ getValue }) => {
      return getValue() ? String(getValue()) : '-';
    },
  },
  {
    accessorKey: 'overdueBy',
    meta: { width: 108 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Overdue By"
        sortField="overdueBy"
      />
    ),
    cell: ({ getValue }) => {
      return getValue() ? String(getValue()) : '-';
    },
  },
  {
    accessorKey: 'lastUpdate',
    meta: { width: 124 },
    header: ({ column, table }) => (
      <PoSortableHeader
        column={column}
        table={table}
        title="Last Update"
        sortField="lastUpdate"
      />
    ),
  },
  {
    accessorKey: 'status',
    meta: { width: 148 },
    header: 'Status',
    cell: ({ row, getValue }) => (
      <StatusActionDropdown
        poId={row.original.id}
        statusValue={getValue() as POStatus}
      />
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
