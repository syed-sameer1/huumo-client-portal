import { flexRender } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '../ui/table';
import { POLineItemsTableType } from './types';

export const POLineItemHeader = ({
  table,
}: {
  table: POLineItemsTableType;
}) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id} className="h-12">
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
    </TableHeader>
  );
};
