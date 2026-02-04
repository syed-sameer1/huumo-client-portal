import {
  TableBody as ShadcnTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { VendorsTableType } from './types';
import { useState } from 'react';
import { VendorDetails } from '../VendorDetails';

export const TableBody = ({ table }: { table: VendorsTableType }) => {
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  return (
    <>
      <ShadcnTableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              onClick={() => setShowVendorDetails(true)}
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
      <VendorDetails
        open={showVendorDetails}
        handleClose={() => setShowVendorDetails(false)}
      />
    </>
  );
};
