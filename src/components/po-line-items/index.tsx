import { PageContainer } from '../layout/PageContainer';
import { POLineItemsTable } from '../po-line-items-table';
import { POLineItemsFilters } from './POLineItemsFilters';

export const POLineItems = () => {
  return (
    <PageContainer className="space-y-8">
      <div className="text-2xl font-semibold">PO Line Items</div>
      <POLineItemsFilters />
      <POLineItemsTable />
    </PageContainer>
  );
};
