import { SortableHeader } from '@/components/purchase-orders/PurchaseOrdersTable/SortableHeader';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { MoreOptions } from './MoreOptions';
import { VendorsTableType } from './types';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
  TableCell,
} from '@/components/ui/table';
import { CircleQuestionMark, InfoIcon } from 'lucide-react';
import { PerformanceScoreChip } from '../PerformanceScoreChip';
import { RiskScoreChip } from '../RiskScoreChip';
import { VendorData } from '@/types/vendors';

export const tableColumns: ColumnDef<VendorData>[] = [
  {
    accessorKey: 'vendorName',
    header: ({ column }) => <SortableHeader column={column} title="Vendor" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <div className="text-foreground font-medium">{row.original.name}</div>
          {!row.original.email && (
            <InfoIcon size={15} className="text-[#F27712]" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    cell: ({ row }) => {
      if (row.original.email) {
        return <div className="font-medium">{row.original.email}</div>;
      }
      return (
        <div className="flex items-center space-x-2">
          <CircleQuestionMark size={15} className="text-[#EF4444]" />
          <div className="text-[#EF4444] font-medium">missing</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'totalSpend',
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Spend" />
    ),
    cell: ({ row }) => {
      return <div>${row.original.totalSpend}</div>;
    },
  },
  {
    accessorKey: 'confirmationRate',
    header: ({ column }) => (
      <SortableHeader column={column} title="Confirmation Rate" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.confirmationRate}%</div>;
    },
  },
  {
    accessorKey: 'performanceScore',
    header: ({ column }) => (
      <SortableHeader column={column} title="Performance Score" />
    ),
    cell: ({ row }) => {
      return <PerformanceScoreChip value={row.original.performanceScore} />;
    },
  },
  {
    accessorKey: 'riskLevel',
    header: ({ column }) => (
      <SortableHeader column={column} title="Risk Level" />
    ),
    cell: ({ row }) => {
      return <RiskScoreChip value={row.original.riskLevel} />;
    },
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <TableCell data-no-row-click>
        <MoreOptions
          email={row.original.email}
          vendorName={row.original.name}
          vendorId={row.original.id}
        />
      </TableCell>
    ),
  },
];

export const TableHeader = ({ table }: { table: VendorsTableType }) => {
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
