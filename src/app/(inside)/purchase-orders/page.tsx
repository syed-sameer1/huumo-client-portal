import { PageContainer } from '@/components/layout/PageContainer';
import { Title } from '@/components/layout/Title';
import { ActionButtons } from '@/components/purchase-orders/ActionButtons';
import { NoPurchaseOrder } from '@/components/purchase-orders/NoPurchaseOrder';

export default function PurchaseOrdersPage() {
  return (
    <PageContainer>
      <div className="flex justify-between">
        <Title>Purchase Orders</Title>
        <ActionButtons />
      </div>
      <NoPurchaseOrder />
    </PageContainer>
  );
}
