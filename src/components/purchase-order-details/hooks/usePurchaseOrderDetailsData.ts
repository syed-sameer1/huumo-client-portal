import { usePurchaseOrdersDetails } from '@/hooks/purchaseOrders';
import { useParams } from 'next/navigation';

export const usePurchaseOrderDetailsData = () => {
  const params = useParams();
  const orderId = params.id as string;
  const { data, isLoading } = usePurchaseOrdersDetails(orderId);
  return { data: data?.data?.purchaseOrder, isLoading };
};
