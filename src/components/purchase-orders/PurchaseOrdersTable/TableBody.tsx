import {
  TableBody as ShadcnTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { columns } from './constants';
import { flexRender } from '@tanstack/react-table';

export const TableBody = ({ table }) => {
  return (
    <ShadcnTableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="py-[16px]">
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
