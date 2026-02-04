import { PurchaseOrdersStatusConfigs } from '@/constants/purchaseOrders';
import { POStatus } from '@/types/purchaseOrders';

export const OrderStatusChip = ({ status }: { status: POStatus }) => {
  const selectedStatusConfig = PurchaseOrdersStatusConfigs[status];
  return (
    <div
      className={`bg-[${selectedStatusConfig.bgColor}] text-[${selectedStatusConfig.textColor}] gap-1 h-6 text-[12px] py-1 px-2 rounded-full w-fit`}
    >
      {selectedStatusConfig.label}
    </div>
  );
};
