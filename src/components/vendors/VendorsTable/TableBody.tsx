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
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
  return (
    <>
      <ShadcnTableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('[data-no-row-click]'))
                  return;

                setSelectedVendorId(row.original.id);
                setShowVendorDetails(true);
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
            <TableCell className="h-24 text-center">No results.</TableCell>
          </TableRow>
        )}
      </ShadcnTableBody>
      {selectedVendorId && showVendorDetails && (
        <VendorDetails
          open={showVendorDetails}
          handleClose={() => setShowVendorDetails(false)}
          vendorId={selectedVendorId}
        />
      )}
    </>
  );
};
