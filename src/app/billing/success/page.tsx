'use client';

import { useBillingSubscriptionStatus } from '@/hooks/billing';

export default function BillingSuccessPage() {
  const { data, isLoading, isError } = useBillingSubscriptionStatus();
  console.log({ data, isLoading, isError });
  return (
    <div className="flex items-center justify-center h-screen text-[22px] font-bold">
      Payment Successful
    </div>
  );
}
