import { PageContainer } from '../layout/PageContainer';
import { PurchaseOrdersActionHeader } from './PurchaseOrderHeader/PurchaseOrdersActionHeader';
import { PurchaseOrdersSection } from './PurchaseOrdersSection';

export const PurchaseOrders = () => {
  return (
    <PageContainer className="space-y-8">
      <PurchaseOrdersActionHeader />
      <PurchaseOrdersSection />
    </PageContainer>
  );
};
