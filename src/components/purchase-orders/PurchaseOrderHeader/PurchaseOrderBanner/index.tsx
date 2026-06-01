import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { usePurchaseOrdersStats } from '@/hooks/purchaseOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type PurchaseOrderBannerProps = {
  /** When set, the “{n} overdue” segment is clickable and applies the overdue status filter. */
  onApplyOverdueFilter?: () => void;
  /** When set, the “{n} missing emails” segment is clickable and applies the missing emails secondary flag filter. */
  onApplyMissingEmailsFilter?: () => void;
};

export const PurchaseOrderBanner = ({
  onApplyOverdueFilter,
  onApplyMissingEmailsFilter,
}: PurchaseOrderBannerProps) => {
  const { isPending, data } = usePurchaseOrdersStats();
  if (isPending) return <Skeleton className="h-12 w-full" />;
  if (!data?.data) return null;
  const statsData = data.data;
  return (
    <Alert className="h-12 flex items-center rounded-2xl p-3 gap-3 bg-[#EAB3081F] border-none">
      <div className="flex items-center">
        <AlertCircleIcon size={22} />
      </div>

      <AlertTitle className="m-0 text-sm font-medium leading-tight">
        {statsData.needsAttention} POs need attention —{' '}
        {onApplyMissingEmailsFilter && (
          <button
            type="button"
            className={cn(
              'inline p-0 align-baseline font-medium underline-offset-2',
              'border-0 bg-transparent text-inherit hover:underline',
              'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
            )}
            onClick={onApplyMissingEmailsFilter}
          >
            {statsData.missingEmails} missing emails
          </button>
        )}
        {onApplyOverdueFilter && (
          <>
            ,{' '}
            <button
              type="button"
              className={cn(
                'inline p-0 align-baseline font-medium underline-offset-2',
                'border-0 bg-transparent text-inherit hover:underline',
                'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
              )}
              onClick={onApplyOverdueFilter}
            >
              {statsData.overdue} overdue
            </button>
          </>
        )}
      </AlertTitle>
    </Alert>
  );
};
