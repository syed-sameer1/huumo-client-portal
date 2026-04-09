import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { usePurchaseOrdersStats } from '@/hooks/purchaseOrders';
import { Skeleton } from '@/components/ui/skeleton';

export const PurchaseOrderBanner = () => {
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
        {statsData.missingEmails} missing emails, {statsData.overdue} overdue
      </AlertTitle>
    </Alert>
  );
};
