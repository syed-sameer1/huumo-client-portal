import { TrendingUpIcon } from 'lucide-react';
import { DetailsContentWrapper } from '../DetailsContentWrapper';
import { Progress } from '@/components/ui/progress';
import { usePurchaseOrderDetailsData } from '@/components/purchase-order-details/hooks/usePurchaseOrderDetailsData';

export const SystemInformation = () => {
  const { data } = usePurchaseOrderDetailsData();
  return (
    <DetailsContentWrapper title="System Information" Icon={TrendingUpIcon}>
      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">
            AI Confidence Score
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-sm font-medium">0%</div>
            <Progress
              value={0}
              className="bg-[#EDFFF6] [&>div]:bg-[#20A665] w-24.75"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">Acknowledged At</div>
          <div>-</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">
            Last Follow-Up Sent
          </div>
          <div>{data?.lastFollowupSentAt ? data?.lastFollowupSentAt : '-'}</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">Last Vendor Reply</div>
          <div>-</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">Overdue By</div>
          <div>{data?.overdueBy ? data?.overdueBy : '-'}</div>
        </div>
        <div className="space-y-2">
          <div className="text-muted-foreground text-sm">
            Follow-Up Attempts
          </div>
          <div>{data?.followupCount}</div>
        </div>
      </div>
    </DetailsContentWrapper>
  );
};
