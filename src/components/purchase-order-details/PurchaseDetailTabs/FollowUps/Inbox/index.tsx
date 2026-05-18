import { useMemo, useState } from 'react';
import { InboxSearch } from '../../InboxSearch';
import { FollowUpThreadCard } from './FollowUpThreadCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FollowUpTabConfig } from '../constants/followUpTabsConfig';
import { PurchaseOrderFollowup } from '@/types/purchaseOrders';
import { FollowUpStatus } from '../types';

export const Inbox = ({
  selectedMessageId,
  setSelectedMessageId,
  followUps,
}: {
  selectedMessageId: number | null;
  setSelectedMessageId: (id: number) => void;
  followUps: PurchaseOrderFollowup[];
}) => {
  const [activeTab, setActiveTab] = useState(FollowUpTabConfig[0].value);

  const filteredFollowUps = useMemo(() => {
    if (activeTab === 'all') {
      return followUps;
    }
    if (activeTab === 'sent') {
      return followUps.filter((f) => f.status === FollowUpStatus.sent);
    }
    return followUps.filter((f) => f.status !== FollowUpStatus.sent);
  }, [followUps, activeTab]);

  return (
    <div className="w-105.75 border rounded-sm">
      <div className="p-2 px-3 text-[20px] font-semibold border-b">Inbox</div>
      <div className="py-4 px-3">
        <InboxSearch />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-3"
        >
          <TabsList className="w-full bg-transparent">
            {FollowUpTabConfig.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none
                border-b border-transparent
                data-[state=active]:border-b
                data-[state=active]:border-b-[#20A665]
                data-[state=active]:shadow-none w-full"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-4 space-y-4">
          {filteredFollowUps.map((message) => (
            <FollowUpThreadCard
              message={message}
              key={message.id}
              selectedMessage={selectedMessageId}
              onSetSelectedMessage={setSelectedMessageId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
