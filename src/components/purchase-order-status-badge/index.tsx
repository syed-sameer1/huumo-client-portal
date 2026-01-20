import { PurchaseOrdersStatusConfigs } from '@/constants/purchaseOrders';
import { POStatus } from '@/types/purchaseOrders';
import { Badge } from '../ui/badge';

export const PurchaseOrderStatusBadge = ({
  purchaseOrderStatus,
}: {
  purchaseOrderStatus: POStatus;
}) => {
  const selectedStatus = PurchaseOrdersStatusConfigs[purchaseOrderStatus];
  return (
    <Badge
      className={'gap-1 h-6 text-[12px] py-1 px-2 rounded-full'}
      style={{
        backgroundColor: selectedStatus.bgColor,
        color: selectedStatus.textColor,
      }}
    >
      {selectedStatus.label}
    </Badge>
  );
};
