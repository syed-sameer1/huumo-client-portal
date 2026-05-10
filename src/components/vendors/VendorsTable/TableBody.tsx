import {
  TableBody as ShadcnTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { VendorsTableType } from './types';
import { useState } from 'react';
import { VendorDetails } from '../VendorDetails';
import { vendorColumnWidthStyle } from './columnLayout';
import { DataTableSkeletonRows } from '@/components/data-table/DataTableSkeleton';
import { tableColumns } from './TableHeader';
import { SKELETON_ROW_COUNT } from './constants';

export const TableBody = ({
  table,
  isLoading,
}: {
  table: VendorsTableType;
  isLoading: boolean;
}) => {
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
  const visibleColumns = table.getVisibleLeafColumns();

  if (isLoading) {
    return (
      <ShadcnTableBody>
        <DataTableSkeletonRows
          rowCount={SKELETON_ROW_COUNT}
          columns={tableColumns}
          getColumnWidthStyle={vendorColumnWidthStyle}
        />
      </ShadcnTableBody>
    );
  }

  return (
    <>
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

                setSelectedVendorId(row.original.id);
                setShowVendorDetails(true);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="py-4"
                  style={vendorColumnWidthStyle(cell.column.columnDef)}
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
