import { billingSubscriptionStatus } from '@/service/billing';
import { useRouter } from 'next/navigation';
import { useApiQuery } from './query';
import { routeUrls } from '@/constants/urls';
import { useEffect } from 'react';

export const useBillingSubscriptionStatus = () => {
  const router = useRouter();

  const query = useApiQuery({
    queryKey: ['billing-subscription-status'],
    queryFn: billingSubscriptionStatus,

    // 🔁 Poll every 1s until active
    refetchInterval: (query) =>
      query.state.data?.data.status === 'active' ? false : 1000,

    staleTime: 0,
    gcTime: 0,

    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (query.data?.data.status === 'active') {
      router.replace(routeUrls.onboardingRoute);
    }
  }, [query.data?.status, router]);

  return query;
};
