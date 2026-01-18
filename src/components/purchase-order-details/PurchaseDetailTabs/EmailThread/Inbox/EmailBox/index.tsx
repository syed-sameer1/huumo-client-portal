import { MoveLeftIcon } from 'lucide-react';
import { emailThread } from '../../mockData';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/date';

export const EmailBox = () => {
  const { supplierName, messages } = emailThread;
  return (
    <div className="border p-4 w-full rounded-lg">
      <div className="flex gap-3 items-center border-b pb-3">
        <MoveLeftIcon />
        <div className="text-lg font-medium">{supplierName}</div>
      </div>
      <div className="py-3 space-y-2">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={cn(
                'w-121.25 py-3 px-4 text-sm  font-normal',
                message.sender === 'supplier'
                  ? 'bg-[#0000000D] rounded-tr-4xl rounded-br-4xl rounded-bl-4xl text-[#080A0D]'
                  : 'ml-auto bg-[#25975F] rounded-tl-4xl rounded-br-4xl rounded-bl-4xl text-[#FFFFFF]',
              )}
            >
              <div>{message.content}</div>
            </div>
            <div
              className={cn(
                'text-[#414651] text-[10px] mt-2',
                message.sender === 'internal' && 'text-end',
              )}
            >
              {formatDate(message.timestamp, 'hh:mm a')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
