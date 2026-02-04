import { EmptyScreen } from '../empty-screen';
import { VendorFilters } from './VendorFilters';
import { VendorsTable } from './VendorsTable';

export const VendorsSection = () => {
  const isEmpty = false;
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
