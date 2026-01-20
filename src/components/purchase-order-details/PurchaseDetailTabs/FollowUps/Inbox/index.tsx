import { useState } from 'react';
import { InboxSearch } from '../../InboxSearch';
import { inboxThreads } from '../mockData';
import { FollowUpThreadCard } from './FollowUpThreadCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FollowUpTabConfig } from '../constants/followUpTabsConfig';

export const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(inboxThreads[0].id);
  return (
    <div className="w-105.75 border rounded-sm">
      <div className="p-2 px-3 text-[20px] font-semibold border-b">Inbox</div>
      <div className="py-4 px-3">
        <InboxSearch />
        <Tabs defaultValue={FollowUpTabConfig[0].value} className="w-full mt-3">
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
          {inboxThreads.map((message) => (
            <FollowUpThreadCard
              message={message}
              key={message.id}
              selectedMessage={selectedMessage}
              onSetSelectedMessage={setSelectedMessage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
