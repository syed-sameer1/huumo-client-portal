import { createSubscription } from '@/service/subscriptionPackages';
import { useApiMutation } from './query';

export const useCreateSubscription = (options?: any) => {
  return useApiMutation(createSubscription, options);
};
