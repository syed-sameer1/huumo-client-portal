import { MoveLeftIcon, PencilLine } from 'lucide-react';
import { emailThread } from '../mockData';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/date';
import { Button } from '@/components/ui/button';

export const FollowUpBox = () => {
  const { supplierName, scheduledDate, subject, content } = emailThread;

  return (
    <div className="border p-4 w-full rounded-lg h-fit pb-6">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex gap-3 items-center ">
          <MoveLeftIcon />
          <div className="text-lg font-medium">{`Scheduled on ${formatDate(scheduledDate, 'dd-MM-yyyy')}`}</div>
        </div>
        <Button className="bg-transparent text-[#09090B] border-[#E4E4E7] border hover:bg-transparent">
          <PencilLine />
          Edit
        </Button>
      </div>

      <div className="space-y-5 mt-5">
        <div className="flex items-center gap-1">
          <div className="text-[#20A665] font-medium">Subject:</div>
          <div>{subject}</div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="font-normal"
        />
      </div>
    </div>
  );
};
