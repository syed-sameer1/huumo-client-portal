import { Checkbox } from '@/components/ui/checkbox';
import { SortableHeader } from '@/components/purchase-orders/PurchaseOrdersTable/SortableHeader';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { MoreOptions } from './MoreOptions';
import { VendorsTableType } from './types';
import {
  TableRow,
  TableHead,
  TableHeader as ShadcnTableHeader,
} from '@/components/ui/table';
import { CircleQuestionMark, InfoIcon } from 'lucide-react';
import { PerformanceScoreChip } from '../PerformanceScoreChip';
import { RiskScoreChip } from '../RiskScoreChip';
import { VendorData } from '@/types/vendors';
import { vendorColumnWidthStyle } from './columnLayout';

export const tableColumns: ColumnDef<VendorData>[] = [
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
    accessorKey: 'vendorName',
    meta: { width: 200 },
    header: ({ column }) => <SortableHeader column={column} title="Vendor" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <div className="text-foreground font-medium">
            {row.original.vendorName}
          </div>
          {!row.original.vendorEmail && (
            <InfoIcon size={15} className="text-[#F27712]" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    meta: { width: 220 },
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    cell: ({ row }) => {
      if (row.original.vendorEmail) {
        return <div className="font-medium">{row.original.vendorEmail}</div>;
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
    meta: { width: 120 },
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Spend" />
    ),
    cell: ({ row }) => {
      return <div>${row.original.totalSpend}</div>;
    },
  },
  {
    accessorKey: 'confirmationRate',
    meta: { width: 160 },
    header: ({ column }) => (
      <SortableHeader column={column} title="Confirmation Rate" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.confirmationRate}%</div>;
    },
  },
  {
    accessorKey: 'performanceScore',
    meta: { width: 170 },
    header: ({ column }) => (
      <SortableHeader column={column} title="Performance Score" />
    ),
    cell: ({ row }) => {
      return <PerformanceScoreChip value={row.original.performanceScore} />;
    },
  },
  {
    accessorKey: 'riskLevel',
    meta: { width: 130 },
    header: ({ column }) => (
      <SortableHeader column={column} title="Risk Level" />
    ),
    cell: ({ row }) => {
      return <RiskScoreChip value={row.original.riskLevel} />;
    },
  },
  {
    id: 'action',
    meta: { width: 72 },
    header: 'Action',
    enableSorting: false,
    cell: ({ row }) => (
      <div data-no-row-click className="flex justify-end">
        <MoreOptions
          email={row.original.vendorEmail}
          vendorName={row.original.vendorName}
          vendorId={row.original.id}
        />
      </div>
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
              <TableHead
                key={header.id}
                className="h-12"
                style={vendorColumnWidthStyle(header.column.columnDef)}
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
