import { useParams } from 'next/navigation';
import { DetailCard } from './DetailCard';
import { usePurchaseOrdersDetails } from '@/hooks/purchaseOrders';

export const DetailsCardsContainer = () => {
  const params = useParams();
  const orderId = params.id as string;
  const { data } = usePurchaseOrdersDetails(orderId);
  const details = data?.data?.purchaseOrder;
  return (
    <div className="flex gap-4">
      <DetailCard id="poNumber" details={details} />
      <DetailCard id="name" details={details?.vendor} />
      <DetailCard id="dueIn" details={details} />
      <DetailCard id="lastFollowUpDate" details={details} />
      <DetailCard id="vendorResponseDate" details={details} />
    </div>
  );
};
