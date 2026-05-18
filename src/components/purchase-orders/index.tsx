import { Suspense } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { PurchaseOrdersActionHeader } from './PurchaseOrderHeader/PurchaseOrdersActionHeader';
import { PurchaseOrdersSection } from './PurchaseOrdersSection';
import { PurchaseOrdersSkeleton } from './PurchaseOrdersTable/PurchaseOrderSkeleton';

export const PurchaseOrders = () => {
  return (
    <PageContainer className="space-y-8">
      <Suspense fallback={<PurchaseOrdersSkeleton />}>
        <PurchaseOrdersActionHeader />
        <PurchaseOrdersSection />
      </Suspense>
    </PageContainer>
  );
};
