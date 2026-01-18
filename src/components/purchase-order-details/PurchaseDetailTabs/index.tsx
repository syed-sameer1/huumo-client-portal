'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PurchaseDetailTabsConfig } from './constants';
import { PurchaseDetailInformationContent } from './PurchaseDetailInformationContent';
import { EmailThread } from './EmailThread';

export const PurchaseDetailTabs = () => {
  return (
    <Tabs
      defaultValue={PurchaseDetailTabsConfig[0].value}
      className="space-y-4"
    >
      <TabsList className="h-10">
        {PurchaseDetailTabsConfig.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#09090B] w-44.5 text-[#71717A] font-medium"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="po-detail">
        <PurchaseDetailInformationContent />
      </TabsContent>
      <TabsContent value="email-thread">
        <EmailThread />
      </TabsContent>
      <TabsContent value="follow-ups">
        <div>Follow ups</div>
      </TabsContent>
    </Tabs>
  );
};
