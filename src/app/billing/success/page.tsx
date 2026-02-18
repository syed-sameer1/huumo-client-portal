'use client';

import { useBillingSubscriptionStatus } from '@/hooks/billing';

export default function BillingSuccessPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isError } = useBillingSubscriptionStatus();
  return (
    <div className="flex items-center justify-center h-screen text-[22px] font-bold">
      Payment Successful
    </div>
  );
}
