import { PageContainer } from '../layout/PageContainer';
import { DetailsCardsContainer } from './DetailsCards';
import { PurchaseDetailHeader } from './PurchaseDetailHeader';
import { mockData } from './mockData';
import { PurchaseDetailTabs } from './PurchaseDetailTabs';

export const PurchaseOrderDetails = () => {
  return (
    <PageContainer className="space-y-8">
      <PurchaseDetailHeader />
      <DetailsCardsContainer details={mockData} />
      <PurchaseDetailTabs />
    </PageContainer>
  );
};
