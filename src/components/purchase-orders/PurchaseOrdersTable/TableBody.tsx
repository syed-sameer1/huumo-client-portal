import {
  TableBody as ShadcnTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { columns } from './constants';
import { flexRender } from '@tanstack/react-table';
import { PurchaseOrdersTableType } from './types';
import Link from 'next/link';
import { TableSkeletonRow } from '@/components/TableSkeleton/TableSkeletonRow';

export const TableBody = ({
  table,
  isLoading,
}: {
  table: PurchaseOrdersTableType;
  isLoading: boolean;
}) => {
  const columnCount = table.getAllColumns().length;

  if (isLoading) {
    return (
      <ShadcnTableBody>
        {Array.from({ length: 6 }).map((_, i) => (
          <TableSkeletonRow key={i} columns={columnCount} />
        ))}
      </ShadcnTableBody>
    );
  }

  return (
    <ShadcnTableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className="even:bg-[#20A6650D]"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="py-4">
                <Link
                  href={`/purchase-orders/${row.original.id}`}
                  className="hover:underline text-primary"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Link>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </ShadcnTableBody>
  );
};
