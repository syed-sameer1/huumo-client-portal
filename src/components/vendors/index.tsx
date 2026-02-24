'use client';

import { useVendorsData } from '@/hooks/vendors';
import { EmptyScreen } from '../empty-screen';
import { VendorFilters } from './VendorFilters';
import { VendorsTable } from './VendorsTable';

export const VendorsSection = () => {
  const { data, isLoading } = useVendorsData(1);
  const isEmpty = !data?.vendors.length;

  if (isLoading) return <div>Loading...</div>;

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
