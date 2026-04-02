'use client';

import { useVendorsData } from '@/hooks/vendors';
import { EmptyScreen } from '../empty-screen';
import { VendorFilters } from './VendorFilters';
import { VendorsTable } from './VendorsTable';
import { LoadingSkeleton } from '../purchase-orders/PurchaseOrdersSection/LoadingSkeleton';

export const VendorsSection = () => {
  const { data, isLoading } = useVendorsData(1);
  const isEmpty = !data?.vendors.length;

  if (isLoading) return <LoadingSkeleton text="Loading Vendors.." />;

  if (isEmpty) {
    return (
      <EmptyScreen
        title="No Role Right Now"
        description="You have nothing on your list yet."
        subDescription="Add new vendor"
      />
    );
  }

  return (
    <div className="space-y-6">
      <VendorFilters />
      <VendorsTable />
    </div>
  );
};
