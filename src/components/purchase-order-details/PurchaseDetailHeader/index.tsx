import { PurchaseOrderStatusBadge } from '@/components/purchase-order-status-badge';
import { SendFollowUpButton } from './PurchaseActionButtons';
import { MoreOptions } from './PurchaseActionButtons/MoreOptions';
import { usePurchaseOrdersDetails } from '@/hooks/purchaseOrders';
import { useParams } from 'next/navigation';

export const PurchaseDetailHeader = () => {
  const params = useParams();
  const orderId = params.id as string;
  const { data } = usePurchaseOrdersDetails(orderId);
  console.log(data);
  return (
    <div className="flex justify-between items-center">
      <div className="text-[24px] font-semibold">Purchase Order Details</div>
      <div className="space-x-3 flex items-center">
        <PurchaseOrderStatusBadge
          purchaseOrderStatus={data?.data?.purchaseOrder?.status}
        />
        <SendFollowUpButton />
        <MoreOptions />
      </div>
    </div>
  );
};
