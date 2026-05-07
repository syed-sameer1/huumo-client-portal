import {
  TableBody as ShadcnTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { RolesTableType } from './types';
import { DataTableSkeletonRows } from '@/components/data-table/DataTableSkeleton';
import { tableColumns } from './TableHeader';
import { SKELETON_ROW_COUNT } from '@/components/purchase-orders/PurchaseOrdersTable/PurchaseOrderSkeleton/constants';
import { rolesColumnWidthStyle } from './columnLayout';

export const TableBody = ({
  table,
  isFetching,
}: {
  table: RolesTableType;
  isFetching: boolean;
}) => {
  if (isFetching) {
    return (
      <ShadcnTableBody>
        <DataTableSkeletonRows
          rowCount={SKELETON_ROW_COUNT}
          columns={tableColumns}
          getColumnWidthStyle={rolesColumnWidthStyle}
        />
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
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="h-24 text-center">No results.</TableCell>
        </TableRow>
      )}
    </ShadcnTableBody>
  );
};
