import { PageContainer } from '../layout/PageContainer';
import { DetailsCardsContainer } from './DetailsCards';
import { PurchaseDetailHeader } from './PurchaseDetailHeader';
import { mockData } from './PurchaseDetailHeader/mockData';

export const PurchaseOrderDetails = () => {
  return (
    <PageContainer className="space-y-8">
      <PurchaseDetailHeader />
      <DetailsCardsContainer details={mockData} />
    </PageContainer>
  );
};
