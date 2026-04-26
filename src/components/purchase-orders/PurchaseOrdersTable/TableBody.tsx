import {
  TableBody as ShadcnTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { PurchaseOrdersTableType } from './types';
import { useRouter } from 'next/navigation';
import { purchaseOrderColumnWidthStyle } from './columnLayout';
import { PurchaseOrderTableSkeleton } from './PurchaseOrderSkeleton/PurchaseOrderTableSkeleton';

export const TableBody = ({
  table,
  isLoading,
}: {
  table: PurchaseOrdersTableType;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const visibleColumns = table.getVisibleLeafColumns();

  if (isLoading) {
    return <PurchaseOrderTableSkeleton />;
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
              <TableCell
                key={cell.id}
                className="py-4"
                style={purchaseOrderColumnWidthStyle(cell.column.columnDef)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={visibleColumns.length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </ShadcnTableBody>
  );
};
