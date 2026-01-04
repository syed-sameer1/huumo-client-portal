import { PageContainer } from '../layout/PageContainer';
import { PurchaseOrderHeader } from './PurchaseOrderHeader';
import { PurchaseOrdersSection } from './PurchaseOrdersSection';

export const PurchaseOrders = () => {
  return (
    <PageContainer className="space-y-8">
      <PurchaseOrderHeader />
      <PurchaseOrdersSection />
    </PageContainer>
  );
};
