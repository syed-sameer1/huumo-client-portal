import { mockData } from '../PurchaseDetailHeader/mockData';
import { DetailCard } from './DetailCard';

export const DetailsCardsContainer = ({
  details,
}: {
  details: typeof mockData;
}) => {
  return (
    <div className="flex gap-4">
      <DetailCard id="poNumber" details={details} />
      <DetailCard id="vendor" details={details} />
      <DetailCard id="deliverDate" details={details} />
      <DetailCard id="lastFollowUpDate" details={details} />
      <DetailCard id="vendorResponseDate" details={details} />
    </div>
  );
};
