'use client';

import { POLineItemsTable } from '@/components/po-line-items-table';
import { POLineItemsLimitedData } from './mockData';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const POLineItems = () => {
  const params = useParams();
  const { id } = params; // id from route

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="font-medium">PO Line Items</div>
        <Link
          href={`/purchase-orders/${id}/po-line-items`}
          className="text-accent-foreground text-sm font-medium"
        >
          View All
        </Link>
      </div>

      <POLineItemsTable data={POLineItemsLimitedData} />
    </div>
  );
};
