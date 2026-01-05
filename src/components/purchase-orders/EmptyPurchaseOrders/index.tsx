import { PageContainer } from '@/components/layout/PageContainer';
import { NoPurchaseOrder } from './NoPurchaseOrder';
import { PurchaseOrdersActionHeader } from '../PurchaseOrderHeader/PurchaseOrdersActionHeader';

export const EmptyPurchaseOrders = () => {
  return (
    <PageContainer>
      <PurchaseOrdersActionHeader />
      <NoPurchaseOrder />
    </PageContainer>
  );
};
