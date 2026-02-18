'use client';

import { PageContainer } from '../layout/PageContainer';
import { DetailsCardsContainer } from './DetailsCards';
import { PurchaseDetailHeader } from './PurchaseDetailHeader';
import { PurchaseDetailTabs } from './PurchaseDetailTabs';
import { usePurchaseOrderDetailsData } from './hooks/usePurchaseOrderDetailsData';

export const PurchaseOrderDetails = () => {
  const { isLoading } = usePurchaseOrderDetailsData();

  if (isLoading) return null;

  return (
    <PageContainer className="space-y-8">
      <PurchaseDetailHeader />
      <DetailsCardsContainer />
      <PurchaseDetailTabs />
    </PageContainer>
  );
};
