'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from '../ui/table';
import { POLineItemBody } from './POLineItemBody';
import { POLineItemHeader } from './POLineItemHeader';
import { tableColumns } from './constants/table';
import { usePurchaseOrderDetailsData } from '../purchase-order-details/hooks/usePurchaseOrderDetailsData';

export const POLineItemsTable = () => {
  const { data: detailsData } = usePurchaseOrderDetailsData();
  console.log('detailsData', detailsData);
  const table = useReactTable({
    data: detailsData?.items || [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <POLineItemHeader table={table} />
        <POLineItemBody table={table} />
      </Table>
    </div>
  );
};
