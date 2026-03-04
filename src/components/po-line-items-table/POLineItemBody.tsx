import { flexRender } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '../ui/table';
import { tableColumns } from './constants/table';
import { POLineItemsTableType } from './types';

export const POLineItemBody = ({ table }: { table: POLineItemsTableType }) => {
  return (
    <TableBody>
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
          <TableCell colSpan={tableColumns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
