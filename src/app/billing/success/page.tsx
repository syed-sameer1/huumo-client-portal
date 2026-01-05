'use client';

import { useBillingSubscriptionStatus } from '@/hooks/billing';

export default function BillingSuccessPage() {
  const { data, isLoading, isError } = useBillingSubscriptionStatus();
  console.log({ data, isLoading, isError });
  return <div>Success screen</div>;
}
