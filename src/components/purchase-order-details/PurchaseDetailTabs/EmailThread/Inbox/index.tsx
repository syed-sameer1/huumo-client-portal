import { useState } from 'react';
import { inboxThreads } from '../mockData';
import { InboxSearch } from '../../InboxSearch';
import { InboxThreadCard } from './InboxThreadCard';

export const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(inboxThreads[0].id);
  return (
    <div className="w-105.75 border rounded-sm">
      <div className="p-2 px-3 text-[20px] font-semibold border-b">Inbox</div>
      <div className="py-4 px-3">
        <InboxSearch />
        <div className="mt-4 space-y-4">
          {inboxThreads.map((message) => (
            <InboxThreadCard
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
