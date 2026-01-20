import { TrendingUpIcon } from 'lucide-react';
import { DetailsContentWrapper } from '../DetailsContentWrapper';
import { Progress } from '@/components/ui/progress';

export const SystemInformation = () => {
  return (
    <DetailsContentWrapper title="System Information" Icon={TrendingUpIcon}>
      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">
            AI Confidence Score
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-sm font-medium">90%</div>
            <Progress
              value={20}
              className="bg-[#EDFFF6] [&>div]:bg-[#20A665] w-24.75"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">Acknowledged At</div>
          <div>9/18/16</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">
            Last Follow-Up Sent
          </div>
          <div>9/18/16</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">Last Vendor Reply</div>
          <div>9/18/16</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">Days Overdue</div>
          <div>5 days</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">
            Follow-Up Attempts
          </div>
          <div>12</div>
        </div>
      </div>
    </DetailsContentWrapper>
  );
};
