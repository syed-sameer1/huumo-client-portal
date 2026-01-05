import { PurchaseOrdersFilters } from '../PurchaseOrdersFilters';
import { PurchaseOrdersTable } from '../PurchaseOrdersTable';

export const PurchaseOrdersSection = () => {
  return (
    <div className="space-y-4">
      <PurchaseOrdersFilters />
      <PurchaseOrdersTable />
    </div>
  );
};
