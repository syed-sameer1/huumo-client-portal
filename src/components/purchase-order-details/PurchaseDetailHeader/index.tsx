import { PurchaseOrderStatusBadge } from '@/components/purchase-order-status-badge';
import { mockData } from '../mockData';
import { SendFollowUpButton } from './PurchaseActionButtons';
import { MoreOptions } from './PurchaseActionButtons/MoreOptions';

export const PurchaseDetailHeader = () => {
  const { status } = mockData;
  return (
    <div className="flex justify-between items-center">
      <div className="text-[24px] font-semibold">Purchase Order Details</div>
      <div className="space-x-3 flex items-center">
        <PurchaseOrderStatusBadge purchaseOrderStatus={status} />
        <SendFollowUpButton />
        <MoreOptions />
      </div>
    </div>
  );
};
