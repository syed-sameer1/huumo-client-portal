import { PurchaseOrderStatusBadge } from '@/components/purchase-order-status-badge';
import { mockData } from '../mockData';
import { SendFollowUpButton } from './PurchaseActionButtons';

export const PurchaseDetailHeader = () => {
  const { status } = mockData;
  return (
    <div className="flex justify-between items-center">
      <div className="text-[24px] font-semibold">Purchase Order Details</div>
      <div className="space-x-3">
        <PurchaseOrderStatusBadge purchaseOrderStatus={status} />
        <SendFollowUpButton />
      </div>
    </div>
  );
};
