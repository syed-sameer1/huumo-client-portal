import { SortableHeader } from '@/components/purchase-orders/PurchaseOrdersTable/SortableHeader';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
  TableCell,
} from '@/components/ui/table';
import { RolesTableType } from './types';
import type { User } from '@/service/users';
import { cn } from '@/lib/utils';
import { MoreOptions } from './MoreOptions';

export const tableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="text-foreground font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <SortableHeader column={column} title="Email Address" />
    ),
    cell: ({ row }) => (
      <div className="text-foreground font-medium">{row.original.email}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <SortableHeader column={column} title="Role" />,
    cell: ({ row }) => (
      <div className="text-foreground font-medium capitalize">
        {row.original.role}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const s = (row.original.status ?? '').toLowerCase();
      const isActive = s === 'active';
      const isDeactivated = s === 'inactive';
      const label = isActive
        ? 'Access granted'
        : isDeactivated
          ? 'Deactivated'
          : 'Invitation sent';
      return (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full px-6 py-2 font-semibold',
            isActive
              ? 'bg-[#DEFFDF] text-[#10834B]'
              : isDeactivated
                ? 'bg-[#FEE2E2] text-[#B91C1C]'
                : 'bg-[#FFF4D4] text-[#916E02]',
          )}
        >
          {label}
        </div>
      );
    },
  },
  {
    id: 'action',
    header: ({ column }) => <SortableHeader column={column} title="Action" />,
    cell: ({ row }) => (
      <TableCell data-no-row-click>
        <MoreOptions user={row.original} />
      </TableCell>
    ),
  },
];

export const TableHeader = ({ table }: { table: RolesTableType }) => {
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
