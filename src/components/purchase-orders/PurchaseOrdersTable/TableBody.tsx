import {
  TableBody as ShadcnTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { columns } from './constants';
import { flexRender } from '@tanstack/react-table';
import { PurchaseOrdersTableType } from './types';
import { TableSkeletonRow } from '@/components/TableSkeleton/TableSkeletonRow';
import { useRouter } from 'next/navigation';

export const TableBody = ({
  table,
  isLoading,
}: {
  table: PurchaseOrdersTableType;
  isLoading: boolean;
}) => {
  const router = useRouter();
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
            className="even:bg-[#20A6650D] data-[state=selected]:bg-[#E0FEED]"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('[data-no-row-click]'))
                return;
              router.push(`/purchase-orders/${row.original.id}`);
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="py-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
